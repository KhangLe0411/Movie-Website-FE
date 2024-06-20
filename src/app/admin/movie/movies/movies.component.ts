import { Component, OnInit } from '@angular/core';
import { MovieAdminService } from '../movie-admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit{
  filmList!: any;

  constructor(private movieService: MovieAdminService) { }
  
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.movieService.getData().subscribe({
      next: (data) => {
        this.filmList = data;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }
}
