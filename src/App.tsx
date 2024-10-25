import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import { Movie } from './types/types';

function App() {
	const [movies, setMovies] = useState<Array<Movie>>([]);

	const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);

	const handleAccept = () => {
		setCurrentMovieIndex((prev) => prev + 1);
		console.log('Accepted');
	};

	const handleReject = () => {
		setCurrentMovieIndex((prev) => prev + 1);
		console.log('Rejected');
	};

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
			{movies.length > 0 && currentMovieIndex < movies.length ? (
				<MovieCard
					key={movies[currentMovieIndex].id}
					title={movies[currentMovieIndex].title}
					summary={movies[currentMovieIndex].summary}
					image={movies[currentMovieIndex].imageURL}
					rating={movies[currentMovieIndex].rating}
					onAccept={handleAccept}
					onReject={handleReject}
				/>
			) : (
				<h1>No more movies to display</h1>
			)}

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
