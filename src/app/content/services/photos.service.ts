import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { IPhoto } from 'src/app/shared/models/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  public selectedPhoto$: BehaviorSubject<any> = new BehaviorSubject({});

  apiUrl: string = 'https://jsonplaceholder.typicode.com/photos';

  constructor(
    private dataService: DataService  ) { }

    getPhotos(): Observable<IPhoto[]> {
      return this.dataService
        .get<IPhoto[]>(this.apiUrl)
        .pipe(retry(1));
    }

}
