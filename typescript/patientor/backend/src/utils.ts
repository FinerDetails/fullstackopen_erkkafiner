import { Entry, Gender, Patient, EntryType, BaseEntry, HealthCheckRating, Diagnosis, Discharge, SickLeave } from "./types";
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
const isEntry = (entry: unknown): entry is Entry => {
	if (entry !== null && typeof entry === "object" && "type" in entry) {
		const type = entry.type;
		return Object.values(EntryType).includes(type as EntryType);
	}
	return false;

} ;
const parseEntries = (entries: unknown): Entry[] => {
	if (entries && isArray(entries)) {
		entries.forEach((entry: unknown) => {
			if(!isEntry(entry)){
				throw new Error(`Incorrect or missing Entry: ${entry}`);
			}
		});
	} else {
		throw new Error(`Incorrect or missing array: ${entries}`);
	}

	return entries;
};

const parseEntryType = (type: unknown): EntryType => {
	if (!type || !isString(type) || !Object.values(EntryType).includes(type as EntryType)) {
		throw new Error(`Incorrect or missing entry type: ${type}`);
	}
	return type as EntryType;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
	if (rating === undefined || !Object.values(HealthCheckRating).includes(rating as HealthCheckRating)) {
		throw new Error(`Incorrect or missing health check rating: ${rating}`);
	}
	return rating as HealthCheckRating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> =>  {
	if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
	// we will just trust the data to be in correct form
		return [] as Array<Diagnosis["code"]>;
	}
  
	return object.diagnosisCodes as Array<Diagnosis["code"]>;
};
const parseDischarge = (discharge: unknown) => {
	if (discharge && typeof discharge == "object" && "date" in discharge && "criteria" in discharge) {
		if (isString(discharge.date) && isValidDate(discharge.date) && isString(discharge.criteria)) {
			return discharge as Discharge;
		}
	}
	throw new Error(`Incorrect or missing discharge: ${discharge}`);
};
const parseSickLeave = (sickLeave: unknown) => {
	if (sickLeave && typeof sickLeave == "object" && "startDate" in sickLeave && "endDate" in sickLeave) {
		if (isString(sickLeave.startDate) && isValidDate(sickLeave.startDate) && isString(sickLeave.endDate) && isValidDate(sickLeave.endDate)) {
			return sickLeave as SickLeave;
		}
	}
	throw new Error(`Incorrect or missing sick leave: ${sickLeave}`);
};

export const validatePatientData = (patientData: unknown): Patient => {
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
			entries: parseEntries(patientData.entries),
		};
		return patient;
	}
	throw new Error("Incorrect data: some fields are missing");
};

export const validateEntryData = (entryData: unknown ): Entry => {
	if (!entryData || typeof entryData !== "object") {
		throw new Error("Incorrect or missing data");
	}
	if (
		"id" in entryData &&
		"description" in entryData &&
		"date" in entryData &&
		"specialist" in entryData &&
		"type" in entryData
	) {
		const type = parseEntryType(entryData.type);
		const baseEntry: BaseEntry = {
			id: parseString(entryData.id),
			description: parseString(entryData.description),
			date: parseDate(entryData.date),
			specialist: parseString(entryData.specialist),
			diagnosisCodes: "diagnosisCodes" in entryData ? parseDiagnosisCodes(entryData.diagnosisCodes) : undefined,
		} as BaseEntry & { diagnosisCodes?: Array<Diagnosis["code"]> };
		switch (type) {
		case EntryType.HealthCheck:
			if (
				"healthCheckRating" in entryData
			) {
				const entry: Entry = {
					...baseEntry,
					type: EntryType.HealthCheck,
					healthCheckRating: parseHealthCheckRating(entryData.healthCheckRating),
				};

				return entry;
			}
			break;
		case EntryType.Hospital:
			if (
				"discharge" in entryData
			) {
				const entry: Entry = {
					...baseEntry,
					type: EntryType.Hospital,
					discharge: parseDischarge(entryData.discharge),
				};

				return entry;
			}
			break;
		default:
			if (
				"employerName" in entryData
			) {
				const entry: Entry = {
					...baseEntry,
					type: EntryType.OccupationalHealthcare,
					employerName: parseString(entryData.employerName),
					sickLeave: "sickLeave" in entryData ? parseSickLeave(entryData.sickLeave) : undefined,
				};

				return entry;
			}
		}
	}
	throw new Error("Incorrect data: some fields are missing");
};
