import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NavbarComponent } from '../UI/navbar/navbar.component';
@NgModule({
  declarations: [
    MoviesComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
  ],
  exports: [ NavbarComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ],
})
export class MoviesModule { }
