import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { File, FileStore } from './file.store';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  fileNames: string[] = [];
  serverUrl = 'http://localhost:3000';
  fileUploaded = new Subject<void>();

  newItemLabel: string = '';
  selectedFileName: string = '';
  successMessage: string = '';
  alertSuccessColor: boolean = false;
  uploadProgress: number = 0;

  constructor(private http: HttpClient, private fileStore: FileStore) {}

  notifyFileUploaded() {
    this.fileUploaded.next();
  }

  downloadFile(file: File) {
    const downloadUrl = `${this.serverUrl}/api/download/${file.name}`;
    this.fileStore.update({ name: file.name, downloaded: true });
    window.open(downloadUrl, '_blank');
  }

  deleteFile(file: File) {
    this.http.delete(`${this.serverUrl}/api/delete/${file.name}`).subscribe(
      () => {
        console.log(`Deleted ${file.name}`);
        this.fileStore.update({ name: file.name, deleted: true });
        this.getFiles();
      },
      (error) => {
        console.error(`Error deleting ${file.name}:`, error);
      }
    );
  }

  getFiles() {
    this.http.get<any>(`${this.serverUrl}/api/files`).subscribe(
      (response) => {
        this.fileNames = response.files;
        this.fileNames.forEach((fileName) => {
          this.fileStore.update({ name: fileName });
        });
      },
      (error) => {
        console.error('Error fetching file names:', error);
      }
    );
  }

  uploadFile() {
    const fileInput = document.getElementById('files') as HTMLInputElement;
    const newFileName = document.getElementById('nameFile') as HTMLInputElement;
    const selectedFile = fileInput.files?.[0];

    if (selectedFile) {
      const formData = new FormData();

      if (newFileName.value.length === 0) {
        newFileName.value = selectedFile.name;
      } else {
        newFileName.value += '.' + selectedFile.name.split('.')[1];
      }
      const encodedFileName = encodeURIComponent(newFileName.value);
      formData.append('file', selectedFile, encodedFileName);

      this.http
        .post(`${this.serverUrl}/api/upload`, formData, {
          reportProgress: true,
          observe: 'events',
        })
        .subscribe(
          (response) => {
            if (
              response.type === HttpEventType.UploadProgress &&
              response.total
            ) {
              const progress = Math.round(
                (response.loaded / response.total) * 100
              );

              this.uploadProgress = progress;
            } else if (response.type === HttpEventType.Response) {
              console.log('File uploaded successfully:', response);
              this.fileStore.update({ name: encodedFileName, uploaded: true });
              this.uploadProgress = 0;
              this.getFiles();
              this.selectedFileName = '';
              newFileName.value = '';
              fileInput.value = '';

              this.successMessage = 'File uploaded successfully:';
              this.alertSuccessColor = true;
              this.showNotification();
            }
          },
          (error) => {
            console.error('File upload failed:', error);

            this.successMessage = 'File upload failed:';
            this.alertSuccessColor = false;
            this.showNotification();
          }
        );
    } else {
      console.warn('No file selected for upload.');
    }

    this.notifyFileUploaded();
  }

  showAlert = false;
  showNotification() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
