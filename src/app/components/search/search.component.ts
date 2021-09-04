import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { SearchService } from "src/app/services/search.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})

export class SearchComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  duration: { from: Date, to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](5)
  };
  rooms: Array<Object>;
  accommodations: Array<Object>;

  constructor(public app: AppComponent, private _formBuilder: FormBuilder, private router: Router, private _searchService: SearchService) { 
    this.rooms = [
      {
        adults: 1,
        children: Array<number>()
      }
    ];

    this.accommodations = [
      {
        id: "WA", 
        name: "Wheelchair Accessible", 
        selected: false
      },
      {
        id: "PF", 
        name: "Pet Friendly", 
        selected: false
      },
      {
        id: "SR", 
        name: "Smoking Room", 
        selected: false
      } 
    ];
  }

  ngOnInit(): void {
    this.app.setTitle("Check Availability");
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  updateRooms(num) {
    if (num > this.rooms.length) {
      this.rooms.push({
        adults: 1,
        children: Array<number>()
      });
    }
    else {
      this.rooms.pop();
    }
    
    this.rooms = this.rooms.filter(room => room != null);
  }

  checkAvailability(travelDuration) {
    this.duration = this._searchService.formatDuration(travelDuration);
    this._searchService.setFilter("duration", this.duration);
    this._searchService.setFilter("rooms", this.rooms);
    this._searchService.setFilter("occupants", this._searchService.retrieveOccupants("sum"));
    this._searchService.setFilter("accommodations", this.accommodations);
    this.router.navigateByUrl("/reservations/select-room");
  }

  get MAX_ROOMS() {
    return SearchService.MAX_ROOMS;
  }
} 