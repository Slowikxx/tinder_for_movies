// App.test.tsx
import { render, cleanup } from '@testing-library/react';
import App from '../../App';
import MoviesProvider from '../../providers/MoviesProvider';

import '@testing-library/jest-dom';

afterEach(() => {
	cleanup();
});

test('displays message when there are no movies left', async () => {
	jest.mock('../../providers/MoviesProvider.tsx', () => ({
		useMovies: () => ({
			movies: [],
		}),
	}));

	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: jest.fn(),
		})
	) as jest.Mock;

	const { getByText } = render(
		<MoviesProvider>
			<App />
		</MoviesProvider>
	);

	expect(getByText('No more movies to display...')).toBeInTheDocument();
});
