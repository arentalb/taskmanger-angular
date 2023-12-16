import {CanActivateFn} from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authservice :AuthService =inject(AuthService)

  if (  authservice.isUserLoginedIn()){
    return true;
  }else {
    return false;
  }

};
