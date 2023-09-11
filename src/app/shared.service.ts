import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
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
}
