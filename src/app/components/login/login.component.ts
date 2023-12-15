import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage :string = null
  showInvalidInputs :boolean = false
  isLoading = false

  constructor(private authService :AuthService , private router :Router){}

  login(f: NgForm) {
    if (f.valid){
      this.isLoading = true
      let email = f.value.email
      let password = f.value.password

      this.authService.login(email ,password).subscribe(()=>{
        this.isLoading = false

        this.router.navigate(['/tasks']);

      },error => {
        this.isLoading = false

        this.errorMessage = error

      })
    }else {
      this.showInvalidInputs = true
    }
  }
}
