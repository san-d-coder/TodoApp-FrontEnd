import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [PageNotFoundComponent, NavbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    MaterialModule
  ],
  exports: [PageNotFoundComponent,NavbarComponent]
})
export class SharedModule { }
