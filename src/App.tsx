import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import { Movie } from './types/types';

function App() {
	const [movies, setMovies] = useState<Array<Movie>>([]);

	const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);

	const handleAccept = () => {
		setCurrentMovieIndex((prev) => prev + 1);
		setUsersDecisionInBackend(movies[currentMovieIndex].id, 'accept');
	};

	const handleReject = () => {
		setCurrentMovieIndex((prev) => prev + 1);
		setUsersDecisionInBackend(movies[currentMovieIndex].id, 'reject');
	};

	const setUsersDecisionInBackend = async (
		movieId: string,
		decision: string
	) => {
		try {
			await fetch(`/recommendations/${movieId}/${decision}`, {
				method: 'PUT',
			});

			console.log(`${decision}d movie with id ${movieId}`);
		} catch (error) {
			console.log('Error setting user decision in backend: ', error);
		}
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
		</>
	);
}

export default App;
