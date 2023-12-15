import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService :AuthService){}

  login(f: NgForm) {
    let email = f.value.email
    let password = f.value.password

    this.authService.login(email ,password)
  }
}
