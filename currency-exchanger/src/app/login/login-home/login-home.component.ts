import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: [ './login-home.component.scss' ]
})
export class LoginHomeComponent implements OnInit {
  public loginForm!: FormGroup;
  public passwordToggle: boolean;
  public loginErrorTxt!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.passwordToggle = false;
  }

  ngOnInit(): void {
    this.loginForm = this.createForm();
    if (this.authService.isLoggedIn) {
      this.router.navigate([ 'currency-converter' ]);
    }
  }

  private createForm(): any {
    const loginForm = this.formBuilder.group({
      userName: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required ] ]
    });
    return loginForm;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loginErrorTxt = '';
      const loginForm = this.loginForm.getRawValue();
      if (loginForm.userName === 'admin' && loginForm.password === 'password') {
        this.router.navigate([ 'currency-converter' ]);
        this.authService.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        localStorage.setItem('isLoggedIn', 'false');
        this.loginErrorTxt = 'Enter valid username and password.'
      }
    }

  }

}
