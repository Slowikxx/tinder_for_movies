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
