import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login: boolean = true;
  public signup: boolean = false;
  loginForm = new FormGroup({
    EmpEmail: new FormControl('', 
    [
       Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$"),
       Validators.required
    ]),
    password: new FormControl('',
      [
        Validators.required
      ]
    ),
  });
  SignupForm = new FormGroup({
    EmpEmail:new FormControl('',[
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$"),
      Validators.required
    ]),
    EmpName:new FormControl('',[
      Validators.required
    ]),
    Password:new FormControl('',[
      Validators.required
    ]),
    IsAuthorized:new FormControl('',[

    ])
  })
  constructor(private userService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleLogin() {
    this.login=true;
    this.signup=false;
  }

  toggleSignup() {
    this.login=false;
    this.signup=true;
  }

  loginSubmit() {
    this.userService.loginService(this.loginForm.value).subscribe({
      next: responseData => {
        localStorage.setItem('currentUser',this.loginForm.value.EmpEmail);
        console.log(responseData['token']);
        localStorage.setItem('token', responseData['token']);
        this.router.navigate(['/dashboard']);
      },
      error:err =>{
        alert("Email or Password does not match");
      }
      
    })
  }

  signupSubmit() {
    this.SignupForm.value.IsAuthorized = false;
    console.log(this.SignupForm.value);
    this.userService.signupService(this.SignupForm.value).subscribe((res: any) => {
      console.log(res);
    },
    (err: any) => {
      console.log("Something went wrong");
      alert("Email already exixts");
    })
    this.SignupForm.reset();
  }
}