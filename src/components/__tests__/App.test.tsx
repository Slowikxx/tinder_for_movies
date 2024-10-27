import { render, cleanup, screen } from '@testing-library/react';
import App from '../../App';
import { useMovies } from '../../providers/MoviesProvider';

import '@testing-library/jest-dom';

jest.mock('../../providers/MoviesProvider', () => ({
	useMovies: jest.fn(),
}));

jest.mock('../../data', () => ({
	localMovies: [],
}));

afterEach(() => {
	cleanup();
});

test('displays message when there are no movies left', async () => {
	(useMovies as jest.Mock).mockReturnValue({
		movies: [],
	});

	render(<App />);

	expect(screen.getByText('No more movies to display...')).toBeInTheDocument();
});
