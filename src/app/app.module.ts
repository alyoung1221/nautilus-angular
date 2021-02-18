import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { AddressComponent } from './includes/address/address.component';
import { FooterComponent } from './includes/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReservationComponent } from './components/reservation/reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddressComponent,
    FooterComponent,
    ContactComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    FlatpickrModule.forRoot(),    
    NgxNumberSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
