import React, { useEffect, useRef, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Pick = () => {
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing the camera: ", error);
      alert("Could not access the camera. Please check your permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Camera Access</h1>
      <div className="mb-3">
        <video
          ref={videoRef}
          autoPlay
          className="img-fluid border rounded" // Bootstrap classes for styling
          style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
        />
      </div>
      <button 
        className="btn btn-success" // Bootstrap button styles
        onClick={isCameraActive ? stopCamera : startCamera}
      >
        {isCameraActive ? 'Stop Camera' : 'Start Camera'}
      </button>
    </div>
  );
};

export default Pick;
