import React from "react";
import { useState } from "react";
import { postNewDiary } from "../services/diaries";
import { DiaryEntry, NewDiaryEntry } from "../types";

const DiaryForm = ({
	diaries,
	setDiaries,
	setError,
}: {
	diaries: DiaryEntry[];
	setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const [date, setDate] = useState(
		new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Helsinki" }),
	);
	const [visibility, setVisiblity] = useState("");
	const [weather, setWeather] = useState("");
	const [comment, setComment] = useState("");
	const submitForm = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const newDiary: NewDiaryEntry = {
			date: date,
			weather: weather,
			visibility: visibility,
			comment: comment,
		};
		postNewDiary(newDiary, setError).then(returnedDiary => {
			setDiaries(diaries.concat(returnedDiary));
		});
	};

	return (
		<>
			<form onSubmit={submitForm}>
				<label htmlFor="date">Date: </label>
				<input
					type="date"
					id="date"
					value={date}
					onChange={event => setDate(event.target.value)}
				/>
				<br />
				<label>Visibility: </label>
				<label htmlFor="visibilityGreat">great </label>
				<input
					type="radio"
					id="visibilityGreat"
					name="visibility"
					onChange={() => setVisiblity("great")}
				/>
				<label htmlFor="visibilityGood">good </label>
				<input
					type="radio"
					id="visibilityGood"
					name="visibility"
					onChange={() => setVisiblity("good")}
				/>
				<label htmlFor="visibilityOk">ok </label>
				<input
					type="radio"
					id="visibilityOk"
					name="visibility"
					onChange={() => setVisiblity("ok")}
				/>
				<label htmlFor="visibilityPoor">poor </label>
				<input
					type="radio"
					id="visibilityPoor"
					name="visibility"
					onChange={() => setVisiblity("poor")}
				/>
				<br />
				<label>Weather: </label>
				<label htmlFor="weatherSunny">sunny </label>
				<input
					type="radio"
					id="weatherSunny"
					name="weather"
					onChange={() => setWeather("sunny")}
				/>
				<label htmlFor="weatherRainy">rainy </label>
				<input
					type="radio"
					id="weatherRainy"
					name="weather"
					onChange={() => setWeather("rainy")}
				/>
				<label htmlFor="weatherCloudy">cloudy </label>
				<input
					type="radio"
					id="weatherCloudy"
					name="weather"
					onChange={() => setWeather("cloudy")}
				/>
				<label htmlFor="weatherStormy">stormy </label>
				<input
					type="radio"
					id="weatherStormy"
					name="weather"
					onChange={() => setWeather("stormy")}
				/>
				<label htmlFor="weatherWindy">windy </label>
				<input
					type="radio"
					id="weatherWindy"
					name="weather"
					onChange={() => setWeather("windy")}
				/>
				<br />
				<label htmlFor="comment">Comment: </label>
				<input
					type="text"
					id="comment"
					value={comment}
					onChange={event => setComment(event.target.value)}
				/>
				<br />
				<button type="submit">Add</button>
			</form>
		</>
	);
};

export default DiaryForm;
