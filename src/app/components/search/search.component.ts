import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { SearchService } from "src/app/services/search.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})

export class SearchComponent implements OnInit {
  duration: { from: Date, to: Date };
  rooms: Array<Object>;
  accommodations: Array<Object>;

  constructor(public app: AppComponent, private _searchService: SearchService) { 
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
    this.app.setTitle("Reservations");
  }

  newRoom() {
    this.rooms.push({
      adults: 1,
      children: Array<number>()
    });
    this.rooms = this.rooms.filter(room => room != null);
  }

  checkAvailability(travelDuration) {
    let from = this.app.options.parseDate(travelDuration.substring(0, travelDuration.indexOf("to")));
    let to = this.app.options.parseDate(travelDuration.substring(travelDuration.indexOf("to") + 3));
    this.duration = {
      from: from,
      to: to
    };

    this._searchService.setFilter("duration", this.duration);
    this._searchService.setFilter("rooms", this.rooms);
    this._searchService.setFilter("accommodations", this.accommodations);
  }
} 