import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren:() => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'movies',
    loadChildren:() => import('./movies/movies.module').then(m => m.MoviesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
