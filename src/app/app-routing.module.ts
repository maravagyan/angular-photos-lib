import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PhotosComponent } from './content/components/photos/photos.component';
import { SinglePhotoComponent } from './content/components/single-photo/single-photo.component';
import { FavoritesComponent } from './user/components/favorites/favorites.component';

const routes: Routes = [
  { path: '', component: PhotosComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'single-photo', component: SinglePhotoComponent },
  { path: '**', component: PhotosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
