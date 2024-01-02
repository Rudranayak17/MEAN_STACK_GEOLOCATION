declare var google:any
import { Component, NgZone, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  constructor(private authService: AuthService,private router: Router ,private ngZone: NgZone) {}
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '912589557080-igjrvttafakbt6m1dmqs26ae6tom1d4o.apps.googleusercontent.com',
      callback: (resp: any) => this.ngZone.run(() => this.handleCredentialResponse(resp))
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme:"filled_blue",
      width:350,
      shape:"rectangle",
  
    });
  }
  private decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }
  handleCredentialResponse(response: any) {
    if (response) {
      //decode the token 
const payload=this.decodeToken(response.credential)
console.log(payload.name ,payload.email);

//store in session
sessionStorage.setItem("loggedInUser",JSON.stringify(payload))
//navigate to home /browser 

// this.ngZone.run(() => this.router.navigate(["home"]));
 // Send data to backend
 this.subscription.add(
  this.authService.loginWithGoogle({ name: payload.name, email: payload.email }).subscribe(
    (result) => {
      // Handle successful login response from the backend
      console.log('Login successful', result);

      // Navigate to home/browser
      this.ngZone.run(() => this.router.navigate(['home']));
    },
    (error) => {
      // Handle login error
      console.error('Login error', error);
    }
  )
);
}
}

ngOnDestroy(): void {
// Unsubscribe to avoid memory leaks
this.subscription.unsubscribe();
  }
}
