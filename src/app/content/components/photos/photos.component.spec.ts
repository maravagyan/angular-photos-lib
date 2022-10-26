import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from 'src/app/services/data.service';
import { mockPhotos } from 'src/app/shared/mocks/photos.mocks';
import { PhotosService } from '../../services/photos.service';

import { PhotosComponent } from './photos.component';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosComponent ],
      imports: [HttpClientTestingModule],
      providers: [PhotosService, DataService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component init', () => {
    const getFavoritesSpy = spyOn(component, 'getFavorites').and.callFake(() => {});
    component.ngOnInit();
    expect(getFavoritesSpy).toHaveBeenCalled();
  })

  it('should process photos', () =>{
    component.favorites = [mockPhotos[0]];
    component.processPhotos(mockPhotos);
    expect(component.tempPhotosList).toEqual(mockPhotos);
    expect(component.photosList.length).toBe(component.initialPhotosCount);
    expect(component.photosList[0].isInFavorite).toBe(component.favorites[0].isInFavorite)
  })

  it('should get favorites', () =>{
    localStorage.setItem('favorites', JSON.stringify(mockPhotos))
    component.getFavorites();
    expect(component.favorites).toEqual(mockPhotos);
  })

  it('should add to favorites', () =>{
    const [selected] = mockPhotos;
    component.favorites = [];
    component.addToFavorites(selected);
    expect(selected.isInFavorite).toBeTrue();
    expect(component.favorites).toEqual([selected]);
    expect(JSON.parse(localStorage.getItem('favorites') as string)).toEqual(component.favorites);
  })

  it('should go to photo details', () => {
    const [selected] = mockPhotos;
    const selectedPhotoSpy = spyOn(component.photosService.selectedPhoto$, 'next');
    const routerSpy = spyOn(component.router, 'navigate')

    component.goToSinglePhoto(selected);
    expect(selectedPhotoSpy).toHaveBeenCalledWith(selected);
    expect(routerSpy).toHaveBeenCalledWith(['/single-photo']);

  })
});
