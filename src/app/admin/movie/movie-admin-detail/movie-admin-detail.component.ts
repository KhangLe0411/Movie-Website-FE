import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieAdminService } from '../movie-admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateMovieRequest } from '../create-movie/createMovieRequest';
import { ActivatedRoute } from '@angular/router';
import { EpisodeRequest } from './episodeRequest';

@Component({
  selector: 'app-movie-admin-detail',
  templateUrl: './movie-admin-detail.component.html',
  styleUrl: './movie-admin-detail.component.css',
})
export class MovieAdminDetailComponent implements OnInit {
  checked: boolean = false;
  dropdownDirectorList!: any;
  dropdownGenreList!: any;
  dropdownActorList!: any;
  dropdownNationalList!: any;
  dropdownMultiSettings!: any;
  dropdownSingleSettings!: any;
  selectedDirector!: any;
  selectedGenre!: any;
  selectedActor!: any;
  selectedNational!: any;
  selectedFilmType!: any;
  selectedStatus!: any;
  form!: FormGroup;
  episodeForm!: FormGroup;
  episodes!: any;
  reviews!: any;
  response: any;
  request: CreateMovieRequest;
  episodeRequest!: EpisodeRequest;

  constructor(
    private movieService: MovieAdminService,
    private route: ActivatedRoute
  ) {
    this.request = {
      title: '',
      trailer: '',
      description: '',
      releaseYear: 0,
      movieType: '',
      status: false,
      countryId: 0,
      genreIds: [],
      directorIds: [],
      actorIds: [],
      price: 0,
    };

    this.episodeRequest = {
      episode: 0,
      title: '',
      filmId: 0,
      status: false,
    };
  }

  ngOnInit(): void {
    this.initForm();
    this.getMovieDetail(this.getFilmId());
    this.getAllDirectors();
    this.getAllActors();
    this.getAllGenres();
    this.getAllCountries();
    this.dropdownMultiSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
    this.dropdownSingleSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
    };
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      trailer: new FormControl('', [Validators.required]),
      releaseyear: new FormControl(0, [Validators.required]),
      filmtype: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      director: new FormControl([], [Validators.required]),
      actor: new FormControl([], [Validators.required]),
      genre: new FormControl([], [Validators.required]),
      national: new FormControl('', [Validators.required]),
      price: new FormControl(0),
    });

    this.episodeForm = new FormGroup({
      episodeTitle: new FormControl('', [Validators.required]),
      episode: new FormControl('', [Validators.required]),
      status: new FormControl(false, [Validators.required]),
    });
  }

  get Title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get Trailer(): FormControl {
    return this.form.get('trailer') as FormControl;
  }

  get ReleaseYear(): FormControl {
    return this.form.get('releaseyear') as FormControl;
  }

  get Description(): FormControl {
    return this.form.get('desc') as FormControl;
  }

  get Director(): FormControl {
    return this.form.get('director') as FormControl;
  }

  get Actor(): FormControl {
    return this.form.get('actor') as FormControl;
  }

  get Genre(): FormControl {
    return this.form.get('genre') as FormControl;
  }

  get National(): FormControl {
    return this.form.get('national') as FormControl;
  }

  get Status(): FormControl {
    return this.form.get('status') as FormControl;
  }

  get FilmType(): FormControl {
    return this.form.get('filmtype') as FormControl;
  }

  getFilmId(): number {
    var id: number = 0;
    this.route.url.subscribe((url) => {
      id = Number(url[2].path);
    });
    return id;
  }

  getAllDirectors() {
    this.movieService.getAllDirectors().subscribe({
      next: (data) => {
        this.dropdownDirectorList = data.map((item: any) => ({
          item_id: item.id,
          item_text: item.name,
        }));
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  getAllActors() {
    this.movieService.getAllActors().subscribe({
      next: (data) => {
        this.dropdownActorList = data.map((item: any) => ({
          item_id: item.id,
          item_text: item.name,
        }));
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  getAllGenres() {
    this.movieService.getAllGenres().subscribe({
      next: (data) => {
        this.dropdownGenreList = data.map((item: any) => ({
          item_id: item.id,
          item_text: item.name,
        }));
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  getAllCountries() {
    this.movieService.getAllCountries().subscribe({
      next: (data) => {
        this.dropdownNationalList = data.map((item: any) => ({
          item_id: item.id,
          item_text: item.name,
        }));
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  groupPrice() {
    const accessType = document.getElementById(
      'accessType'
    ) as HTMLInputElement;

    accessType?.addEventListener('change', () => {
      this.checked = accessType.checked ? true : false;
    });
  }

  getMovieDetail(filmId: number) {
    return this.movieService.getMovieDetail(filmId).subscribe({
      next: (data) => {
        this.episodes = data.episodes;
        this.response = data.film;
        this.reviews = data.reviews;
        console.log(this.reviews);
        if (this.response.accessType === 'PAID') {
          this.checked = true;
        }

        this.selectedDirector = this.response.directors.map((item: any) => ({
          item_id: item.id,
          item_text: item.name,
        }));

        this.selectedActor = this.response.actors.map((item: any) => ({
          item_id: item.id,
          item_text: item.name,
        }));

        this.selectedGenre = this.response.genres.map((item: any) => ({
          item_id: item.id,
          item_text: item.name,
        }));

        this.selectedNational = [
          {
            item_id: this.response.country.id,
            item_text: this.response.country.name,
          },
        ];

        if (this.response.type === 'PHIM_LE') {
          this.selectedFilmType = [
            {
              item_id: 1,
              item_text: 'Phim lẻ',
            },
          ];
        } else if (this.response.type === 'PHIM_BO') {
          this.selectedFilmType = [
            {
              item_id: 2,
              item_text: 'Phim bộ',
            },
          ];
        } else {
          this.selectedFilmType = [
            {
              item_id: 3,
              item_text: 'Phim chiếu rạp',
            },
          ];
        }

        this.selectedStatus = [
          {
            item_id: this.response.status === true ? 1 : 2,
            item_text: this.response.status,
          },
        ];
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  updateFilm() {
    this.request.title = this.form.get('title')?.value;
    this.request.trailer = this.form.get('trailer')?.value;
    this.request.releaseYear = Number(this.form.get('releaseyear')?.value);
    this.request.description = this.form.get('desc')?.value;
    this.request.directorIds = this.form
      .get('director')
      ?.value.map((element: any) => Number(element.item_id));
    this.request.actorIds = this.form
      .get('actor')
      ?.value.map((element: any) => Number(element.item_id));
    this.request.genreIds = this.form
      .get('genre')
      ?.value.map((element: any) => Number(element.item_id));
    this.request.countryId = Number(
      this.form.get('national')?.value[0].item_id
    );
    this.request.movieType = this.form.get('filmtype')?.value[0].item_text;
    this.request.status = Boolean(this.form.get('status')?.value[0].item_text);
    this.request.price = this.checked
      ? Number(this.form.get('price')?.value)
      : 0;

    console.log(this.request);
  }

  openModalAddEpisode() {
    const modalDiv = document.getElementById('modal-episode');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  addEpisode() {
    this.episodeRequest.episode = this.episodeForm.get('episode')?.value;
    this.episodeRequest.filmId = this.getFilmId();
    this.episodeRequest.title = this.episodeForm.get('episodeTitle')?.value;
    this.episodeRequest.status = this.episodeForm.get('status')?.value;

    console.log(this.episodeRequest);
  }

  closeModalAddEpisode() {
    const modalDiv = document.getElementById('modal-episode');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  uploadVideo(event: Event){}
} 
