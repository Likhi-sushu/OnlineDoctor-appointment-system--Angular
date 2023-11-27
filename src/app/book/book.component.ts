import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Data, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';
import emailjs from '@emailjs/browser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookingDataService } from '../booking-data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  ScheduleAppointments: Object | undefined;
  fb: any;

  successNotification() {
    Swal.fire('Your appointment booked Successfully', 'Thank you', 'success');
  }

  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Proceed to Confirm Booking.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm.',
      cancelButtonText: 'Cancel or Edit',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Data saved successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Edit', ' Do You Have Any Changes in Booking.', 'error');
      }
    });
  }

  submitted = false;
  users: any;
  form: FormGroup = this.formBuilder.group({
    from_name: "",
    gender: "",
    age: "",
    phone: "",
    slot: "",
    date: "",
    message: "",
    city: "",
    doctor: "",
    hospital: "",
  })

  create!: Observable<Data[]>;
  data: Data[] = []
  id!: number

  constructor(private formBuilder: FormBuilder, private router: Router, private dataservice: DataService, private Http: HttpClient, private bookingDataService: BookingDataService) {
    // this.dataService.ScheduleAppointments().subscribe((data: Object)=>{
    //  this.ScheduleAppointments= data;
    // });
  }

  async send() {
    emailjs.init("tGrlQihk3qkKw_3X0");
    let response = await emailjs.send("service_vlqo1pu", "template_aq12fvg", {
      from_name: this.form.value.from_name,
      gender: this.form.value.gender,
      age: this.form.value.age,
      phone: this.form.value.phone,
      booking: this.form.value.booking,
      slot: this.form.value.slot,
      date: this.form.value.date,
      message: this.form.value.message,
      city: this.form.value.city,
      doctor: this.form.value.doctor,
      hospital: this.form.value.hospital,
    });
    //  alert('Message has been sent.');
    //  this.form.reset();
  }

  ngOnInit() {
    //Add form validations
    this.form = this.formBuilder.group({
      from_name: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      date: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]],
      booking: ['', [Validators.required, this.futureDateValidator]],
      city: ['', [Validators.required]],
      hospital: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
      slot: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      // age: [{ value: '', disabled: true }],
    });
    this.form.get('date')?.valueChanges.subscribe((date: string) => {
      const age = this.calculateAge(date);
      this.form.get('age')?.setValue(age);
    });

    const savedData = this.bookingDataService.getData();
    if (savedData && Object.keys(savedData).length > 0) {
      this.form.patchValue(savedData);  // populate form with saved data
    }

    if (this.form.valid) {
      this.dataservice.bookAppointment(this.form.value).subscribe(
        (response) => {
          console.log('Appointment booked successfully!', response);
        },
        (error) => {
          console.error('There was an error while booking the appointment', error);
        }
      );
    }
  }
  calculateAge(dob: string): number | null {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();

      // Check if birthday has occurred this year
      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    } else {
      return null;
    }
  }

  // futureDateValidator method
  futureDateValidator(control: FormControl): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
  
    if (selectedDate <= currentDate) {
      return { 'invalidDate': true };
    }
  
    return null;
  }
  // minDate method
  minDate(): string {
    const currentDate = new Date();
    // Assuming you want to allow booking from tomorrow onwards
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);

    // Format the date as a string in 'yyyy-MM-dd' format
    const formattedDate = tomorrow.toISOString().split('T')[0];

    return formattedDate;
  }

  // Add user form actions
  get f() { return this.form.controls; }

  onSubmit(data: any) {
    console.warn(data)
    // this.dataService.saveUser(data).subscribe((result: any)=>{
    //   console.warn(result)
    // })
    this.bookingDataService.setData(this.form.value);

    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    } else if (this.submitted) {
      this.alertConfirmation()
      setTimeout(() => {
        this.router.navigateByUrl('payment');
      }, 1000);
    }
  }
}
