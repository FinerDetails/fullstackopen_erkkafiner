import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
	return axios.get<DiaryEntry[]>(baseUrl).then(res => res.data);
};
export const postNewDiary = async (
	newDiary: NewDiaryEntry,
	setError: React.Dispatch<React.SetStateAction<string>>,
) => {
	try {
		const res = await axios.post<DiaryEntry>(baseUrl, newDiary);
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			setError(error.response.data);
			setTimeout(() => {
				setError("");
			}, 5000);
			console.log(error);
		} else {
			console.error(error);
		}
		throw error;
	}
};
