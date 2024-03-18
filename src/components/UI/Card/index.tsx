import useDirection from '@/hooks/useDirection';

type TProps = {
	heading: string | [string];
	value: number | string;
	classname?: string;
	titleclass?: string;
	valueclass?: string;
};
const InfoCards = ({
	heading,
	value,
	classname,
	valueclass,
	titleclass,
}: TProps) => {
	const dir = useDirection();
	return (
		<div
			dir={dir}
			className={`bg-primary px-5 pt-3 pb-1 rounded-[5px] ${classname}`}
		>
			<div className={`${titleclass} mb-0 text-[0.9rem] text-white font-bold`}>
				{heading}
			</div>
			<div
				className={`${valueclass} font-bold text-white ${dir === 'ltr' ? 'float-right' : 'float-left'}`}
			>
				{value}
			</div>
		</div>
	);
};
export default InfoCards;
