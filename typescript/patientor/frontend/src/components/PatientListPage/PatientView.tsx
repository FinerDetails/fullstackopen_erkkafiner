import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography"
import EntryDetails from "./EntryDetails";

const PatientView = ({ patients, diagnoses }: { patients: Patient[], diagnoses: Diagnosis[] }): JSX.Element => {
	const patientID = useParams().id;
	const patient = patients.find(patient => patient.id === patientID);
	console.log(patient);

	return (
		<Grid>
			{patient ? (
				<>
				<Grid></Grid>
				<Typography>{patient.name}</Typography>
				<Typography>{patient.ssn}</Typography>
				<Typography>{patient.dateOfBirth}</Typography>
				<Typography>{patient.gender}</Typography>
				<Typography>{patient.occupation}</Typography>
				</>
			) : (
				<Typography>No patient found</Typography>
			)}
		
			{(patient?.entries && patient?.entries?.length !== 0) ? (
				<>
				<br />
				<Typography variant="h6">Entries</Typography>
				<br/>
				{patient.entries.map(entry => (
					<EntryDetails entry={entry} diagnoses={diagnoses}/>
				))}
				</>
			) : (
				<>				
					<br/>
					<Typography>No entries found</Typography>
				</>
			)}
		</Grid>
	);
	
};
export default PatientView;
