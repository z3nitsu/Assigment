import { Component, OnInit,NgModule } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginButtonDisabled: boolean = false;

  constructor(public formBuilder: FormBuilder, public loginService: LoginService, public router: Router) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true
    this.loginButtonDisabled = true;
    if (this.loginForm.valid) {
      this.loginButtonDisabled = false;
      this.loginService.getAuth(this.loginForm.get('username')!.value, this.loginForm.get('password')!.value).subscribe(result => {
        const field = "data"
        const token2 = "token"
        const token = (result[field as keyof Object][token2 as keyof Object]);
        console.log(token)
        localStorage.setItem("token",JSON.stringify(token))
        this.router.navigate(['/movies'])
      }, err => {
        console.log(err)
      })
    } else {
      for(const prop in this.loginForm.controls){
        this.loginButtonDisabled = false;
        console.log( this.loginForm.get(prop))
        this.loginForm.get(prop)?.markAsDirty();
      }
    }
  }
}
