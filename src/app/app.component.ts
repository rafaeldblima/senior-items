import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  innerWidth: any;
  showMenu = true;

  constructor() {
  }

  ngOnInit(): void {

    this.innerWidth = window.innerWidth;
    if (innerWidth <= 640) {
      this.showMenu = false;
    }
  }
}
