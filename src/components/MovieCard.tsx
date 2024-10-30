import '../styles/MovieCard.css';
import { useState, useEffect, useRef } from 'react';
import { MovieCardProps } from '../types/types';
import ChoiceButton from './ChoiceButton';

const getWindowSize = () => ({
	width: window.innerWidth,
	height: window.innerHeight,
});

const MovieCard = ({
	id,
	title,
	summary,
	image,
	rating,
	onAccept,
	onReject,
}: MovieCardProps) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [isDragging, setIsDragging] = useState<boolean>(false);

	const [positionX, setPositionX] = useState<number>(
		window.innerWidth / 2 - 175
	);
	const startPositionX = useRef<number>(window.innerWidth / 2 - 175);
	const initialInteractionX = useRef<number>(0);

	const [currentWindowSize, setCurrentWindowSize] = useState<{
		width: number;
		height: number;
	}>(getWindowSize());

	const movieCardRef = useRef<HTMLDivElement>(null);

	const handleInteractionStart = (x: number) => {
		setIsDragging(true);
		initialInteractionX.current = x;
		startPositionX.current = positionX;
	};

	const handleInteractionMove = (x: number) => {
		if (isDragging) {
			const mouseDeltaX = x - initialInteractionX.current;
			const newPositionX = startPositionX.current + mouseDeltaX;
			if (newPositionX !== positionX) {
				setPositionX(newPositionX);
			}
		}
	};

	const resetInteractionPosition = () => {
		setIsDragging(false);

		setPositionX(window.innerWidth / 2 - 175);
	};

	const handleInteractionEnd = () => {
		setIsDragging(false);
		if (
			positionX <
			currentWindowSize.width / 2 -
				(movieCardRef.current?.clientWidth ?? 0) / 2 -
				(currentWindowSize.width < 600 ? 25 : 100)
		) {
			onAccept();
		} else if (
			positionX >
			currentWindowSize.width / 2 -
				(movieCardRef.current?.clientWidth ?? 0) / 2 +
				(currentWindowSize.width < 600 ? 25 : 100)
		) {
			onReject();
		}

		resetInteractionPosition();
	};

	useEffect(() => {
		const handleWindowResize = () => {
			setCurrentWindowSize(getWindowSize());
			resetInteractionPosition();
		};
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<div className="movie-card-wrapper">
			<div
				data-testid={`movie-card-${id}`}
				ref={movieCardRef}
				onMouseEnter={() => setIsHovered(true)}
				onMouseOver={() => setIsHovered(true)}
				onMouseDown={(e) => handleInteractionStart(e.clientX)}
				onMouseUp={handleInteractionEnd}
				onMouseDownCapture={() => {}} // Allows the buttons to be clicked
				onMouseLeave={() => {
					setIsHovered(false);
					handleInteractionEnd();
				}}
				onMouseMove={(e) => handleInteractionMove(e.clientX)}
				onTouchStart={(e) => handleInteractionStart(e.touches[0].clientX)}
				onTouchEnd={handleInteractionEnd}
				onTouchMove={(e) => handleInteractionMove(e.touches[0].clientX)}
				className="movie-card-background"
				style={{
					backgroundImage: `url(${image})`,
					cursor: isDragging ? 'grabbing' : 'grab',
					left: positionX,
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
								interactionPosition={
									positionX <
									currentWindowSize.width / 2 -
										(movieCardRef.current?.clientWidth ?? 0) / 2 -
										(currentWindowSize.width < 600 ? 25 : 100)
								}
								color="rgb(42, 233, 42)"
								type="Accept"
							/>
							<ChoiceButton
								onClick={onReject}
								interactionPosition={
									positionX >
									currentWindowSize.width / 2 -
										(movieCardRef.current?.clientWidth ?? 0) / 2 +
										(currentWindowSize.width < 600 ? 25 : 100)
								}
								color="rgb(233, 42, 42)"
								type="Reject"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MovieCard;
