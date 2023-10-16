import React, { createContext, useContext, useState } from "react";
import { predContext } from "./predProvider";

export const routerContext = createContext();

function RouterProvider(props) {
	const [pred, setPred] = useContext(predContext);
	const test = { fileName: "reactTest" };

	const getty = () => {
		fetch("http://localhost:5000/profile")
			.then((res) => res.json())
			.then((data) => {
				console.log(JSON.stringify(data));
				setPred(data.pred);
				// console.log(data.name);
				// test = data;
				// console.log(data);
			});
	};

	const posty = async (data) => {
		fetch("http://localhost:5000/profile", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("posty log: ", JSON.stringify(data));
				setPred(data.pred);
				// console.log(data.name);
				// test = data;
				// console.log(data);
			});
	};

	return (
		<routerContext.Provider value={{ getty, posty }}>
			{props.children}
		</routerContext.Provider>
	);
}

export default RouterProvider;

// useEffect(() => {
// 	fetch("http://localhost:5000/profile")
// 		.then((res) => res.json())
// 		.then((data) => {
// 			console.log(JSON.stringify(data));
// 			setPred({
// 				name: data.name,
// 				about: data.about,
// 				// makepred: data.makepred,
// 			});
// 			// console.log(data.name);
// 			// test = data;
// 			// console.log(data);
// 		});
// 	// );
// }, []);

// useEffect(() => {
// 	if (makePred !== 0) {
// 		fetch("http://localhost:5000/profile", {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(test),
// 		})
// 			.then((res) => res.json())
// 			.then((data) => {
// 				console.log(JSON.stringify(data));
// 				setPred({
// 					name: data.name,
// 					about: data.about,
// 					// makepred: data.makepred,
// 				});
// 				// console.log(data.name);
// 				// test = data;
// 				// console.log(data);
// 			});
// 		// );
// 	}
// }, [makePred]);
