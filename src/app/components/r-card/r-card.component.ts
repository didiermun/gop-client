import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-r-card',
  templateUrl: './r-card.component.html',
  styleUrls: ['./r-card.component.scss']
})
export class RCardComponent implements OnInit {
  @Input() report: any = {};

  constructor() {

   }
  

  ngOnInit(): void {
  }

}
