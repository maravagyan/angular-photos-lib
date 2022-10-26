import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil, tap } from 'rxjs';
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
  photoItemsCount = 0;
  photosContainerHeight = 0;
  coefficentForScrolling = 563;
  initialPhotosCount = 9;
  favorites!: Array<IPhoto>;

  constructor(
    public photosService: PhotosService,
    public router: Router) {}

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
    this.getFavorites();
    this.photosService.getPhotos()
    .pipe(
      take(1))
     .subscribe(this.processPhotos.bind(this))
  }

  processPhotos(data: Array<IPhoto>): void{
    this.tempPhotosList = data.slice(0, 150);
    this.photosList = this.tempPhotosList.slice(0, this.initialPhotosCount);
    this.photosList.forEach((photo) => {
      this.favorites.forEach((favorite) => {
        if(photo.id === favorite.id){
          photo.isInFavorite = favorite.isInFavorite
        }
      })
    })
  }

  getFavorites(): void {
    this.favorites = JSON.parse(window.localStorage.getItem('favorites') as any)
  }

  addToFavorites(selected: IPhoto): void {
    selected.isInFavorite = true;
      this.favorites.push(selected);
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  goToSinglePhoto(selected: IPhoto) {
    this.photosService.selectedPhoto$.next(selected)
    this.router.navigate(['/single-photo']);
  }
}
