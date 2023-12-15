import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  password: string;
  confirmPassword: string;
  showInvalidInputs :boolean = false
  errorMessage :string = null
  constructor(private authService :AuthService ,private router :Router){}

  checkPasswordMatch (){
    return  (this.password === this.confirmPassword)
  }

  signup(f: NgForm) {
    if (f.valid &&this.checkPasswordMatch()){
      let user :User ={username:f.value.username ,email: f.value.email,password: f.value.password}
      this.authService.signup(user).subscribe(()=>{
        this.router.navigate(['/login']);
      },error => {
        this.errorMessage = error
      })
    }else {
      this.showInvalidInputs = true
    }
  }



}
