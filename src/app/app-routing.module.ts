import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { authGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { MovieWatchingComponent } from './movie-watching/movie-watching.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MoviesComponent } from './admin/movie/movies/movies.component';
import { MovieAdminDetailComponent } from './admin/movie/movie-admin-detail/movie-admin-detail.component';
import { CreateMovieComponent } from './admin/movie/create-movie/create-movie.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'phim-le', component: ListMoviesComponent },
  { path: 'phim-bo', component: ListMoviesComponent },
  { path: 'phim-chieu-rap', component: ListMoviesComponent },
  { path: 'the-loai/:slug', component: ListMoviesComponent },
  { path: 'quoc-gia/:slug', component: ListMoviesComponent },
  { path: 'cua-hang', component: ListMoviesComponent },
  { path: 'chi-tiet-phim/:id/:slug', component: MovieDetailComponent },
  { path: 'cua-hang/chi-tiet-phim/:id/:slug', component: MovieDetailComponent },
  { path: 'xem-phim/:id/:slug', component: MovieWatchingComponent },
  // admin
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/movies', component: MoviesComponent },
  { path: 'admin/movies/:id/detail', component: MovieAdminDetailComponent },
  { path: 'admin/movies/create', component: CreateMovieComponent },
  // auth
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
