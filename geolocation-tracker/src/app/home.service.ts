import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private searchTermSource = new Subject<string>();
  private apiUrl = 'http://localhost:4000/api/v1';
  constructor(private http: HttpClient) {}

  searchTerm$ = this.searchTermSource.asObservable();
   // Service method to update the search term
   updateSearchTerm(searchTerm: string): void {
    console.log('Search term updated:', searchTerm);
    this.searchTermSource.next(searchTerm);
  }
  postMapData(payload: any): Observable<any> {
    const url = `${this.apiUrl}/weather`; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };
console.log('this is the finail post',payload);

    return this.http.post(url, payload, options);
  }
  getWeatherHistory(): Observable<any> {
    const url = `${this.apiUrl}/weather/history`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, withCredentials: true };

    return this.http.get(url, options);
  }
}
