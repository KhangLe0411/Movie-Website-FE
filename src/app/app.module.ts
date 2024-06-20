import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AuthInterceptor } from './token-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SafePipe } from './safe.pipe';
import { MovieWatchingComponent } from './movie-watching/movie-watching.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HeaderDashboardComponent } from './admin/header-dashboard/header-dashboard.component';
import { SidebarDashboardComponent } from './admin/sidebar-dashboard/sidebar-dashboard.component';
import { MoviesComponent } from './admin/movie/movies/movies.component';
import { MovieAdminDetailComponent } from './admin/movie/movie-admin-detail/movie-admin-detail.component';
import { CreateMovieComponent } from './admin/movie/create-movie/create-movie.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    HomeComponent,
    ListMoviesComponent,
    MovieDetailComponent,
    ForgotPasswordComponent,
    SafePipe,
    MovieWatchingComponent,
    DashboardComponent,
    HeaderDashboardComponent,
    SidebarDashboardComponent,
    MoviesComponent,
    MovieAdminDetailComponent,
    CreateMovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
