import { useState, useEffect, useRef } from 'react';
import { MovieCardProps } from '../types/types';
import '../styles/MovieCard.css';

import ChoiceButton from './ChoiceButton';

const MovieCard = ({
	title,
	summary,
	image,
	rating,
	onAccept,
	onReject,
}: MovieCardProps) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
		x: window.innerWidth / 2,
		y: 0,
	});

	const [touchPosition, setTouchPosition] = useState<{ x: number; y: number }>({
		x: window.innerWidth / 2,
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
				const rotateAngle = (event.clientX - movieCardCenterX) / 10;
				movieCardRef.current.style.transform = `rotate(${rotateAngle}deg)`;
			}
		}
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		setIsDragging(false);
		setMousePosition({ x: currentWindowDimensions.width / 2, y: 0 });
		if (movieCardRef.current) {
			movieCardRef.current.style.transform = 'rotate(0deg)';
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		setMousePosition({ x: currentWindowDimensions.width / 2, y: 0 });

		if (mousePosition.x < currentWindowDimensions.width / 2 - 100) {
			onAccept();
		} else if (mousePosition.x > currentWindowDimensions.width / 2 + 100) {
			onReject();
		} else {
			if (movieCardRef.current) {
				movieCardRef.current.style.transform = 'rotate(0deg)';
			}
		}
	};

	const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		setTouchPosition({
			x: event.touches[0].clientX,
			y: event.touches[0].clientY,
		});
		setIsDragging(true);
		setIsHovered(true);
	};

	const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
		if (isDragging && movieCardRef.current) {
			const touchX = event.touches[0].clientX;
			const movieCardRect = movieCardRef.current.getBoundingClientRect();
			const movieCardCenterX = movieCardRect.left + movieCardRect.width / 2;
			const rotateAngle = (touchX - movieCardCenterX) / 10;
			movieCardRef.current.style.transform = `rotate(${rotateAngle}deg)`;

			setTouchPosition({ x: touchX, y: event.touches[0].clientY });
		}
	};

	const handleTouchEnd = () => {
		setIsDragging(false);
		setTouchPosition({ x: currentWindowDimensions.width / 2, y: 0 });

		if (touchPosition.x < currentWindowDimensions.width / 2 - 50) {
			onAccept();
		} else if (touchPosition.x > currentWindowDimensions.width / 2 + 50) {
			onReject();
		} else {
			if (movieCardRef.current) {
				movieCardRef.current.style.transform = 'rotate(0deg)';
			}
		}
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
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			className="movie-card-background"
			style={{
				backgroundImage: `url(${image})`,
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
						<ChoiceButton
							onClick={onAccept}
							mousePosition={
								mousePosition.x < currentWindowDimensions.width / 2 - 100
							}
							touchPosition={
								touchPosition.x < currentWindowDimensions.width / 2 - 50
							}
							color="rgb(42, 233, 42)"
							type="Accept"
						/>
						<ChoiceButton
							onClick={onReject}
							mousePosition={
								mousePosition.x > currentWindowDimensions.width / 2 + 100
							}
							touchPosition={
								touchPosition.x > currentWindowDimensions.width / 2 + 50
							}
							color="rgb(233, 42, 42)"
							type="Reject"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default MovieCard;
