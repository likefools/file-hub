import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  newItemLabel: string = '';
  selectedFileName: string = '';
  successMessage: string = '';
  alertSuccessColor: boolean = false;

  constructor(private sharedService: SharedService, private http: HttpClient) {}
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
    const fileInput = document.getElementById('files') as HTMLInputElement;

    // Check if event.dataTransfer exists and has files
    if (event.dataTransfer && event.dataTransfer.files) {
      fileInput.files = event.dataTransfer.files;
      console.log('Selected file:', fileInput.files?.[0]);
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    // Handle the selected file here
    console.log('Selected file:', inputElement.files?.[0]);
  }
  // *******************************
  uploadFile() {
    const fileInput = document.getElementById('files') as HTMLInputElement;
    const newFileName = document.getElementById('nameFile') as HTMLInputElement;
    const selectedFile = fileInput.files?.[0];

    if (selectedFile) {
      // Set the folder name and create a FormData object
      const folderName = 'MY-FILES'; // Replace with your folder name
      const formData = new FormData();

      if (newFileName.value.length === 0) {
        newFileName.value = selectedFile.name;
      } else {
        newFileName.value += '.' + selectedFile.name.split('.')[1];
      }
      const encodedFileName = encodeURIComponent(newFileName.value);
      formData.append('file', selectedFile, encodedFileName);

      // Define the server URL where the Express.js server is running
      const serverUrl = 'http://localhost:3000'; // Replace with your server URL

      // Send a POST request to the server to upload the file
      this.http.post(`${serverUrl}/api/upload`, formData).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          // Handle the success response here
          this.sharedService.getFiles();
          this.selectedFileName = '';
          newFileName.value = '';
          this.successMessage = 'File uploaded successfully:';
          this.alertSuccessColor = true;
          this.showNotification();
        },
        (error) => {
          console.error('File upload failed:', error);
          // Handle errors here

          this.successMessage = 'File upload failed:';
          this.alertSuccessColor = false;
          this.showNotification();
        }
      );
    } else {
      console.warn('No file selected for upload.');
    }
    this.sharedService.notifyFileUploaded();
  }
  // *********************************

  showAlert = false; // Initialize as false to hide the alert initially

  // Function to show the alert
  showNotification() {
    this.showAlert = true;
    // Automatically hide the alert after 2 seconds (2000 milliseconds)
    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
  }
}
