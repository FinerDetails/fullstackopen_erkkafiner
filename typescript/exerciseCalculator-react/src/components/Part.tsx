import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
	const PartBase = ({
		name,
		exerciseCount,
	}: {
		name: string;
		exerciseCount: number;
	}) => {
		return (
			<>
				<p>
					<b>name: {name}</b>
					<br></br>
					exercise count: {exerciseCount}
					<br></br>
				</p>
			</>
		);
	};
	switch (part.kind) {
		case "basic":
			return (
				<>
					<p>
						<PartBase name={part.name} exerciseCount={part.exerciseCount} />
						description: {part.description}
						<br></br>
					</p>
				</>
			);
		case "group":
			return (
				<>
					<p>
						<PartBase name={part.name} exerciseCount={part.exerciseCount} />
						group project count: {part.groupProjectCount}
						<br></br>
					</p>
				</>
			);
		case "background":
			return (
				<>
					<p>
						<PartBase name={part.name} exerciseCount={part.exerciseCount} />
						description: {part.description}
						<br></br>
						background material: {part.backgroundMaterial}
						<br></br>
					</p>
				</>
			);
		case "special":
			return (
				<>
					<p>
						<PartBase name={part.name} exerciseCount={part.exerciseCount} />
						description: {part.description}
						<br></br>
						requirements: {part.requirements.join(", ")}
						<br></br>
					</p>
				</>
			);

		default:
			break;
	}
};
export default Part;
