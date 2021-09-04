import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SearchService } from 'src/app/services/search.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
@Component({
  selector: 'async-promise-pipe',
  template: `
  <ng-template let-results [ngTemplateOutletContext]="{ $implicit: results$ | async }" [ngTemplateOutlet]="t" #t>
    <p *ngFor="let result of results">{{result}}</p>
    <p *ngIf="results === null">results is loading for 2 seconds...</p>
    <p *ngIf="results?.length === 0">results resolved empty</p>
  </ng-template>`
})

export class ResultsComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  duration: {};
  current = 1;
  rooms: Array<Object>;
  occupants: number;
  accommodations: Array<Object>;
  results$: Observable<any>;
  filtered$: Observable<any>;
  accommodationList: string[] = ["Wheelchair Accessible", "Pet Friendly", "Smoking Room"];
  invisible = true;

  constructor(public app: AppComponent, private router: Router, private _searchService: SearchService) { }

  ngOnInit(): void {
    this.app.setTitle("Select Room");

    if (this._searchService.getSearch().rooms.length > 0) {
      let search = this._searchService.getSearch();

      this.duration = search.duration;
      this.rooms = search.rooms;
      this.occupants = search.occupants;
      this.accommodations = search.accommodations;
      this.results$ = this._searchService.searchSuites().pipe(map(v => (v === null || v === undefined) ? [] : v));
    }
    else {
      this.router.navigateByUrl("reservations/check-availability");
    }
  }

  checkAvailability(travelDuration) {
    this.duration = this._searchService.formatDuration(travelDuration);
    this._searchService.setFilter("duration", this.duration);
    // this._searchService.setFilter("rooms", this.rooms);
    // this._searchService.setFilter("accommodations", this.accommodations);
    this.results$ = this._searchService.searchSuites();
  }

  toggleForm(visible) {
    this.invisible = visible;
  }

  updateRooms(num) {
    if (num > this.rooms.length) {
      this.rooms.push({
        adults: 1,
        children: Array<number>()
      });
      this.occupants += 1;
    }
    else {
      let room = this.rooms[num - 1];
      console.log(room);

      let occupants = room["adults"] + room["children"].length;
      console.log(occupants);

      this.occupants -= occupants;
      this.rooms.pop();
    }
    
    this.rooms = this.rooms.filter(room => room != null);
  }

  selectRoom(suite_id, room_id) {
    console.log(`Suite: ${suite_id}\nSelected Room: ${room_id}`);

    if (this.rooms.length > 1) {
      this.current++;
    }
  }

  get MAX_ROOMS() {
    return SearchService.MAX_ROOMS;
  }
}