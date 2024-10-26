import React from 'react';
import { IoCheckmarkOutline, IoClose } from 'react-icons/io5';
import { ChoiceButtonProps } from '../types/types';

const ChoiceButton = ({
	onClick,
	mousePosition,
	color,
	type,
}: ChoiceButtonProps) => {
	return (
		<button
			onClick={onClick}
			className="choice-button"
			style={{
				color: mousePosition ? color : '#fff',
				fontSize: mousePosition ? '1.2rem' : '0.8rem',
			}}
		>
			{type === 'Accept' ? (
				<IoCheckmarkOutline size={25} />
			) : (
				<IoClose size={25} />
			)}

			<p>{type}</p>
		</button>
	);
};

export default ChoiceButton;
