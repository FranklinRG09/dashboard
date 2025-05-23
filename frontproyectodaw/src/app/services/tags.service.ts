import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  getTags(): Observable<any> {
    return this.http.get(`${this.apiService.API_ENDPOINTS.tags.getAll}`);
  }

  getTagById(id: number): Observable<any> {
    return this.http.get(`${this.apiService.API_ENDPOINTS.tags.getById(id)}`);
  }

  createTag(tag: any): Observable<any> {
    return this.http.post(`${this.apiService.API_ENDPOINTS.tags.create}`, tag);
  }

  updateTag(id: number, tag: any): Observable<any> {
    return this.http.put(`${this.apiService.API_ENDPOINTS.tags.update(id)}`, tag);
  }

  deleteTag(id: number): Observable<any> {
    return this.http.delete(`${this.apiService.API_ENDPOINTS.tags.delete(id)}`);
  }

  getAllTags(): Observable<any> {
    return this.http.get(`${this.apiService.API_ENDPOINTS.tags.getAll}`);
  }


}
