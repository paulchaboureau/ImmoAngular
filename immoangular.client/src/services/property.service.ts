import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
@Injectable({
    providedIn: 'root'
  })
  export class PropertyService {
    constructor(private http: HttpClient) {}
  
    scrapeProperty(url: string): Observable<Property> {
      return this.http.post<Property>('/api/properties/scrape', url);
    }
  
    getProperties(): Observable<Property[]> {
      return this.http.get<Property[]>('/api/properties');
    }
  }