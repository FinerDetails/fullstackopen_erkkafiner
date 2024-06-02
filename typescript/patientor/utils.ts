import { Entry, Gender, Patient } from "./types";
const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};
const parseString = (text: unknown): string => {
	if (!text || !isString(text)) {
		throw new Error(`Incorrect or missing string: ${text}`);
	}
	return text;
};
const isValidDate = (date: string) => {
	const dateObject = new Date(date);
	return dateObject.toString() !== "Invalid Date";
};
const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isValidDate(date)) {
		throw new Error(`Incorrect or missing date: ${date}`);
	}
	return date;
};
const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map(v => v.toString())
		.includes(param);
};
const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error(`Incorrect or missing gender: ${gender}`);
	}
	return gender;
};
const isArray = (array: unknown): array is Entry[] => {
	return Array.isArray(array);
};
const parseArray = (array: unknown): Entry[] => {
	if (array && !isArray(array)) {
		throw new Error(`Incorrect or missing array: ${array}`);
	}
	return array as Entry[];
};
const validatePatientData = (patientData: unknown): Patient => {
	console.log("patientData", patientData);
	if (!patientData || typeof patientData !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if (
		"id" in patientData &&
		"name" in patientData &&
		"dateOfBirth" in patientData &&
		"ssn" in patientData &&
		"gender" in patientData &&
		"occupation" in patientData &&
		"entries" in patientData
	) {
		const patient: Patient = {
			id: parseString(patientData.id),
			name: parseString(patientData.name),
			dateOfBirth: parseDate(patientData.dateOfBirth),
			ssn: parseString(patientData.ssn),
			gender: parseGender(patientData.gender),
			occupation: parseString(patientData.occupation),
			entries: parseArray(patientData.entries),
		};
		return patient;
	}
	throw new Error("Incorrect data: some fields are missing");
};

export default validatePatientData;
