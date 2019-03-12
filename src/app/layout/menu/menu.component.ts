import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  @Input() hideMenu: boolean;

  constructor() {
  }

  ngOnInit() {
    this.items = [{
      label: 'Item',
      items: [
        {label: 'Pesquisar', icon: 'pi pi-fw pi-search', routerLink: ['/items']},
        {label: 'Adicionar', icon: 'pi pi-fw pi-plus', routerLink: ['/items/new-item']}
      ]
    }];
  }
}
