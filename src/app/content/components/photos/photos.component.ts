import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IPhoto } from 'src/app/shared/models/photo.interface';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  @ViewChild('photosContainer') photosContainer!: ElementRef;
  loading = false;
  photosList: Array<IPhoto> = [];
  tempPhotosList: Array<IPhoto> = [];
  photoItemsCount: number = 0;
  photosContainerHeight: number = 0;
  coefficentForScrolling: number = 563;
  initialPhotosCount: number = 9;
  favorites!: Array<IPhoto>;

  constructor(
    private photosService: PhotosService,
    private router: Router) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.photosContainerHeight = (
      this.photosContainer.nativeElement as HTMLElement
    )?.scrollHeight;
    if (
      Math.round(window.scrollY) + this.coefficentForScrolling >=
      this.photosContainerHeight
    ) {
      this.loading = true;
      const arr = this.tempPhotosList.slice(
        this.photosList.length,
        this.photosList.length + this.initialPhotosCount
      );
      this.photosList.push(...arr);
    }
  }
  ngOnInit() {
    this.favorites = JSON.parse(window.localStorage.getItem('favorites') as any)
    this.photosService.getPhotos().subscribe((data: Array<IPhoto>) => {
      this.tempPhotosList = data.slice(0, 150);
      this.photosList = this.tempPhotosList.slice(0, this.initialPhotosCount);
      this.photosList.forEach((photo) => {
        this.favorites.forEach((favorite) => {
          if(photo.id === favorite.id){
            photo.isInFavorite = favorite.isInFavorite
          }
        })
      })
    });

  }

  addToFavorites(selected: any) {
    selected.isInFavorite = true;
      this.favorites.push(selected);
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  goToSinglePhoto(selected: IPhoto) {
    this.photosService.selectedPhoto$.next(selected)
    this.router.navigate(['/single-photo']);
  }
}
