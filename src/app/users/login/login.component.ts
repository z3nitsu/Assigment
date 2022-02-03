import { Component, OnInit,NgModule } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/UI/navbar/navbar.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginButtonDisabled: boolean = false;
  logInError: boolean = false;
  logInErrorMessage: string = '';

  logOutBtn: boolean = false;

  constructor(public formBuilder: FormBuilder, public loginService: LoginService, public router: Router) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if(this.loginService.isLogin()){
      this.router.navigate(['/movies'])
    }
  }

  onSubmit() {
    this.submitted = true
    this.loginButtonDisabled = true;
    if (this.loginForm.valid) {
      this.loginButtonDisabled = false;
      this.loginService.getAuth(this.loginForm.get('username')!.value, this.loginForm.get('password')!.value).subscribe(result => {
        this.logInError = false;
        const field = "data"
        const token2 = "token"
        const token = (result[field as keyof Object][token2 as keyof Object]);
        localStorage.setItem("token",JSON.stringify(token))
        this.router.navigate(['/movies'])
      }, err => {
        this.logInError = true;
        if(err && err.error && err.error.error){
          this.logInErrorMessage = err.error.error.message;
        } else {
          this.logInErrorMessage = "There was an error"
        }
      })
    } else {
      for(const prop in this.loginForm.controls){
        this.loginButtonDisabled = false;
        this.loginForm.get(prop)?.markAsDirty();
      }
    }
  }
}
