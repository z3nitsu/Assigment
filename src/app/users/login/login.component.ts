import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginButtonDisabled: boolean = false;

  constructor(public formBuilder: FormBuilder, public loginService: LoginService) {
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
        const token = (result[field as keyof Object]);
        localStorage.setItem("token",JSON.stringify(token))
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
