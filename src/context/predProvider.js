import React, { createContext, useState } from "react";
// import appContext from "./appContext";

export const predContext = createContext();

const PredProvider = (props) => {
	const [pred, setPred] = useState("loading...");
	return (
		<predContext.Provider value={[pred, setPred]}>
			{props.children}
		</predContext.Provider>
	);
};

export default PredProvider;
