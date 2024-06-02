import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography"

const PatientView = ({ patients }: { patients: Patient[] }): JSX.Element => {
	const patientID = useParams().id;
	const patient = patients.find(patient => patient.id === patientID);

	return (
		<Grid>
			{patient ? (
				<Typography>{patient.name}</Typography>
			) : (
				<Typography>No patient found</Typography>
			)}
		</Grid>
	);
	
};
export default PatientView;
