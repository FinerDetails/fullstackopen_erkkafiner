import express from "express";
import qs from "qs";
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
	const heightInCm: number = Number(req.query.height);
	const weightInKg: number = Number(req.query.weight);
	if (isNaN(heightInCm) || isNaN(weightInKg)) {
		throw new Error("Provided values were not numbers!");
	}
	res.send(calculateBmi(heightInCm, weightInKg));
});
app.post("/exercises", (req, res) => {
	console.log(req.body);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;
	let result: unknown;
	if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN)) {
		result = {
			error: "malformatted parameters",
		};
		throw new Error("Format of daily_exercises is incorrect");
	} else if (isNaN(target as number)) {
		result = {
			error: "parameters missing",
		};
	} else {
		result = calculateExercises(daily_exercises as number[], target as number);
	}
	res.send(result);
});
const PORT = 3002;
app.set("query parser", (str: string) => qs.parse(str));
app.listen(PORT);
