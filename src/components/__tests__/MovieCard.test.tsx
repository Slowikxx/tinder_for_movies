import MovieCard from '../MovieCard'; // Make sure the path is correct
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(() => {
	cleanup();
});

const testMovie = {
	id: '1and3011',
	title: 'Inferno',
	summary: 'Lorem ipsum…',
	image:
		'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUzNTE2NTkzMV5BMl5BanBnXkFtZTgwMDAzOTUyMDI@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
	rating: 5.3,
	onAccept: jest.fn(),
	onReject: jest.fn(),
};

test('renders movie card component', () => {
	render(
		<MovieCard
			id={testMovie.id}
			title={testMovie.title}
			summary={testMovie.summary}
			image={testMovie.image}
			rating={testMovie.rating}
			onAccept={testMovie.onAccept}
			onReject={testMovie.onReject}
		/>
	);

	const movieCardElement = screen.getByTestId(`movie-card-${testMovie.id}`);
	expect(movieCardElement).toBeInTheDocument();

	expect(movieCardElement).toHaveStyle(
		'background-image: url(' + testMovie.image + ')'
	);

	fireEvent.mouseEnter(movieCardElement);

	expect(movieCardElement).toHaveTextContent(testMovie.title);
	expect(movieCardElement).toHaveTextContent(testMovie.summary);
	expect(movieCardElement).toHaveTextContent(`${testMovie.rating}/10`);
});

test('calls onAccept when dragged to the left', () => {
	render(
		<MovieCard
			id={testMovie.id}
			title={testMovie.title}
			summary={testMovie.summary}
			image={testMovie.image}
			rating={testMovie.rating}
			onAccept={testMovie.onAccept}
			onReject={testMovie.onReject}
		/>
	);

	const movieCardElement = screen.getByTestId(`movie-card-${testMovie.id}`);
	expect(movieCardElement).toBeInTheDocument();

	fireEvent.mouseDown(movieCardElement, { clientX: 100, clientY: 100 });

	fireEvent.mouseMove(movieCardElement, { clientX: 20, clientY: 100 });

	fireEvent.mouseUp(movieCardElement);

	expect(testMovie.onAccept).toHaveBeenCalledTimes(1);
});

test('calls onReject when dragged to the right', () => {
	render(
		<MovieCard
			id={testMovie.id}
			title={testMovie.title}
			summary={testMovie.summary}
			image={testMovie.image}
			rating={testMovie.rating}
			onAccept={testMovie.onAccept}
			onReject={testMovie.onReject}
		/>
	);

	const movieCardElement = screen.getByTestId(`movie-card-${testMovie.id}`);
	expect(movieCardElement).toBeInTheDocument();

	fireEvent.mouseDown(movieCardElement, { clientX: 100, clientY: 100 });

	fireEvent.mouseMove(movieCardElement, { clientX: 700, clientY: 100 });

	fireEvent.mouseUp(movieCardElement);

	expect(testMovie.onReject).toHaveBeenCalledTimes(1);
});
