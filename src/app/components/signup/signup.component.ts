import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService :AuthService){}

  signup(f: NgForm) {

    let user :User ={username:f.value.username ,email: f.value.email,password: f.value.password}


    this.authService.signup(user)
  }
}
