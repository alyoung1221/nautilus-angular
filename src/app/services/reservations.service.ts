import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservations = {
    duration: {},
    suites: Array<Object>()
  };

  constructor(public app: AppComponent, private db: AngularFirestore) { }
}
