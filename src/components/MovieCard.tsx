import { useState, useEffect, useRef } from 'react';
import { MovieCardProps } from '../types/types';
import '../styles/MovieCard.css';

import { IoClose, IoCheckmarkOutline } from 'react-icons/io5';

const MovieCard = ({ title, summary, image, rating }: MovieCardProps) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});

	const [currentWindowDimensions, setCurrentWindowDimensions] = useState<{
		width: number;
		height: number;
	}>({ width: window.innerWidth, height: window.innerHeight });

	const movieCardRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		setMousePosition({ x: event.clientX, y: event.clientY });
	};

	const handleMouseMovement = (event: React.MouseEvent<HTMLDivElement>) => {
		if (isDragging) {
			setMousePosition({ x: event.clientX, y: event.clientY });

			if (movieCardRef.current) {
				const movieCardRect = movieCardRef.current.getBoundingClientRect();
				const movieCardCenterX = movieCardRect.left + movieCardRect.width / 2;
				const rotateAngle = (event.clientX - movieCardCenterX) / 20;
				movieCardRef.current.style.transform = `rotate(${rotateAngle}deg)`;
			}
		}
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		if (movieCardRef.current) {
			movieCardRef.current.style.transform = 'rotate(0deg)';
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		if (movieCardRef.current) {
			movieCardRef.current.style.transform = 'rotate(0deg)';
		}
		setMousePosition({ x: currentWindowDimensions.width / 2, y: 0 });
		console.log(mousePosition);
	};

	const handleWindowResize = () => {
		setCurrentWindowDimensions({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<div
			ref={movieCardRef}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMovement}
			onMouseUp={handleMouseUp}
			className="movie-card-background"
			style={{
				backgroundImage: `url(${image})`,
				objectFit: 'contain',
				cursor: isDragging ? 'grabbing' : 'grab',
			}}
		>
			{isHovered && (
				<div className="movie-info-wrapper">
					<div className="movie-info">
						<h2 className="movie-title">
							{title} <span className="movie-rating">({rating}/10)</span>
						</h2>
						<p className="movie-summary">{summary}</p>
					</div>
					<div className="choice-wrapper">
						<button
							onClick={() => console.log('accepted')}
							className="accept"
							style={{
								color:
									mousePosition.x < currentWindowDimensions.width / 2 - 100
										? 'rgb(42, 233, 42)'
										: '#fff',
							}}
						>
							<IoCheckmarkOutline size={25} />

							<p>Accept</p>
						</button>
						<button
							onClick={() => console.log('rejected')}
							className="reject"
							style={{
								color:
									mousePosition.x > currentWindowDimensions.width / 2 + 100
										? 'rgb(233, 42, 42)'
										: '#fff',
							}}
						>
							<p>Reject</p>
							<IoClose size={25} />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default MovieCard;