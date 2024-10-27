import MovieCard from '../MovieCard'; // Make sure the path is correct
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('should render movie card component', () => {
	render(
		<MovieCard
			title={''}
			image={''}
			summary={''}
			rating={0}
			onAccept={function (): void {
				throw new Error('Function not implemented.');
			}}
			onReject={function (): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	const movieCardElement = screen.getByTestId('movie-card');
	expect(movieCardElement).toBeInTheDocument();
});
