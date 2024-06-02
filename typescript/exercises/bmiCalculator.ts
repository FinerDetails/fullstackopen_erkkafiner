const calculateBmi = (heightInCm: number, weightInKg: number): string => {
	const heightInM = heightInCm / 100;
	const bmi: number = weightInKg / (heightInM ^ 2);
	console.log(`bmi: ${bmi}`);
	if (bmi < 17) {
		return "Underweight (unhealhty weight)";
	} else if (bmi > 24.9) {
		return "Obese (unhealhty weight)";
	} else if (bmi > 17 && bmi < 24.9) {
		return "Normal (healthy weight)";
	} else {
		return "something went wrong";
	}
};

export default calculateBmi;
