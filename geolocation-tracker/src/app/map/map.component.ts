import { Component, AfterViewInit, Input, Output, EventEmitter, OnDestroy, } from '@angular/core';
import { HomeService } from '../home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit,OnDestroy {
  @Input() searchTerm: string = '';
  @Output() updateMapData: EventEmitter<any> = new EventEmitter<any>();
   private subscription!: Subscription|undefined
  private map: any;

  constructor(private homeService: HomeService) {
  }

  private async initMap(): Promise<void> {
    // Dynamically import Leaflet only if running in a browser environment
    if (typeof window !== 'undefined') {
      try {
        const L = await import('leaflet');
        this.map = L.map('map', {
          zoom: 3
        });
        var myIcon = L.icon({
          iconUrl: '../../assets/marker1.png',
          iconSize: [30, 40]
        });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);

        // Attempt to get the user's location only if not saved in sessionStorage
        const savedLocation = sessionStorage.getItem('userLocation');
        const savedLocationArray = JSON.parse(savedLocation!) as [number, number];

        if (!savedLocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              this.map.setView([latitude, longitude], 9);
              sessionStorage.setItem('userLocation', JSON.stringify([latitude, longitude]));
            },
            (error) => {
              console.error('Error getting user location:', error);
              // Use default center if getting user location fails
              this.map.setView([39.8282, -98.5795], 3);

            }

          );
        } else {
          // Use saved user location from sessionStorage
          const savedLocationArray = JSON.parse(savedLocation!) as [number, number];
          this.map.setView(savedLocationArray, 9);
          console.log(savedLocationArray);


        }


      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    }
  }

  private async updateMap(location: [number, number], weatherData: any): Promise<void> {
    if (!this.map) {
      // Initialize the map if not already initialized
      await this.initMap();
    }
    this.map.setView(location, 9);

    // Add a marker to the map
    const L = await import('leaflet');
    var myIcon = L.icon({
      iconUrl: '../../assets/marker1.png',
      iconSize: [30, 40]
    });
    const marker = L.marker(location, { icon: myIcon }).addTo(this.map);

    // Create a div with weather details and set it as a popup on the marker
    const popupContent = `
      <div style="background: #ff6900; padding: 10px;">
        <p>Temperature: ${weatherData.current.temp_c}°C</p>
        <p>Location: ${weatherData.location.name}</p>
        <p>Local Time: ${weatherData.location.localtime}</p>
        <img src="${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}" />
        <p>${weatherData.current.condition.text}</p>
      </div>
    `;
    marker.bindPopup(popupContent).openPopup();
    this.updateMapData.emit({ location, weatherData });
    console.log( weatherData  );

    this.homeService.postMapData(weatherData).subscribe(
      (response) => {
        console.log('Map data sent successfully:', response);
      },
      (error) => {
        console.error('Error sending map data:', error);
      }
    );
  }
  ngOnInit(): void {
    // Subscribe to changes in the searchTerm
    console.log('ngOnInit called');
    this.subscribeToSearchTermChanges();
  }

  private subscribeToSearchTermChanges(): void {
    // Subscribe to changes in the searchTerm
    console.log('Subscribed to searchTerm$ changes');
    this.subscription=  this.homeService.searchTerm$.subscribe((searchTerm: string) => {
      // Use geocoding service or any other method to get the coordinates for the location
      console.log('Search term changed:', searchTerm);
      this.getCoordinates(searchTerm).then(location => {
        // Fetch weather details using the provided API
        const url = `https://api.weatherapi.com/v1/current.json?key=d0b4be268504482db2c184600232008&q=${searchTerm}`;
        console.log("helo", searchTerm);

        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.updateMap(location, data);
            console.log("updateMap", data);

          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
      });
    });
  }

  private async getCoordinates(searchTerm: string): Promise<[number, number]> {
    // Replace this with your logic to fetch coordinates based on the search term
    // For simplicity, let's assume a fictional geocoding service
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d0b4be268504482db2c184600232008&q=${searchTerm}`);
    const data = await response.json();
    console.log(data);

    return [data.location.lat, data.location.lon];
  }
  ngOnDestroy(): void {
    // Unsubscribe from the observable to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    this.initMap();
  }
}
