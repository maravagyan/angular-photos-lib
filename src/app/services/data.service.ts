import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) {}

  get<T>(url: string): Observable<any> {
    return this.http.get<T>(url).pipe(
      tap(
        res => {
          this.onSuccess(res);
        },
        error => {
          this.onError(error);
        }
      )
    );
  }

  private onSuccess<T>(res: T): void {
    console.log(res);
  }

  private onError(error: any): void {
    console.log(error);
  }
}

