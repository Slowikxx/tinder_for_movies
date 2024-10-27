import ChoiceButton from '../ChoiceButton';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';

afterEach(() => {
	cleanup();
});

test('calls onClick when button is clicked', () => {
	const onClick = jest.fn();
	render(
		<ChoiceButton
			onClick={onClick}
			interactionPosition={true}
			color={'#000'}
			type={'Accept'}
		/>
	);

	const choiceBtn = screen.getByTestId('choice-button');

	fireEvent.click(choiceBtn);
	expect(onClick).toHaveBeenCalled();
});
