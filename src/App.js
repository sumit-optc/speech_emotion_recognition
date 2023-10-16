// import "./App.css";
import { useState, useRef, useEffect } from "react";
import AudioRecorder from "./components/AudioRecorder";
import Navbar from "./components/Navbar";
import ContextProvider from "./context/makePredProvider";
import RouterProvider from "./context/router";
import PredProvider from "./context/predProvider";
function App() {
	return (
		<div>
			<Navbar />
			<ContextProvider>
				<PredProvider>
					<RouterProvider>
						<AudioRecorder />
					</RouterProvider>
				</PredProvider>
			</ContextProvider>
		</div>
	);
}

export default App;
