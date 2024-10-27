import { useState } from 'react';
import MovieCard from './components/MovieCard';
import { useMovies } from './providers/MoviesProvider';
import { localMovies } from './data';

function App() {
	const { movies } = useMovies();

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
			const response = await fetch(
				`http://localhost:8080/recommendations/${movieId}/${decision}`,
				{
					method: 'PUT',
				}
			);

			if (!response.ok) {
				throw new Error('Error setting user decision in backend');
			}

			console.log(`${decision}d movie with id ${movieId}`);
		} catch (error) {
			console.log('Error setting user decision in backend: ', error);
		}
	};

	const getCurrentMovie = () => {
		const currentMovies = movies.length > 0 ? movies : localMovies;

		return currentMovies[currentMovieIndex] || null;
	};

	return (
		<>
			{currentMovieIndex <
			(movies.length > 0 ? movies.length : localMovies.length) ? (
				<MovieCard
					key={getCurrentMovie().id}
					id={getCurrentMovie().id}
					title={getCurrentMovie().title}
					summary={getCurrentMovie().summary}
					image={getCurrentMovie().imageURL}
					rating={getCurrentMovie().rating}
					onAccept={handleAccept}
					onReject={handleReject}
				/>
			) : (
				<h1 className="no-movies-text">No more movies to display...</h1>
			)}
		</>
	);
}

export default App;
