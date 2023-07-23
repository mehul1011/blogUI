import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { WINDOW } from 'src/app/window-token';
export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}
@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss'],
})
export class UpdateUserProfileComponent implements OnInit {
  origin = this.window.location.origin;

  form!: FormGroup;
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    @Inject(WINDOW) private window: Window,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      profileImage: [null],
    });
    this.authService
      .getUserId()
      .pipe(
        switchMap((id: any) =>
          this.userService.findOne(id).pipe(
            map((user: User) => {
              if (user) {
                this.form.patchValue({
                  id: user.id,
                  name: user.name,
                  username: user.username,
                  profileImage: user.profileImage,
                });
              }
            })
          )
        )
      )
      .subscribe();
  }

  // onClick() {
  //   // const fileInput = this.fileUpload.nativeElement;
  //   // fileInput.onClick();
  //   // fileInput. = () => {

  //   };
  // }

  uploadFile(e: Event) {
    const fileInput = this.fileUpload.nativeElement;

    this.file = {
      data: fileInput.files[0],
      inProgress: false,
      progress: 0,
    };
    this.fileUpload.nativeElement.value = '';
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;
    this.userService
      .uploadProfileImage(formData)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file.progress = Math.round(
                (event.loaded * 100) / event.total
              );
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.file.inProgress = false;
          return of('Upload Failed');
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.form.patchValue({ profileImage: event.body.profileImage });
        }
      });
  }

  update() {
    this.userService.updateOne(this.form.getRawValue()).subscribe();
  }
}
