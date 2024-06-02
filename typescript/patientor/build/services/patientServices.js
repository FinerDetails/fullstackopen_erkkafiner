"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.isGender = exports.excludePatientSsn = void 0;
const patients_1 = __importDefault(require("../data/patients"));
const types_1 = require("../types");
const utils_1 = __importDefault(require("../utils"));
const excludePatientSsn = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
exports.excludePatientSsn = excludePatientSsn;
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map(v => v.toString())
        .includes(param);
};
exports.isGender = isGender;
const addPatient = (newPatient) => {
    patients_1.default.push((0, utils_1.default)(newPatient));
    return patients_1.default[patients_1.default.length - 1];
};
exports.addPatient = addPatient;
