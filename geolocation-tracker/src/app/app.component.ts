import { Component } from '@angular/core';
import { AuthService } from './auth.service';
declare var google:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'geolocation-tracker';
  // constructor(private authService: AuthService) {}
  // handleCredentialResponse(response: any) {
  //   const responsePayload = this.authService.decodeJWTToken(response.credential);
  //   sessionStorage.setItem('loggedInUser', JSON.stringify(responsePayload));
  //   console.log(responsePayload.email, responsePayload.name);
  //   this.authService.loginWithGoogle(responsePayload).subscribe(

  //     (data) => {
  //       console.log('Login successful', data);
  //       // Redirect or perform other actions after successful login
  //     },
  //     (error) => {
  //       console.error('Login failed', error);
  //       // Handle login failure
  //     }
    
  //   )
  //     // Redirect to home page
  //     window.location.href = '/home';
  // }
  // handleSignout() {
  //   google.accounts.id.disableAutoSelect();
  // }
}
