export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}
export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	
	diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
	Healthy = 0,
	LowRisk = 1,
	HighRisk = 2,
	CriticalRisk = 3
}

export interface Discharge {
	date: string,
	criteria: string,
}

export interface SickLeave {
	startDate: string,
	endDate: string,
}

export enum EntryType {
	HealthCheck = "HealthCheck",
	Hospital = "Hospital",
	OccupationalHealthcare = "OccupationalHealthcare",
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeave

}
interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}
export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}
export interface PatientWithoutSsn {
	id: string;
	name: string;
	dateOfBirth: string;
	gender: Gender;
	occupation: string;
}
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
