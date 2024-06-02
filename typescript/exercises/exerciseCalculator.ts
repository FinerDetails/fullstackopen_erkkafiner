interface ExerciseValues {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export const calculateExercises = (
	exerciseArrayNumbers: number[],
	targetNumber: number,
): ExerciseValues => {
	const sumOfHours: number = exerciseArrayNumbers.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
	);
	const periodLength: number = exerciseArrayNumbers.length;
	const trainingDays: number = exerciseArrayNumbers.filter(
		hours => hours > 0,
	).length;
	const average: number = sumOfHours / periodLength;
	const success: boolean = average >= targetNumber;
	const successPercentage: number = average / targetNumber;
	let ratingDescription: string = "the target was not even close";
	const returnRating = (): number => {
		if (successPercentage >= 1) {
			ratingDescription = "You reached the target, amazing!";
			return 3;
		} else if (successPercentage > 0.5) {
			ratingDescription =
				"the target was not quite completed, you'll get it next time";
			return 2;
		}

		return 1;
	};

	return {
		periodLength: periodLength,
		trainingDays: trainingDays,
		success: success,
		rating: returnRating(),
		ratingDescription: ratingDescription,
		target: targetNumber,
		average: average,
	};
};
