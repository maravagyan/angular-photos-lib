import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhotosService } from './photos.service';

describe('PhotosService', () => {
  let service: PhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
        providers: [PhotosService]
    });
    service = TestBed.inject(PhotosService);
  });

  it('should be created', () => {
    const service: PhotosService = TestBed.get(PhotosService);
    expect(service).toBeTruthy();
   });

   it('should have getPhotos function', () => {
    const service: PhotosService = TestBed.get(PhotosService);
    expect(service.getPhotos).toBeTruthy();
   });
});





