import { ArrowDown01, ChevronDown } from 'lucide-react';

interface IProps extends React.InputHTMLAttributes<HTMLSelectElement> {
	error?: string | boolean | undefined;
	title: string;
	options: Array<{ value: string; label: string }>;
	className?: string;
}
const Select: React.FC<IProps> = ({
	onChange,
	error,
	className,
	value,
	name,
	title,
	options,
}) => {
	return (
		<div className={`flex flex-col gap-y-2 ${className}`}>
			<label className="font-bold text-[20px] text-primary">{title}</label>

			<div className="relative">
				<select
					className={`py-3 px-5 w-full focus:outline-none bg-[#E8E8E8] h-[60px] max-w-[700px] text-primary appearance-none ${className}`}
					onChange={onChange}
					value={value}
					name={name}
				>
					{options.map((opt) => (
						<option value={opt.value} key={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
				<ChevronDown
					className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none"
					width="20"
					height="20"
				/>
			</div>

			{error && <p className="text-sm mb-2 font-helvetica text-red">{error}</p>}
		</div>
	);
};

export default Select;
