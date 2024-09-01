import patients from "../data/patients";
import { Gender, Patient, PatientWithoutSsn, Entry } from "../types";
import {validatePatientData, validateEntryData} from "../utils";
export const excludePatientSsn = (): PatientWithoutSsn[] => {
	console.log(patients);
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

export const addEntry = (newEntry: Entry, patientId: string): PatientWithoutSsn => {
	const patient = patients.find((patient: Patient) => {
		return patient.id === patientId;
	});
	if (patient) {
		patient.entries.push(validateEntryData(newEntry));
		return patient;
	} else {
		throw new Error("Patient not found");
	}

};
