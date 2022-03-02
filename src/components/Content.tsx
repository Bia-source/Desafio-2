import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps{
    selectedGenreId: number;
    selectedGenreTitle: string;
}


export function Content({ selectedGenreId, selectedGenreTitle }:ContentProps) {
  // Complete aqui
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);
    
  return (
    <div className="container">
      <header>
          <span className="category">Categoria:<span> {selectedGenreTitle}</span></span>
        </header>
        <main>
          <div className="movies-list">
            {movies.map((item) => {
                 return (
                  <MovieCard 
                  key ={item.imdbID} 
                  title={item.Title} 
                  poster={item.Poster} 
                  runtime={item.Runtime} 
                  rating={item.Ratings[0].Value} 
               />
                 )
            })}
          </div>
        </main>
    </div>
  )
}
