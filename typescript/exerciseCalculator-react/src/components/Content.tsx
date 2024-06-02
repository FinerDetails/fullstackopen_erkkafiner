import { CoursePart } from "../types";
import Part from "./Part";
const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
	return (
		<>
			{courseParts.map((part: CoursePart) => (
				<Part part={part} />
			))}
		</>
	);
};

export default Content;
