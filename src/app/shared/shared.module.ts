import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],

  exports: [
    HeaderComponent,
  ]
})
export class SharedModule { }
