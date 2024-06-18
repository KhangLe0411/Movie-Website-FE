import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailService } from './movie-detail.service';
import {
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../auth/shared/auth.service';
import { ReviewRequest } from './reviewRequest';
import { ReviewResponse } from './reviewResponse';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  currentPage = 1; // Trang hiện tại
  reviewsPerPage = 5; // Số lượng review hiển thị trên mỗi trang
  selectedRating: number;
  currentUser: any;
  accessType!: string;
  accessEpisodes!: boolean;
  movieId!: number;
  movieSlug!: string;
  movieDetail!: any;
  reviewRequest: ReviewRequest;
  reviewResponse!: ReviewResponse;
  reviews: ReviewResponse[] = [];
  episodes: any[] = [];

  isUpdated: boolean = false;
  reviewId!: number;

  // Test

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private movieDetailService: MovieDetailService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.accessType = this.route.snapshot.queryParams['type'];
    this.route.url.subscribe((url) => {
      if (url.length >= 4) {
        this.movieId = Number(url[2].path);
        this.movieSlug = url[3].path;
      } else {
        this.movieId = Number(url[1].path);
        this.movieSlug = url[2].path;
      }
    });
    this.selectedRating = 0;
    this.currentUser = this.authService.getCurrentUser();
    this.reviewRequest = {
      rating: 0,
      comment: '',
      filmId: 0,
    };
  }

  ngOnInit(): void {
    this.getMovieDetailPage();
  }

  onStarClick(rating: number) {
    // Cập nhật số sao đã chọn
    this.selectedRating = rating;

    // Thay đổi màu của các dấu sao
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingDisplay = document.querySelector('#rating-display');
    for (let i = 0; i < stars.length; i++) {
      if (i < rating) {
        stars[i].classList.add('selected');
        (
          ratingDisplay as HTMLInputElement
        ).textContent = `Bạn vote ${this.selectedRating}/10 sao`;
      } else {
        stars[i].classList.remove('selected');
      }
    }
  }

  open() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }

    const stars = document.querySelectorAll('.rating-stars i');
    const reviewContent = document.querySelector('#review-content');
    const ratingDisplay = document.querySelector('#rating-display');

    (reviewContent as HTMLInputElement).value = '';
    (ratingDisplay as HTMLInputElement).textContent = '';
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove('selected');
    }
  }

  openModalUpdateReview(id: number) {
    // find review by id in reviews
    const review = this.reviews.find((review) => review.id === id);

    // set currentRating of review to selectedRating in modal to show for user update
    this.selectedRating = Number(review?.rating);

    const modalDiv = document.getElementById('myModal');
    const stars = document.querySelectorAll('.rating-stars i');
    const reviewContent = document.querySelector('#review-content');
    const ratingDisplay = document.querySelector('#rating-display');

    (
      ratingDisplay as HTMLInputElement
    ).textContent = `Bạn vote ${this.selectedRating}/10 sao`;
    for (let i = 0; i < this.selectedRating; i++) {
      stars[i].classList.add('selected');
    }
    (reviewContent as HTMLInputElement).value = String(review?.comment);

    // show modal
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }

    //set isUpdated = true
    this.isUpdated = true;
    this.reviewId = id;
  }

  openModalBuyMovie() {
    const modalBuyMovie = document.getElementById('modalBuyMovie');
    if (!this.currentUser) {
      this.toastr.warning('Vui lòng đăng nhập để mua phim');
    }
    else {
      if (modalBuyMovie != null) {
        modalBuyMovie.style.display = 'block';
      }
    }
  }

  removeReview(id: number) {
    this.movieDetailService.deleteReview(id).subscribe({
      next: (_data) => {
        const index = this.reviews.findIndex((rv) => rv.id === id);
        this.reviews.splice(index, 1);
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  openTrailerModal() {
    const modalTrailerDiv = document.getElementById('trailerMovie');
    if (modalTrailerDiv != null) {
      modalTrailerDiv.style.display = 'block';
    }
  }

  close() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  closeTrailerModal() {
    const modalTrailerDiv = document.getElementById('trailerMovie');
    if (modalTrailerDiv != null) {
      modalTrailerDiv.style.display = 'none';
      this.stopVideo();
    }
  }

  closeModalBuyMovie() {
    const modalBuyMovie = document.getElementById('modalBuyMovie');
    if (modalBuyMovie != null) {
      modalBuyMovie.style.display = 'none';
    }
  }

  stopVideo() {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.src = videoElement.src; // Dừng phát lại video
  }

  sortReview() {
    this.reviews.sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);

      if (isNaN(dateA.getTime())) {
        return 1; // Đối tượng a.updatedAt không hợp lệ, đưa a lên trước b
      }

      if (isNaN(dateB.getTime())) {
        return -1; // Đối tượng b.updatedAt không hợp lệ, đưa b lên trước a
      }

      return dateB.getTime() - dateA.getTime();
    });
  }

  onSubmit() {
    // Xử lý gửi bình luận
    this.reviewRequest.rating = Number(this.selectedRating);
    this.reviewRequest.comment = (
      document.getElementById('review-content') as HTMLInputElement
    ).value;
    this.reviewRequest.filmId = Number(this.movieId);
    if (!this.isUpdated) {
      this.movieDetailService.createReview(this.reviewRequest).subscribe({
        next: (data) => {
          this.reviewResponse = data;
          this.reviews.push(this.reviewResponse);
          this.sortReview();
        },
        error: (err: HttpErrorResponse) => {},
      });
    } else {
      this.movieDetailService
        .updateReview(this.reviewRequest, this.reviewId)
        .subscribe({
          next: (data) => {
            this.reviewResponse = data;
            const index = this.reviews.findIndex(
              (rv) => rv.id === this.reviewResponse.id
            );
            if (index !== -1) {
              this.reviews[index] = this.reviewResponse;
            }
          },
          error: (err: HttpErrorResponse) => {},
        });
    }
    this.close();
  }

  getMovieDetailPage() {
    this.movieDetailService
      .getMovieDetailPage(this.movieId, this.movieSlug, this.accessType)
      .subscribe({
        next: (data) => {
          this.accessEpisodes = this.accessType === 'FREE' ? true : false;
          this.movieDetail = data.pageData;
          this.reviews = data.review;
          this.episodes = data.episodes;
          this.sortReview();
        },
        error: (err: HttpErrorResponse) => {},
      });
  }

  getRatingLabel(rating: number): string {
    if (rating >= 0 && rating <= 2) {
      return 'Tệ';
    } else if (rating > 2 && rating <= 5) {
      return 'Trung bình';
    } else if (rating > 5 && rating <= 8) {
      return 'Khá';
    } else if (rating > 8 && rating <= 10) {
      return 'Hay';
    } else {
      return '';
    }
  }

  getReviewsForCurrentPage(): ReviewResponse[] {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    return this.reviews.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getTotalPages(): number[] {
    const totalReviews = this.reviews.length;
    const totalPages = Math.ceil(totalReviews / this.reviewsPerPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nextPage() {
    if (
      this.currentPage < Math.ceil(this.reviews.length / this.reviewsPerPage)
    ) {
      this.currentPage++;
    }
  }
}
