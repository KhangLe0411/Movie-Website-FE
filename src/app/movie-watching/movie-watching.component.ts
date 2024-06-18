import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieWatchingService } from './movie-watching.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie-watching',
  templateUrl: './movie-watching.component.html',
  styleUrl: './movie-watching.component.css',
})
export class MovieWatchingComponent implements OnInit {
  movieId!: number;
  slug!: string;
  tap!: string;
  episodes: any[] = [];
  currentEpisode!: any;

  constructor(
    private route: ActivatedRoute,
    private movieWatchingService: MovieWatchingService
  ) {
    this.route.url.subscribe((url) => {
      this.movieId = Number(url[1].path);
      this.slug = url[2].path;
    });
    this.tap = this.route.snapshot.queryParams['tap'];
  }

  ngOnInit(): void {
    this.getMoviewByIdAndTap();
  }

  activeTap(tap: string) {
    this.tap = tap;
    this.getMoviewByIdAndTap();
  }

  getMoviewByIdAndTap() {
    this.movieWatchingService
      .watchingMovieByMovieIdAndTap(this.movieId, this.slug, this.tap)
      .subscribe({
        next: (data) => {
          this.currentEpisode = data.currentEpisode;
          this.episodes = data.episodes;
        },
        error: (err: HttpErrorResponse) => {},
      });
  }
}
