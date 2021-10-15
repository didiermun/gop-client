import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  logout(){
    localStorage.removeItem('gop_app_token');
    console.log(this.router.url);
    this.router.navigateByUrl("/")
  }

  ngOnInit(): void {
  }

}
