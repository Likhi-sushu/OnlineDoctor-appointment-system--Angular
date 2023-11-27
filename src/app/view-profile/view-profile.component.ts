import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
 
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user_id!: number;
  user!: User;
  id!:number;
  showPassword = false;
 
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }
 
  ngOnInit(): void {
    // this.userid = this.route.snapshot.params['userid'];
    //     console.log(this.userid);
    // this.userService.find(this.userid).subscribe((data: User)=>{
    //   console.log(data);
    //   this.user = data;
    // });
    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('user_id');
 
      if (userIdParam !== null && userIdParam !== undefined) {
        this.user_id = +userIdParam;
        console.log(this.user_id);
 
        this.userService.find(this.user_id).subscribe((data: User) => {
          console.log(data);
          this.user = data;
        });
      } else {
        console.error("'user_id' parameter is null or undefined");
      }
    });
  }
  goToUserBookings() {
    if (this.user_id !== null) {
      this.router.navigate(['/user-appointment', this.user_id]);
    }
}
 
}
 
 