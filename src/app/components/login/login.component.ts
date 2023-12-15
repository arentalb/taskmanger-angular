import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage :string = null
  showInvalidInputs :boolean = false
  constructor(private authService :AuthService){}

  login(f: NgForm) {
    if (f.valid){
      console.log(f.valid)

      let email = f.value.email
      let password = f.value.password

      this.authService.login(email ,password).subscribe(()=>{

      },error => {

        this.errorMessage = error

      })
    }else {
      this.showInvalidInputs = true
    }
  }
}
