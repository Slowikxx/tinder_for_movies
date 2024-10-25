import MovieCard from './components/MovieCard';

function App() {
	return (
		<>
			<MovieCard
				title="Star Wars"
				summary="Lorem ipsum..."
				image="https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SY1000_CR0,0,677,1000_AL_.jpg"
				rating={8.2}
			/>
		</>
	);
}

export default App;
