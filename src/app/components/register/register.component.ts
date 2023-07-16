import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

class CustomValidators {
  static passwordContainsNumber(
    // static means the function belongs to the class itself
    control: AbstractControl
  ): ValidationErrors | null {
    const regex = /\d/;
    if (regex.test(control.value) && control.value !== null) {
      return null; // no validation error
    } else {
      return { passwordInvalid: true };
    }
  }
  static passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (
      password === passwordConfirm &&
      password !== null &&
      passwordConfirm !== null
    ) {
      return null;
    } else {
      return { passwordNotMatching: true };
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [
          null,
          [Validators.required, Validators.email, Validators.minLength(6)],
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            CustomValidators.passwordContainsNumber,
          ],
        ],
        passwordConfirm: [null, [Validators.required, Validators.minLength(3)]],
      },
      {
        validators: CustomValidators.passwordMatch, // applies to whole form, and in the whole from it can compare both pass fields for equality
      }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.authService
      .register(this.registerForm.value)
      .pipe(map((user) => this.router.navigate(['login'])))
      .subscribe();
  }
}
