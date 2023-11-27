// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-menu',
//   templateUrl: './menu.component.html',
//   styleUrls: ['./menu.component.css']
// })
// export class MenuComponent {
//   // // showMenu = false;
//   // isMenuOpen = false;

//   // toggleMenu() {
//   //   this.isMenuOpen = !this.isMenuOpen;
//   // }
//   images: string[] = [
//     'https://placekitten.com/600/400',
//     'https://placekitten.com/601/400',
//     'https://placekitten.com/602/400',
//     // Add more image URLs as needed
//   ];

//   currentIndex: number = 0;

//   showNextImage() {
//     this.currentIndex = (this.currentIndex + 1) % this.images.length;
//   }

//   showPrevImage() {
//     this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
//   }
// }

// menu.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  images: string[] = [
    'https://thumbs.dreamstime.com/z/doctor-appointment-online-screen-medical-health-care-concept-doctor-appointment-online-screen-medical-health-care-133665689.jpg',
    'https://data1.ibtimes.co.in/photo/en/full/86358/this-occasion-doctors-day-i-express-my-gratitude-you-always-being-there-us-serving-us.jpg?w=900',
    'https://thumbs.dreamstime.com/z/doctor-appointment-online-screen-medical-health-care-concept-doctor-appointment-online-screen-medical-health-care-133665689.jpg',
    // Add more image URLs as needed
  ];

  currentIndex: number = 0;

  showNextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  showPrevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}


  



