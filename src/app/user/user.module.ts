import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  exports: [
    FavoritesComponent
  ]
})
export class UserModule { }
