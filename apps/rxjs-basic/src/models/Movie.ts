export interface Image {
  url: string;
  width: number;
  height: number;
}

type Certificate = 'G' | 'NR' | 'PG-13' | 'PG' | 'R';

export interface RatingsSummary {
  aggregateRating: number;
  voteCount: number;
}

export interface Movie {
  id: string;
  name: string;
  description: string;
  cast: string[];
  certificate: Certificate;
  genres: string[];
  image: Image;
  rank: number;
  ratingsSummary: RatingsSummary;
  releaseYear: number;
  runtime: number;
  tagline?: string;
  isFeatured: boolean;
}
