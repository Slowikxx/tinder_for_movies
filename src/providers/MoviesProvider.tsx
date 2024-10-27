import {
	useState,
	useEffect,
	createContext,
	PropsWithChildren,
	useContext,
} from 'react';
import { Movie, MoviesContextType } from '../types/types';

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export default function MoviesProvider({ children }: PropsWithChildren) {
	const [movies, setMovies] = useState<Array<Movie>>([]);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				// const response = await fetch('/data/recommendations.json');
				const response = await fetch('http://localhost:8080/recommendations');
				const data = await response.json();
				setMovies(data);
			} catch (error) {
				console.error('Error fetching movies: ', error);
			}
		};

		fetchMovies();
	}, []);

	return (
		<MoviesContext.Provider value={{ movies }}>
			{children}
		</MoviesContext.Provider>
	);
}

export const useMovies = () => {
	const context = useContext(MoviesContext);

	if (context === undefined) {
		throw new Error('useMovies must be used within a MoviesProvider');
	}
	return context;
};
