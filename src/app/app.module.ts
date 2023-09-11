import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component'; // Import FormsModule

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, FileUploadComponent],
  imports: [BrowserModule, NgbDropdownModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
