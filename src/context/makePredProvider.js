import React, { useState } from "react";
import appContext from "./appContext";

const ContextProvider = (props) => {
	const [makePred, setMakePred] = useState("off");
	return (
		<appContext.Provider value={[makePred, setMakePred]}>
			{props.children}
		</appContext.Provider>
	);
};

export default ContextProvider;
