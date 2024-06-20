export interface CreateMovieRequest {
  title: string;
  trailer: string;
  description: string;
  releaseYear: number;
  movieType: string;
  status: boolean;
  countryId: number;
  genreIds: number[];
  directorIds: number[];
  actorIds: number[];
  price: number;
}
