"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseString = (text) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing string: ${text}`);
    }
    return text;
};
const isValidDate = (date) => {
    const dateObject = new Date(date);
    return dateObject.toString() !== "Invalid Date";
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isValidDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map(v => v.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
const isArray = (array) => {
    return Array.isArray(array);
};
const parseArray = (array) => {
    if (array && !isArray(array)) {
        throw new Error(`Incorrect or missing array: ${array}`);
    }
    return array;
};
const validatePatientData = (patientData) => {
    console.log("patientData", patientData);
    if (!patientData || typeof patientData !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("id" in patientData &&
        "name" in patientData &&
        "dateOfBirth" in patientData &&
        "ssn" in patientData &&
        "gender" in patientData &&
        "occupation" in patientData &&
        "entries" in patientData) {
        const patient = {
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
exports.default = validatePatientData;
