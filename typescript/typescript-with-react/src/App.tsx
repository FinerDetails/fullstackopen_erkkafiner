import ReactDOM from "react-dom/client";
import PropTypes from "prop-types";

const Welcome = props => {
	return <h1>Hello, {props.name}</h1>;
};

Welcome.propTypes = {
	name: PropTypes.string,
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<Welcome name="Sarah" />,
);
