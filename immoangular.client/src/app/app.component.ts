import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Property Scraper</h1>
    <app-property-list></app-property-list>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Property Scraper';
}
