import { useState } from 'react';
import MovieCard from './components/MovieCard';
import { useMovies } from './providers/MoviesProvider';

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

	return (
		<>
			{movies.length > 0 && currentMovieIndex < movies.length ? (
				<MovieCard
					key={movies[currentMovieIndex].id}
					id={movies[currentMovieIndex].id}
					title={movies[currentMovieIndex].title}
					summary={movies[currentMovieIndex].summary}
					image={movies[currentMovieIndex].imageURL}
					rating={movies[currentMovieIndex].rating}
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
