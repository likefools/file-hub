import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface File {
  name?: string;
  downloaded?: boolean;
  uploaded?: boolean;
  deleted?: boolean;
}

export interface FileState extends EntityState<File> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'files' })
export class FileStore extends EntityStore<FileState, File> {
  constructor() {
    super();
  }
}
