import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router :Router ,private fireAuth :AngularFireAuth , private firestore :AngularFirestore) {
  }

  isUserLoginedIn(){
    if (localStorage.getItem('user')){
      console.log("user exists ")
      return true
    }else {
      console.log("user dose not  exists ")
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
    console.log(user.username, user.email , user.password)
    this.fireAuth.createUserWithEmailAndPassword(  user.email , user.password).then((cridential)=>{
      console.log("signup ")
      // console.log(cridential.user)
      // console.log(cridential.credential)
      // console.log(cridential.additionalUserInfo)
      // console.log(cridential.operationType)

     this.firestore.collection("users/").add(user).then(()=>{
       console.log(`this user ${user } signed up `)
     })

    })
  }
}
