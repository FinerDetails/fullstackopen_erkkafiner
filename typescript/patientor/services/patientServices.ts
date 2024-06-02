import patients from "../data/patients";
import { Gender, Patient, PatientWithoutSsn } from "../types";
import validatePatientData from "../utils";
export const excludePatientSsn = (): PatientWithoutSsn[] => {
	return patients.map(
		({ id, name, dateOfBirth, gender, occupation, entries }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
			entries,
		}),
	);
};
export const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map(v => v.toString())
		.includes(param);
};
export const addPatient = (newPatient: Patient): PatientWithoutSsn => {
	patients.push(validatePatientData(newPatient));
	return patients[patients.length - 1];
};
