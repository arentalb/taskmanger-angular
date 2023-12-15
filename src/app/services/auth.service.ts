import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {catchError, from, Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router :Router ,private fireAuth :AngularFireAuth , private firestore :AngularFirestore) {
  }
  loginState :Subject<boolean>= new Subject<boolean>()
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
    this.fireAuth.signInWithEmailAndPassword( email ,password).then((credential)=>{
      console.log("loginein ")
      localStorage.clear()
       localStorage.setItem('user', JSON.stringify(credential.user));
      this.router.navigate(['/tasks']);

      // console.log(cridential.user)
      // console.log(cridential.credential)
      // console.log(cridential.additionalUserInfo)
      // console.log(cridential.operationType)

    })
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
       return throwError('unknowen error ');
     })
   )
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
    this.loginState.next(false)
  }
}
