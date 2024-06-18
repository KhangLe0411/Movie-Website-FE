import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  singleMovie: any;
  seriesMovie: any;
  theaterMovie: any;
  genres: any;

  constructor(private http: HttpClient, private toastr: ToastrService, private homeService: HomeService) {}

  ngOnInit(): void {
    this.getHomePage();
  }

  getHomePage() {
    this.homeService.getHomePage().subscribe({
      next: (data) => {
        this.singleMovie = data.singleMovie;
        this.seriesMovie = data.seriesMovie;
        this.theaterMovie = data.theaterMovie;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 500) {
          this.toastr.error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
        }
      }
    })
  }
}
