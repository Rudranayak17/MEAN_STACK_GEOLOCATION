import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
declare var google:any
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/v1';
  constructor(private http: HttpClient,private router:Router) { }
  handleSignout() {
    
    google.accounts.id.disableAutoSelect();
    this.logout().subscribe(
      () => {
        // Redirect to the home page or any other desired page after successful logout
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Logout failed', error);
        // Handle error, redirect or show a message as needed
      }
    );
  }
  loginWithGoogle(payload: { name: string; email: string }): Observable<any> {
    const url = `${this.apiUrl}/login`;
      // Set headers including withCredentials
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const options = { headers, withCredentials: true };
      return this.http.post(url, payload, options);
  }
  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`;
    // Note: You may not need to send any data in the logout request
    return this.http.post(url, {}, { withCredentials: true });
  }
}
