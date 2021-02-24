import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr/flatpickr-defaults.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: FlatpickrDefaultsInterface = {
    altInput: true,
    altFormat: "m-j-Y",
    dateFormat: "m-j-Y",
    convertModelValue: true,
    minDate: "today",
    monthSelectorType: "dropdown",
    wrap: true,
    parseDate: (datestr) => {
      return new Date(datestr);
    }
  };
  
  public constructor(private titleService: Title) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle + " | Nautilus");
  }
}