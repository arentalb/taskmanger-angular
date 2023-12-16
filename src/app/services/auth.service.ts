import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {BehaviorSubject, catchError, from, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router :Router ,private fireAuth :AngularFireAuth , private firestore :AngularFirestore) {
  }
  loginState :BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false)
  isUserLoginedIn(){
    if (localStorage.getItem('user')){
      console.log("user exists ")
      this.loginState.next(true)
      return true
    }else {
      console.log("user dose not  exists ")
      this.loginState.next(false)
      this.router.navigate(['/login']);

      return  false
    }
  }
  login(email :string, password :string ) {
    console.log(email, password)
    return from(this.fireAuth.signInWithEmailAndPassword( email ,password).then((credential)=>{
      console.log("loginein ")
      localStorage.clear()
      localStorage.setItem('user', JSON.stringify(credential.user));
      this.loginState.next(true)

      // console.log(cridential.user)
      // console.log(cridential.credential)
      // console.log(cridential.additionalUserInfo)
      // console.log(cridential.operationType)

    }))
      .pipe(
        catchError((error) => {
          if (error.message ==="Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential)."){
            return throwError('invalid credential');
          }
          if (error.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."){
            return throwError('too many request for this account , this account temporally blocked ');
          }
          return throwError('unknown error ');
        })
      )
  }

  signup( user :User ) {
   return from( this.fireAuth.createUserWithEmailAndPassword(  user.email , user.password).then((cridential)=>{
     // console.log(cridential.user)
     // console.log(cridential.credential)
     // console.log(cridential.additionalUserInfo)
     // console.log(cridential.operationType)

     this.firestore.collection("users/").add(user).then(()=>{
     })

   })).pipe(
     catchError((error) => {
       if (error.message ==="Firebase: The email address is already in use by another account. (auth/email-already-in-use)."){
         return throwError('This email is taken');
       }
       return throwError('unknown error ');
     })
   )
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/login']);
      localStorage.clear();
      this.loginState.next(false);
    });
  }
}
