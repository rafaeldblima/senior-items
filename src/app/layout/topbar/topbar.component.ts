import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  pageTitle: string;
  @Output() showMenu: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.pageTitle = data.state.root.firstChild.data.title;
      }
    });
  }

  toggle() {
    this.showMenu.emit();
  }

}
