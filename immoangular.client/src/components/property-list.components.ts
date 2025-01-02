import { Component } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
    
@Component({
    selector: 'app-property-list',
    template: `
      <div class="property-input">
        <mat-form-field>
          <input matInput placeholder="Property URL" [(ngModel)]="propertyUrl">
        </mat-form-field>
        <button mat-raised-button (click)="scrapeProperty()">Add Property</button>
      </div>
  
      <mat-card *ngFor="let property of properties">
        <mat-card-title>{{property.title}}</mat-card-title>
        <mat-card-content>
          <p>Price: {{property.price | currency:'EUR'}}</p>
          <p>Location: {{property.location}}</p>
          <p>{{property.description}}</p>
        </mat-card-content>
      </mat-card>
    `
  })
  export class PropertyListComponent {
    properties: Property[] = [];
    propertyUrl: string = '';
  
    constructor(private propertyService: PropertyService) {
      this.loadProperties();
    }
  
    scrapeProperty() {
      this.propertyService.scrapeProperty(this.propertyUrl)
        .subscribe(property => {
          this.properties.unshift(property);
          this.propertyUrl = '';
        });
    }
  
    private loadProperties() {
      this.propertyService.getProperties()
        .subscribe(properties => this.properties = properties);
    }
  }