"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const diagnoses_1 = __importDefault(require("./data/diagnoses"));
const patientServices_1 = require("./services/patientServices");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3001;
app.get("/api/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});
app.get("/api/diagnoses", (_req, res) => {
    res.send(diagnoses_1.default);
});
app.get("/api/patients", (_req, res) => {
    res.send((0, patientServices_1.excludePatientSsn)());
});
app.get("/api/patients/:id", (req, res) => {
    const patients = (0, patientServices_1.excludePatientSsn)();
    const patient = patients.find(patient => {
        return patient.id === req.params.id;
    });
    res.send(patient);
});
app.post("/api/patients", (req, res) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, req.body);
    res.send((0, patientServices_1.addPatient)(newPatient));
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
