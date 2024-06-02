import DiaryForm from "./DiaryForm";
import { useState, useEffect } from "react";
import { DiaryEntry } from "../types";
import { getAllDiaries } from "../services/diaries";
import Error from "./Error";

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		getAllDiaries().then(data => setDiaries(data));
	}, []);
	return (
		<>
			<h1>Ilaris Flight Diaries</h1>
			<br></br>
			<Error error={error} />
			<DiaryForm
				diaries={diaries}
				setDiaries={setDiaries}
				setError={setError}
			/>
			<br></br>
			<ul style={{ listStyleType: "none" }}>
				{diaries.map(diary => (
					<li key={diary.id}>
						<b>{diary.date}</b>
						<p>visibility: {diary.visibility}</p>
						<p>weather: {diary.weather}</p>
						<p>comment: {diary.comment}</p>
					</li>
				))}
			</ul>
		</>
	);
};

export default App;
