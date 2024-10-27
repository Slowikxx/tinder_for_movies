export type MovieCardProps = {
	title: string;
	image: string;
	summary: string;
	rating: number;
	onAccept: () => void;
	onReject: () => void;
};

export type Movie = {
	id: string;
	title: string;
	imageURL: string;
	summary: string;
	rating: number;
};

export type MoviesContextType = {
	movies: Array<Movie>;
};

export type ChoiceButtonProps = {
	onClick: () => void;
	interactionPosition: boolean;
	color: string;
	type: string;
};
