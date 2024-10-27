import '../styles/MovieCard.css';
import { useState, useEffect, useRef } from 'react';
import { MovieCardProps } from '../types/types';
import ChoiceButton from './ChoiceButton';

const getWindowSize = () => ({
	width: window.innerWidth,
	height: window.innerHeight,
});

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

	const [cardRotationAngle, setCardRotationAngle] = useState<number>(0);
	const [interactionPosition, setInteractionPosition] = useState<{
		x: number;
		y: number;
	}>({ x: getWindowSize().width / 2, y: 0 });
	const [currentWindowSize, setCurrentWindowSize] = useState<{
		width: number;
		height: number;
	}>(getWindowSize());

	const movieCardRef = useRef<HTMLDivElement>(null);

	const resetInteractionPosition = () => {
		setIsDragging(false);
		setInteractionPosition({ x: currentWindowSize.width / 2, y: 0 });
		setCardRotationAngle(0);
	};

	const handleCardDrag = (x: number) => {
		if (movieCardRef.current) {
			const cardCenterX =
				movieCardRef.current.getBoundingClientRect().left +
				movieCardRef.current.getBoundingClientRect().width / 2;
			const rotationAngle = (x - cardCenterX) / 10;
			setCardRotationAngle(rotationAngle);
		}
	};

	const handleInteractionEnd = () => {
		if (interactionPosition.x < currentWindowSize.width / 2 - 100) {
			onAccept();
		} else if (interactionPosition.x > currentWindowSize.width / 2 + 100) {
			onReject();
		}

		resetInteractionPosition();
	};

	const handleInteractionStart = (x: number, y: number) => {
		setIsDragging(true);
		setIsHovered(true);
		setInteractionPosition({ x, y });
	};

	const hadleInteractionMove = (x: number, y: number) => {
		if (isDragging) {
			setInteractionPosition({ x, y });
			handleCardDrag(x);
		}
	};

	useEffect(() => {
		const handleWindowResize = () => {
			setCurrentWindowSize(getWindowSize());
		};
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<div
			data-testid="movie-card"
			ref={movieCardRef}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false);
				resetInteractionPosition();
			}}
			onMouseDown={(e) => handleInteractionStart(e.clientX, e.clientY)}
			onMouseMove={(e) => hadleInteractionMove(e.clientX, e.clientY)}
			onMouseUp={handleInteractionEnd}
			onTouchStart={(e) =>
				handleInteractionStart(e.touches[0].clientX, e.touches[0].clientY)
			}
			onTouchMove={(e) =>
				hadleInteractionMove(e.touches[0].clientX, e.touches[0].clientY)
			}
			onTouchEnd={handleInteractionEnd}
			className="movie-card-background"
			style={{
				backgroundImage: `url(${image})`,
				cursor: isDragging ? 'grabbing' : 'grab',
				transform: `rotate(${cardRotationAngle}deg)`,
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
								interactionPosition.x < currentWindowSize.width / 2 - 100
							}
							color="rgb(42, 233, 42)"
							type="Accept"
						/>
						<ChoiceButton
							onClick={onReject}
							interactionPosition={
								interactionPosition.x > currentWindowSize.width / 2 + 100
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
