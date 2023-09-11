import { Component, EventEmitter, Output } from '@angular/core';

import { SharedService } from '../shared.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  newItemLabel: string = '';

  constructor(private sharedService: SharedService) {}

  addItem() {
    this.sharedService.addItem({ label: this.newItemLabel });
    this.newItemLabel = '';
  }

  @Output() fileSelected = new EventEmitter<File>();
  selectedFile: File | undefined;

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave() {
    // Remove the "drag-active" class or perform other actions when dragging leaves the container
    // You can add any custom styling or behavior here
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const dropContainer = event.target as HTMLElement;
    dropContainer.classList.remove('drag-active');
    const fileInput = document.getElementById('images') as HTMLInputElement;

    // Check if event.dataTransfer exists and has files
    if (event.dataTransfer && event.dataTransfer.files) {
      fileInput.files = event.dataTransfer.files;
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    // Handle the selected file here
    console.log('Selected file:', inputElement.files?.[0]);
  }
}
