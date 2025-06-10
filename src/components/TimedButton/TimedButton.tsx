import { useState } from 'react';

interface TimedButtonProps extends React.ComponentProps<'button'> {
	delay: number;
	className?: string;
	timedNode: React.ReactNode;
	children: React.ReactNode;
	onButtonClick: () => void;
}

export default function TimedButton({
	delay,
	timedNode,
	className = '',
	onButtonClick,
	children,
	...props
}: Readonly<TimedButtonProps>) {
	const [timer, setTimer] = useState<number | null>(null);

	const handleClick = () => {
		onButtonClick();
		if (timer) {
			window.clearTimeout(timer);
		}
		setTimer(window.setTimeout(() => {
			setTimer(null);
		}, delay));
	}

	return (
		<button
			className={className}
			onClick={handleClick}
			{...props}
		>
			{timer === null ? children : timedNode}
		</button>
	);
}
