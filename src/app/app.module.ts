import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsComponent } from './items/items.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { ItemsTableComponent } from './items/items-table/items-table.component';
import {
  ButtonModule,
  CalendarModule, ConfirmationService,
  ConfirmDialogModule,
  DropdownModule,
  InputMaskModule,
  InputTextModule,
  MessageModule, MessageService,
  MessagesModule,
  RadioButtonModule,
  TooltipModule
} from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ItemsComponent,
    EditItemComponent,
    TopbarComponent,
    ItemsTableComponent
  ],
  imports: [
    MenuModule,
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MessagesModule,
    MessageModule,
    RadioButtonModule,
    RouterModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    CalendarModule,
    CurrencyMaskModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    CommonModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
