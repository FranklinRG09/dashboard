import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  getLicenses(): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.licenses.getAll);
  }

  getLicenseById(id: number): Observable<any> {
    return this.http.get(this.apiService.API_ENDPOINTS.licenses.getById(id));
  }

  createLicense(license: any): Observable<any> {
    return this.http.post(this.apiService.API_ENDPOINTS.licenses.create, license);
  }

  updateLicense(id: number, license: any): Observable<any> {
    return this.http.put(this.apiService.API_ENDPOINTS.licenses.update(id), license);
  }

  deleteLicense(id: number): Observable<any> {
    return this.http.delete(this.apiService.API_ENDPOINTS.licenses.delete(id));
  }
}
