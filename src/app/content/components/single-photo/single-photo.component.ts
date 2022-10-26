import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPhoto } from 'src/app/shared/models/photo.interface';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss']
})
export class SinglePhotoComponent implements OnInit {
  selectedPhoto!: IPhoto;
  favorites: Array<IPhoto> =[];

  constructor(
    private router: Router,
    private photosService: PhotosService) { }

  ngOnInit() {
    this.photosService.selectedPhoto$.subscribe((selected) => {
      this.selectedPhoto =selected
    })
    this.favorites = JSON.parse(window.localStorage.getItem('favorites') as any);
  }

  removeFromFavorites(selectedPhoto: IPhoto){
    this.favorites = this.favorites.filter((photo) => photo.id != selectedPhoto.id)
    window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.router.navigate(['favorites'])
  }

}
