import { environment } from 'src/environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common'; 
import { ClickOutsideModule } from 'ng-click-outside';
import { NgModule } from '@angular/core';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';

import { NgxNumberSpinnerModule } from 'ngx-number-spinner';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { AddressComponent } from './includes/address/address.component';
import { FooterComponent } from './includes/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { LoadingPipe } from 'src/pipes/loading.pipe';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddressComponent,
    FooterComponent,
    ContactComponent,
    SearchComponent,
    ResultsComponent,
    LoadingPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ClickOutsideModule,
    CommonModule,
    FormsModule, 
    FlatpickrModule.forRoot(), 
    MatButtonModule,    
    MatInputModule,
    MatProgressSpinnerModule,     
    MatRippleModule, 
    MatStepperModule,
    NgxNumberSpinnerModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }