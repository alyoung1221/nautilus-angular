import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import 'firebase/firestore';
import { combineLatest, of } from "rxjs";
import { map, switchMap } from 'rxjs/operators';
import { uniq } from 'lodash'
import { Suite } from 'src/models/suite.model';
import { Room } from 'src/models/room.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  static MAX_ROOMS = 4;
  private search = {
    duration: {},
    rooms: Array<Object>(),
    occupants: 0,
    accommodations: Array<Object>(),
    results: Array<Object>()
  };

  constructor(public app: AppComponent, private db: AngularFirestore) { }

  setFilter(filter, value) {
    this.search[filter] = value;
  }
  
  getSearch() {
    return this.search;
  }

  searchSuites() {
    this.search.results.length = 0;
    let roomsCollection: AngularFirestoreCollection;

    let occupants = this.retrieveOccupants();
    let accommodations = this.search.accommodations.filter(a => a["selected"]).map(a => a["id"]);

    if (accommodations.length > 0) {
      roomsCollection = this.db.collection<Room>("rooms",  ref => ref.where("available", "<=", this.search.duration["from"]).where("occupants", "==", occupants).where("accommodations", "array-contains-any", accommodations).orderBy("available").orderBy("price"));
    }
    else {
      roomsCollection = this.db.collection<Room>("rooms",  ref => ref.where("available", "<=", this.search.duration["from"]).where("occupants", "==", occupants).orderBy("available").orderBy("price"));
    }
    
    return roomsCollection.valueChanges({ idField: "id"})
    .pipe(
      switchMap((rooms) => {
        if (!rooms.length) {          const suite_ids = uniq(rooms.map(room => room.suite_id))
 return this.db.collection<Suite>("suites", ref => ref.where("id", "==", suite_id)).valueChanges({ idField: "id"})
            .pipe(map(suites => suites[0]))
            }))
          ])
        }
      }),    
      map(([rooms, suites]) => {
        if (rooms == undefined) {
          return [];
        }
        else {
          return suites.map(suite => { 
            return {
              ...suite,
              rooms: rooms.filter(r => r.suite_id == suite.id)
            }
          });
        }
      })
    )
  }

  retrieveOccupants(action = null) {
    let occupants = Array<number>();

    this.search.rooms.forEach(room => {
      occupants.push(room["adults"] + room["children"].length);
    });

    if (action == "sum") {
     return occupants.reduce((a, b) => a + b, 0)
    }
    else {
      return occupants;
    }
  }

  formatDuration(travelDuration) {
    if (travelDuration.includes("to")) {
      let from = this.app.options.parseDate(travelDuration.substring(0, travelDuration.indexOf("to")));
      let to = this.app.options.parseDate(travelDuration.substring(travelDuration.indexOf("to") + 3));

      return {
        from: from,
        to: to
      };    
    }
  }
}