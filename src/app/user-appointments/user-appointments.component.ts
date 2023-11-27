import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { __importStar } from 'tslib';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit {
 
  userBookings: any;
  user_id: number | null = null;
 
  booking: any;
 
  

  constructor(
    private bookingService: DataService, 
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    
  ) {
    this.route.paramMap.subscribe((params) => {
      const userIdParam = params.get('user_id');

      console.log(userIdParam);

      if (userIdParam !== null) {
        this.user_id = parseInt(userIdParam, 10);

        // Fetch user bookings based on the retrieved userId
        this.bookingService.getUserBookings(this.user_id).subscribe(
          (bookings) => {
            this.userBookings = bookings;
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
  
  fetchUserBookings() {
    // Fetch user bookings based on the userId
    if (this.user_id !== null) {
      this.bookingService.getUserBookings(this.user_id).subscribe(
        (bookings) => {
          this.userBookings = bookings;
          console.log(this.userBookings);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }



 
 
  

  ngOnInit(): void {
    this.fetchUserBookings();
  }
}