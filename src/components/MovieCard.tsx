import { MovieCardProps } from '../types/types';
import '../styles/MovieCard.css';

import { IoClose, IoCheckmarkOutline } from 'react-icons/io5';

const MovieCard = ({ title, summary, image, rating }: MovieCardProps) => {
	return (
		<div
			className="movie-card-background"
			style={{ backgroundImage: `url(${image})`, objectFit: 'contain' }}
		>
			<div className="movie-info-wrapper">
				<div className="movie-info">
					<h2 className="movie-title">
						{title} <span className="movie-rating">({rating}/10)</span>
					</h2>
					<p className="movie-summary">{summary}</p>
				</div>
				<div className="choice-wrapper">
					<div className="accept">
						<IoCheckmarkOutline size={25} />
						<p>Accept</p>
					</div>
					<div className="reject">
						<p> Reject</p>
						<IoClose size={25} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
