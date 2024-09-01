import { Diagnosis, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types"
import assertNever from "../../helpers/assertNever"
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

const DiagnosesList = ({entry, diagnoses}: {entry: Entry, diagnoses: Diagnosis[]}) => {
return (<>

{entry.diagnosisCodes && (
    <>
    <Typography>Diagnoses</Typography>
    <ul>
        {entry.diagnosisCodes.map(code => {
            const diagnosis = diagnoses.find(d => d.code === code);
            return (
            <li key={code}>{diagnosis?.code}{" "}{diagnosis?.name}</li>
        )})}
    </ul>
    </>
)}
</>)
}

const HospitalEntryDetails = ({entry, diagnoses}: {entry: HospitalEntry, diagnoses: Diagnosis[]}) => {
    return (
        <Grid key={entry.id} sx={{border: 'solid 2px black'}}>
            <Typography>{entry.date}</Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Discharge: {entry.discharge.date} {entry.discharge.criteria}</Typography>
            <DiagnosesList entry={entry} diagnoses={diagnoses}/>
            <Typography>diagnose by {entry.specialist}</Typography>
        </Grid>
    )
}

const OccupationalHealthcareEntryDetails = ({entry, diagnoses}: {entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[]}) => {
    return (
        <Grid key={entry.id} sx={{border: 'solid 2px black'}}>
            <Typography>{entry.date}</Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Employer: {entry.employerName}</Typography>
            {entry.sickLeave && (
            <Typography>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Typography>
            )}
            <DiagnosesList entry={entry} diagnoses={diagnoses}/>
            <Typography>diagnose by {entry.specialist}</Typography>
        </Grid>
        )
}

const HealthCheckEntryDetails = ({entry, diagnoses}: {entry: HealthCheckEntry, diagnoses: Diagnosis[]}) => {
    const getColor = (rating: number): string => {
        switch (rating) {
            case 0:
                return 'green';
            case 1:
                return 'yellow';
            case 2:
                return 'orange';
            case 3:
                return 'red';
            default:
                return 'gray';
        }
    };
    return (
        <Grid key={entry.id} sx={{border: 'solid 2px black'}}>
            <Typography>{entry.date}</Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Health rating:</Typography><FavoriteIcon sx={{ fill: getColor(entry.healthCheckRating)}}/>
            <DiagnosesList entry={entry} diagnoses={diagnoses}/>
            <Typography>diagnose by {entry.specialist}</Typography>
        </Grid>
        )
}

const EntryDetails = ({entry, diagnoses}:{entry: Entry, diagnoses: Diagnosis[]}) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryDetails entry={entry} diagnoses={diagnoses}/>
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses}/>
        case "HealthCheck":
                return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses}/>
        default: 
            return assertNever(entry);
    }
}

export default EntryDetails