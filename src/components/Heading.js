import React from "react";

let Heading = (props) => {
	return <h1 className={`heading ${props.class}`}>{props.value}</h1>;
};

export default Heading;
