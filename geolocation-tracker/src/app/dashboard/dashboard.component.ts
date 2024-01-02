import { Component } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  loggedInUser: any; // You might want to create an interface for better typing
  locationData: any[] = [];
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    // Retrieve user details from sessionStorage
    const storedUser = sessionStorage.getItem('loggedInUser');

    // Parse the stored user JSON string
    this.loggedInUser = storedUser ? JSON.parse(storedUser) : null;

    this.homeService.getWeatherHistory().subscribe(
      (response) => {
        // Check if the 'data' property exists
       
        if (response.weather && response.weather.length > 0) {
          // Extract and store location data
          this.locationData = response.weather.map((entry:any) => entry.location);
          // console.log('Location Data:', this.locationData);
        } else {
          console.log('No weather data found');
        }
      },
      (error) => {
        console.error('Error fetching weather history:', error);
        // Handle errors as needed
      }
    );
  }
}
