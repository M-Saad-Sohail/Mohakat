import useDirection from '@/hooks/useDirection';
import { ArrowDown01, ChevronDown } from 'lucide-react';

interface IProps extends React.InputHTMLAttributes<HTMLSelectElement> {
	error?: string | boolean | undefined;
	title: string;
	options: Array<{ value: string; label: string }>;
	className?: string;
	errorClass?: string;
	defaultValue?: string;
	titleColor?: string;
	textColor?: string;
	BgColor?: string;
	name: string;
}
const Select: React.FC<IProps> = ({
	onChange,
	error,
	className,
	value,
	name,
	title,
	titleColor,
	textColor,
	BgColor,
	errorClass,
	options,
	defaultValue,
}) => {
	const dir = useDirection();

	return (
		<div dir={dir} className={`flex flex-col gap-y-2 h-[50px] ${className}`}>
			<label
				className={`font-bold text-[14px] ${titleColor ? titleColor : `text-primary`}`}
			>
				{title}
			</label>

			<div dir={dir} className="relative h-full w-full">
				<select
					className={`py-1 px-5 w-full focus:outline-none text-[15px] ${BgColor ? BgColor : `bg-[#E8E8E8]`}  h-[50px] max-w-[700px] ${textColor ? textColor : `text-primary`} appearance-none ${className} ${errorClass}`}
					onChange={(e) => {
						onChange?.(e);
					}}
					value={value}
					name={name}
				>
					<option value={''} hidden className="hidden">
						{defaultValue ?? 'Select an Option'}
					</option>
					{options.map((opt) => (
						<option value={opt.value} key={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
				<ChevronDown
					className={`absolute ${dir === 'ltr' ? 'right-4' : 'left-4'} !w-[20px] top-[55%] transform -translate-y-1/2 pointer-events-none`}
					width="20"
					height="20"
					style={{ width: 20 }}
				/>
			</div>

			{error && <p className="text-sm mb-2 font-helvetica text-red">{error}</p>}
		</div>
	);
};

export default Select;
