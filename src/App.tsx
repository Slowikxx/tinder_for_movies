import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import { Movie } from './types/types';

function App() {
	const [movies, setMovies] = useState<Array<Movie>>([]);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await fetch('/data/recommendations.json');
				const data = await response.json();
				setMovies(data);
				console.log(movies);
			} catch (error) {
				console.error('Error fetching movies: ', error);
			}
		};

		fetchMovies();
	}, []);

	return (
		<>
			{movies.map((movie) => (
				<MovieCard
					key={movie.id}
					title={movie.title}
					summary={movie.summary}
					image={movie.imageURL}
					rating={movie.rating}
				/>
			))}

			{/* <MovieCard
				title="Star Wars"
				summary="Lorem ipsum..."
				image="https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SY1000_CR0,0,677,1000_AL_.jpg"
				rating={8.2}
			/> */}
		</>
	);
}

export default App;
