// import "./AudioRecorder.css";
import { useState, useContext, useRef, useEffect } from "react";
import appContext from "../context/appContext";
import { routerContext } from "../context/router";
import { Popover } from "bootstrap";
import { predContext } from "../context/predProvider";

const mimeType = "audio/wav";

const AudioRecorder = () => {
	const [permission, setPermission] = useState(false);
	const mediaRecorder = useRef(null);
	const [recordingStatus, setRecordingStatus] = useState("inactive");
	const [stream, setStream] = useState(null);
	const [audioChunks, setAudioChunks] = useState([]);
	const [audio, setAudio] = useState(null);
	const [fileSaver, setFileSaver] = useState(null);
	const [predShow, setPredShow] = useState(false);
	const [makePred, setMakePred] = useContext(appContext);
	const [pred, setPred] = useContext(predContext);
	const { getty, posty } = useContext(routerContext);
	// console.log("getty: ", getty);
	// console.log("posty: ", posty);

	const a = useContext(appContext);
	// console.log(a);

	const color = {
		neutral: "text-bg-info",
		calm: "text-bg-light",
		happy: "text-bg-success",
		sad: "text-bg-secondary",
		angry: "text-bg-danger",
		fearful: "text-bg-warning",
		disgust: "text-bg-dark",
		surprised: "text-bg-primary",
	};

	useEffect(() => {
		if (pred === "fearful") {
			document.body.style.backgroundColor = "red";
		} else {
			document.body.style.backgroundColor = "white";
		}
	}, [pred]);

	const predict = () => {
		const link = document.createElement("a");
		link.href = audio;
		link.download = "audioFileModel.wav";
		link.click();
		const lonk = { fileLonk: "lonk" };
		posty(lonk);
		setPredShow(true);

		// getty();
	};

	const getMicrophonePermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setPermission(true);
				setStream(streamData);
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");
		setMakePred("off");
		setPredShow(false);
		setPred("loading...");
		//create new Media recorder instance using the stream
		const media = new MediaRecorder(stream, { type: mimeType });
		//set the MediaRecorder instance to the mediaRecorder ref
		mediaRecorder.current = media;
		//invokes the start method to start the recording process
		mediaRecorder.current.start();
		let localAudioChunks = [];
		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};
		setAudioChunks(localAudioChunks);
	};

	const stopRecording = () => {
		setRecordingStatus("inactive");
		//stops the recording instance
		setMakePred("on");
		mediaRecorder.current.stop();
		mediaRecorder.current.onstop = () => {
			//creates a blob file from the audiochunks data
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			//creates a playable URL from the blob file.
			const audioUrl = URL.createObjectURL(audioBlob);
			setAudio(audioUrl);
			setAudioChunks([]);
		};
		console.log("audio after stop: ", audio);
	};

	const addFile = () => {
		console.log("addFile ran: ", fileSaver);
		if (fileSaver) {
			setAudio(URL.createObjectURL(fileSaver));
			setPred("loading...");
		}
		setMakePred("on");
	};

	return (
		<div className='container d-flex justify-content-center my-3'>
			<div className='card' style={{ "max-width": 640 + "px" }}>
				<div className='card-header'>
					<h5 className='card-title'>Audio Recorder</h5>
				</div>
				<div className='card-body'>
					<main>
						<div class='input-group mb-3'>
							<input
								type='file'
								class='form-control'
								id='inputGroupFile03'
								aria-describedby='inputGroupFileAddon03'
								aria-label='Upload'
								onChange={(e) => {
									setFileSaver(e.target.files[0]);
								}}
							/>
							<button
								class='input-group-text'
								type='button'
								id='inputGroupFileAddon03'
								onClick={addFile}
								disabled={!fileSaver}>
								Upload
							</button>
						</div>

						<div className='audio-controls d-flex mb-3'>
							{!permission ? (
								<button
									onClick={getMicrophonePermission}
									type='button'
									className='btn btn-primary p-2'>
									Get Microphone
								</button>
							) : null}
							{permission && recordingStatus === "inactive" ? (
								<button
									onClick={startRecording}
									type='button'
									className='btn btn-success p-2'>
									Start Recording
								</button>
							) : null}
							{recordingStatus === "recording" ? (
								<button
									onClick={stopRecording}
									type='button'
									className='btn btn-danger p-2'>
									Stop Recording
								</button>
							) : null}
							{makePred === "on" ? (
								<div className='ms-auto p-2'>
									<button
										onClick={predict}
										type='button'
										className='btn btn-secondary'
										data-bs-container='body'
										data-bs-toggle='popover'
										data-bs-placement='left'
										data-bs-content='Left popover'>
										Predict
									</button>
								</div>
							) : null}
						</div>

						<div className='d-flex mb-3'>
							{audio ? (
								<div className='audio-container p-2'>
									<audio
										id='audio-player'
										ontimeupdate='SeekBar()'
										ondurationchange='CreateSeekBar()'
										preload='auto'
										loop>
										<source src={audio} />
									</audio>
									<audio src={audio} controls></audio> <br />
									<a download href={audio} className='card-link'>
										Download Recording
									</a>
								</div>
							) : null}

							{predShow && pred !== "loading..." ? (
								<div className='ms-auto p-2'>
									<div class={`card ${color[pred]}`}>
										<div class='card-header'>Prediction</div>
										<div class='card-body'>
											<blockquote class='blockquote mb-0'>
												<p>{pred}</p>
											</blockquote>
										</div>
									</div>
								</div>
							) : null}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};
export default AudioRecorder;
