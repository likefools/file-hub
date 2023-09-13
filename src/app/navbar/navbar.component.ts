import { Component, OnInit } from '@angular/core';

import { File } from '../file.store';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.getFiles();
  }

  downloadFile(fileName: string) {
    const file: File = {
      name: fileName,
    };
    this.sharedService.downloadFile(file);
  }

  deleteFile(fileName: string) {
    const deleteFile: File = {
      name: fileName,
    };
    this.sharedService.deleteFile(deleteFile);
  }
}
