import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { NavbarComponent } from '../UI/navbar/navbar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    MoviesComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class MoviesModule { }
