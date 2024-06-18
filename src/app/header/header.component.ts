import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  checkExp!: any;
  username!: string;
  img!: string;
  role!: string;
  genres: any;
  countries: any;

  constructor(private authService: AuthService, private router: Router, private homeService: HomeService) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.authService.username.subscribe(
      (data: string) => (this.username = data)
    );
    this.authService.img.subscribe((data: string) => (this.img = data));
    this.isLoggedIn = this.authService.isLoggedIn();
    this.checkExp = this.authService.checkExp();
    this.username = this.authService.getUserName();
    this.img = this.authService.getImage();
    this.role = this.authService.getRole();
    this.homeService.getHomePage().subscribe({
      next: (data) => {
        this.genres = data.genres;
        this.countries = data.countries;
      }
    })
  }

  goToProfile() {
    this.router.navigateByUrl('/user-profile');
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
