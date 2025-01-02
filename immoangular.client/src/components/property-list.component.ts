import { Component } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-property-list',
  template: `
    <div class="container">
      <div class="property-input">
        <mat-form-field appearance="fill" class="url-input">
          <mat-label>Property URL</mat-label>
          <input matInput placeholder="Enter property URL" [(ngModel)]="propertyUrl">
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="scrapeProperty()" [disabled]="!propertyUrl">
          Add Property
        </button>
      </div>

      <div class="properties-grid">
        <mat-card *ngFor="let property of properties" class="property-card">
          <mat-card-header>
            <mat-card-title>{{property.title}}</mat-card-title>
            <mat-card-subtitle>{{property.location}}</mat-card-subtitle>
          </mat-card-header>
          <img *ngIf="property.images?.length" mat-card-image [src]="property.images[0]" [alt]="property.title">
          <mat-card-content>
            <p class="price">{{property.price | currency:'EUR'}}</p>
            <p class="description">{{property.description}}</p>
            <p class="source">Source: {{property.source}}</p>
          </mat-card-content>
          <mat-card-actions>
            <a mat-button [href]="property.sourceUrl" target="_blank">VIEW ORIGINAL</a>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .property-input {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      align-items: center;
    }
    .url-input {
      flex: 1;
    }
    .properties-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .property-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .price {
      font-size: 1.5em;
      font-weight: bold;
      color: #2196F3;
      margin: 16px 0;
    }
    .description {
      margin: 8px 0;
    }
    .source {
      color: #666;
      font-size: 0.9em;
    }
  `]
})
export class PropertyListComponent {
  properties: Property[] = [];
  propertyUrl: string = '';

  constructor(private propertyService: PropertyService) {
    this.loadProperties();
  }

  scrapeProperty() {
    if (!this.propertyUrl) return;
    
    this.propertyService.scrapeProperty(this.propertyUrl)
      .subscribe({
        next: (property) => {
          this.properties.unshift(property);
          this.propertyUrl = '';
        },
        error: (error) => {
          console.error('Error scraping property:', error);
          // TODO: Add proper error handling/display
        }
      });
  }

  private loadProperties() {
    this.propertyService.getProperties()
      .subscribe({
        next: (properties) => this.properties = properties,
        error: (error) => {
          console.error('Error loading properties:', error);
          // TODO: Add proper error handling/display
        }
      });
  }
} 