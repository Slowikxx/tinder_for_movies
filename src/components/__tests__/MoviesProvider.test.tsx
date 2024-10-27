import { render, waitFor, cleanup, screen } from '@testing-library/react';
import MoviesProvider, { useMovies } from '../../providers/MoviesProvider';
import '@testing-library/jest-dom';

afterEach(() => {
	cleanup();
});

const TestComponent = () => {
	const { movies } = useMovies();
	return <div data-testid="test-component">{movies.length}</div>;
};

test('fetches and provides movies', async () => {
	const mockMovies = [
		{
			id: '1',
			title: 'Movie 1',
			summary: 'Summary 1',
			imageURL: '',
			rating: 5,
		},
	];

	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: jest.fn().mockResolvedValue(mockMovies),
		})
	) as jest.Mock;

	render(
		<MoviesProvider>
			<TestComponent />
		</MoviesProvider>
	);

	const testComponent = screen.getByTestId('test-component');

	await waitFor(() => expect(testComponent).toHaveTextContent('1'));

	expect(global.fetch).toHaveBeenCalledWith(
		'http://localhost:8080/recommendations'
	);
});
