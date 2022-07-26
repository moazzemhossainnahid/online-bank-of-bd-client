import React, { useState } from 'react';
import Webcam from "react-webcam";
 
const WebcamComponent = () => <Webcam />;
 
const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};
 
export const WebcamCapture = () => {
 
    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);
 
     
    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
        });

        // console.log(image);
 
 
    return (
        <div className="webcam-container py-20 mx-auto w-full">
            <div className="webcam-img m-5">
                     
                {image === '' ? <Webcam
                    audio={false}
                    height={250}
                    width={250}
                    className={`rounded-xl border-2 border-rose-700 flex mx-auto`}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                /> : <img className={`rounded-xl border-2 border-rose-700 flex mx-auto`} src={image} alt="" />}
            </div>

            <div className="ImageCam text-center">
                 
                {image !== '' ?
                    <div className="flex gap-2 justify-center">
                        <button variant="contained"  color="secondary" size="small" onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn btn btn-accent">
                        Retake Image</button>
                        <button variant="contained"  color="secondary" size="small" onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn btn btn-accent">
                        Upload Image</button>
                    </div>
                         :
                    <button variant="contained" color="secondary" size="small" onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn btn btn-primary">Capture Image</button>
                }
            </div>
        </div>
    );
};

export default WebcamCapture;