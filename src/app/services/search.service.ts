import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private search = {
    duration: {},
    rooms: Array<Object>(),
    accommodations: Array<Object>()
  };

  constructor() { }

  setFilter(filter, value) {
    if (filter == "accommodations") {
      this.search[filter] = value.filter(element => element.selected)
    }
    else {
      this.search[filter] = value;
    }
  }
  
  getSearch() {
    return this.search;
  }
}