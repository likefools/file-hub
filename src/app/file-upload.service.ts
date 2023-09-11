import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = '/api';
  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData) {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getFilesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
