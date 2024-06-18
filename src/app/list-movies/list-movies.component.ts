import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieListService } from './movie-list.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.css',
})
export class ListMoviesComponent implements OnInit {
  singleMovie: any;
  seriesMovie: any;
  theaterMovie: any;
  storeMovie: any;
  genreMovie: any;
  genre!: string;
  countryMovie: any;
  country!: string;
  currentPage!: number;
  movieType!: string;
  slug!: string | null;
  activeUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieListService
  ) {
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.activeUrl = url[0].path;
      this.slug = this.route.snapshot.paramMap.get('slug');
      if (this.activeUrl === 'phim-le') {
        this.movieType = 'phim lẻ';
        this.getSingleMovie();
      } else if (this.activeUrl === 'phim-bo') {
        this.movieType = 'phim bộ';
        this.getSeriesMovie();
      } else if (this.activeUrl === 'phim-chieu-rap') {
        this.movieType = 'phim chiếu rạp';
        this.getTheaterMovie();
      } else if (this.activeUrl === 'cua-hang') {
        this.movieType = 'phim';
        this.getStoreMovie();
      } else if (this.activeUrl + '/' + this.slug === 'the-loai/' + this.slug) {
        this.getGenreSlugMovie();
      } else {
        this.getCountrySlugMovie();
      }
    });
  }

  getSingleMovie() {
    this.movieService.getSingleMovie(this.currentPage).subscribe({
      next: (data) => {
        this.currentPage = data.currentPage;
        this.singleMovie = data.pageData;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  getSeriesMovie() {
    this.movieService.getSeriesMovie(this.currentPage).subscribe({
      next: (data) => {
        this.currentPage = data.currentPage;
        this.seriesMovie = data.pageData;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  getTheaterMovie() {
    this.movieService.getTheaterMovie(this.currentPage).subscribe({
      next: (data) => {
        this.currentPage = data.currentPage;
        this.theaterMovie = data.pageData;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  getStoreMovie() {
    this.movieService.getStoreMovie(this.currentPage).subscribe({
      next: (data) => {
        this.currentPage = data.currentPage;
        this.storeMovie = data.pageData;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  getGenreSlugMovie() {
    this.movieService.getGenreSlugMovie(this.currentPage, this.slug).subscribe({
      next: (data) => {
        this.currentPage = data.currentPage;
        this.genreMovie = data.pageData;
        this.genre = data.genre.name;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  getCountrySlugMovie() {
    this.movieService
      .getCountrySlugMovie(this.currentPage, this.slug)
      .subscribe({
        next: (data) => {
          this.currentPage = data.currentPage;
          this.countryMovie = data.pageData;
          this.country = data.country.name;
        },
        error: (err: HttpErrorResponse) => {},
      });
  }

  previousPage() {}
  activePage(cur: number) {
    this.currentPage = cur;
    if (this.activeUrl === 'phim-le') {
      this.getSingleMovie();
    } else if (this.activeUrl === 'the-loai') {
      this.getGenreSlugMovie();
    }
  }
  nextPage() {}
}
