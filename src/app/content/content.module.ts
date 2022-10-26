import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './components/photos/photos.component';
import { SinglePhotoComponent } from './components/single-photo/single-photo.component';
import  {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [PhotosComponent, SinglePhotoComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    PhotosComponent,
    SinglePhotoComponent,

  ]
})
export class ContentModule { }
