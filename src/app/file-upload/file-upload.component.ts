import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// sharedService
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(public sharedService: SharedService, private http: HttpClient) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const dropContainer = event.target as HTMLElement;
    dropContainer.classList.remove('drag-active');
    const fileInput = document.getElementById('files') as HTMLInputElement;

    if (event.dataTransfer && event.dataTransfer.files) {
      fileInput.files = event.dataTransfer.files;
      console.log('Selected file:', fileInput.files?.[0]);
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log('Selected file:', inputElement.files?.[0]);
  }

  uploadFile() {
    this.sharedService.uploadFile();
  }
}
