import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../shared.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.getFiles();
  }

  // downloadFile(fileName: string) {
  //   // Make an HTTP GET request to download the file
  //   this.http
  //     .get(`${this.sharedService.serverUrl}/api/download/${fileName}`, {
  //       responseType: 'blob',
  //     })
  //     .subscribe(
  //       (data) => {
  //         // Create a blob URL for the file and trigger download
  //         const blob = new Blob([data], { type: 'application/octet-stream' });
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = fileName;
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //       },
  //       (error) => {
  //         console.error(`Error downloading ${fileName}:`, error);
  //       }
  //     );
  // }
  downloadFile(fileName: string) {
    // Construct the download URL on the server
    const downloadUrl = `${this.sharedService.serverUrl}/api/download/${fileName}`;

    // Trigger the file download by opening the URL in a new window
    window.open(downloadUrl, '_blank');
  }

  deleteFile(fileName: string) {
    // Make an HTTP DELETE request to delete the file
    this.http
      .delete(`${this.sharedService.serverUrl}/api/delete/${fileName}`)
      .subscribe(
        () => {
          console.log(`Deleted ${fileName}`);

          this.sharedService.getFiles();
        },
        (error) => {
          console.error(`Error deleting ${fileName}:`, error);
        }
      );
  }
}
