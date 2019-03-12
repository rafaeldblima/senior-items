import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemModel } from '../model/item.model';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {

  @Input() items: ItemModel[] = [];

  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleDelete(item) {
    this.delete.emit(item);
  }

}
