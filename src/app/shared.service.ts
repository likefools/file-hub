import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}
  fileNames: string[] = [];
  serverUrl = 'http://localhost:3000';

  dropdownItems = [
    { label: 'Action' },
    { label: 'Another Action' },
    { label: 'Something Else' },
  ];

  getItems() {
    return this.dropdownItems;
  }

  addItem(newItem: { label: string }) {
    if (newItem.label.trim() !== '') {
      this.dropdownItems.push(newItem);
    }
  }
  //
  fileUploaded = new Subject<void>();

  // Function to notify subscribers that a file has been uploaded
  notifyFileUploaded() {
    this.fileUploaded.next();
  }

  getFiles() {
    this.http.get<any>(`${this.serverUrl}/api/files`).subscribe(
      (response) => {
        this.fileNames = response.files;
      },
      (error) => {
        console.error('Error fetching file names:', error);
      }
    );
  }
}
