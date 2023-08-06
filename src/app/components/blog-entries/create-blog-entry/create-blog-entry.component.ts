import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog-service/blog.service';
import { catchError, map, of, tap } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { File } from '../../user/update-user-profile/update-user-profile.component';
import { Router } from '@angular/router';
import { WINDOW } from 'src/app/window-token';

@Component({
  selector: 'app-create-blog-entry',
  templateUrl: './create-blog-entry.component.html',
  styleUrls: ['./create-blog-entry.component.scss'],
})
export class CreateBlogEntryComponent implements OnInit {
  // origin = this.window.location.origin;

  form!: FormGroup;
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };
  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    @Inject(WINDOW) private window: Window
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      title: [null, [Validators.required]],
      slug: [{ value: null, disabled: true }],
      description: [null, [Validators.required]],
      body: [null, [Validators.required]],
      // createdAt: [null],
      // updatedAt: [null],
      // likes: [null],
      // author: [null], // a blog entry would be having a single user ie why only User and not User[]
      headerImage: [null, [Validators.required]],
      // publishedDate: [null],
      // isPublished: [null],
    });
  }

  post() {
    this.blogService
      .postBlog(this.form.getRawValue())
      .pipe(tap(() => this.router.navigate(['../'])))
      .subscribe();
  }

  uploadFile(event: Event) {
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

    this.blogService
      .uploadHeaderImage(formData)
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
          this.form.patchValue({ headerImage: event.body.filename });
        }
      });
  }
}
