import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateMovieRequest } from './createMovieRequest';
import { MovieAdminService } from '../movie-admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EpisodeRequest } from '../movie-admin-detail/episodeRequest';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css',
})
export class CreateMovieComponent implements OnInit {
  checked: boolean = false;
  dropdownDirectorList!: any;
  dropdownGenreList!: any;
  dropdownActorList!: any;
  dropdownNationalList!: any;
  dropdownMultiSettings!: any;
  dropdownSingleSettings!: any;
  form!: FormGroup;
  request!: CreateMovieRequest;
  // selectedItems: any = [
  //   { item_id: 1, item_text: 'Viễn Tây' },
  //   { item_id: 2, item_text: 'Hành động' },
  // ];

  constructor(private movieService: MovieAdminService) {
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
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllGenres();
    this.getAllCountries();
    this.getAllActors();
    this.getAllDirectors();
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
  }

  groupPrice() {
    const accessType = document.getElementById(
      'accessType'
    ) as HTMLInputElement;

    accessType?.addEventListener('change', () => {
      this.checked = accessType.checked ? true : false;
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

  createMovie() {
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
}
