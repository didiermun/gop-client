import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isloggedIn: boolean =  true;

  constructor(private router: Router) {
   }
  logout(){
    localStorage.removeItem('gop_app_token');
    console.log(this.router.url);
    this.router.navigateByUrl("/")
    this.isloggedIn = false;
  }

  ngOnInit(): void {
    if(!localStorage.getItem('gop_app_token')){
      this.isloggedIn = false;
    }
    else{
      this.isloggedIn = true;
    }
  }

}
