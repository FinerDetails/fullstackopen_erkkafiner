import express from "express";
import cors from "cors";
import { v1 as uuid } from "uuid";
import diagnoses from "./data/diagnoses";
import patients from "./data/patients";
import { Patient } from "./types";
import { excludePatientSsn, addPatient, addEntry } from "./services/patientServices";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
	res.send("pong");
});
app.get("/api/diagnoses", (_req, res) => {
	res.send(diagnoses);
});
app.get("/api/patients", (_req, res) => {
	res.send(excludePatientSsn());
});
app.get("/api/patients/:id", (req, res) => {
	const patient = patients.find((patient: Patient) => {
		return patient.id === req.params.id;
	});
	res.send(patient);
});
app.post("/api/patients", (req, res) => {
	const newPatient = { id: uuid(), ...req.body };
	res.send(addPatient(newPatient));
});

app.post("/api/patients/:id/entries", (req, res) => {
	const newEntry = { id: uuid(), ...req.body };
	res.send(addEntry(newEntry, req.params.id));

});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
