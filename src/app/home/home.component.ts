import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  onFileSelected(file: File) {
    // Handle the selected file here
    console.log('Selected file:', file);

    // You can add further logic, such as displaying file details or initiating the upload
  }
}
