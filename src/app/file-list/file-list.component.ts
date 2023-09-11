import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit {
  fileNames: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const serverUrl = 'http://localhost:3000';

    this.http.get<any>(`${serverUrl}/api/files`).subscribe(
      (response) => {
        this.fileNames = response.files;
      },
      (error) => {
        console.error('Error fetching file names:', error);
      }
    );
  }
}
