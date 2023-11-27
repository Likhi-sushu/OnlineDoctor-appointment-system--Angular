import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  IsLoggedIn:boolean=false
  IsAdmin:boolean=false
  IsCustomer:boolean=false
  users: User[] = [];
  id!:number;
  userType!:string;
  firstName: any;
  
  constructor(public userService: UserService) { }

  ngOnInit(): void {

    
    this.IsLoggedIn=localStorage.getItem("User")!=null ;
    var x = localStorage.getItem("User");
   if(x){
    this.IsAdmin=JSON.parse(x).value.userType=='Admin';
    this.id=JSON.parse(x).user_id;
    console.log(this.id)
    this.IsCustomer = JSON.parse(x).value.userType=='Customer';
    this.id = JSON.parse(x).value.user_id;
    this.firstName=JSON.parse(x).value.firstName;
    console.log(this.id);    
    console.log(this.firstName);  
    
    

 }
//  this.load();
this.userService.getAll().subscribe((data: User[])=>{
  this.users = data;
  console.log(this.users);

})
  }
 Logout(){

   localStorage.removeItem("User");
   location.href = "/login";
   
 }

}

