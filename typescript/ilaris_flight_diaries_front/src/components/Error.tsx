const Error = ({ error }: { error: string }) => {
	return <p style={{ color: "red" }}>{error}</p>;
};

export default Error;
