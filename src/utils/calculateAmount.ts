export const calculateAmount = (
	selectedOption: string,
	numberOfPersons: number,
	basePriceOne: number,
	basePriceTwo: number,
) => {
	let newAmount = 0;
	if (selectedOption === '3') {
		newAmount = numberOfPersons <= 4 ? basePriceOne * 3 : basePriceTwo * 3;
		return newAmount;
	} else if (selectedOption === '6') {
		newAmount = numberOfPersons <= 4 ? basePriceOne * 6 : basePriceTwo * 6;
		return newAmount;
	} else if (selectedOption === '9') {
		newAmount = numberOfPersons <= 4 ? basePriceOne * 9 : basePriceTwo * 9;
		return newAmount;
	} else if (selectedOption === '12') {
		newAmount = numberOfPersons <= 4 ? basePriceOne * 12 : basePriceTwo * 12;
		return newAmount;
	}
};
