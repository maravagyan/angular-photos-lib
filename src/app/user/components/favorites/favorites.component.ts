import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotosService } from 'src/app/content/services/photos.service';
import { IPhoto } from 'src/app/shared/models/photo.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Array<IPhoto> = [];

  constructor(
    private router: Router,
    private photosService: PhotosService) { }

  ngOnInit() {
    this.favorites = JSON.parse(window.localStorage.getItem('favorites') as any);
  }

  goToSinglePhoto(selected: IPhoto) {
    this.photosService.selectedPhoto$.next(selected)
    this.router.navigate(['/single-photo']);
  }

}


