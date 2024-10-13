import React, { useEffect, useRef, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Pick = () => {
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [useFrontCamera, setUseFrontCamera] = useState(true); // State to toggle between front and back camera

  const startCamera = async () => {
    const constraints = {
      video: {
        facingMode: useFrontCamera ? 'user' : 'environment', // 'user' for front, 'environment' for back camera
      },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
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
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const toggleCamera = () => {
    stopCamera(); // Stop the current camera before switching
    setUseFrontCamera((prev) => !prev); // Toggle between front and back camera
  };

  useEffect(() => {
    // Automatically stop the camera when the component is unmounted
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
        className="btn btn-success me-2" // Bootstrap button styles
        onClick={isCameraActive ? stopCamera : startCamera}
      >
        {isCameraActive ? 'Stop Camera' : 'Start Camera'}
      </button>
      {isCameraActive && (
        <button 
          className="btn btn-secondary" 
          onClick={toggleCamera}
        >
          {useFrontCamera ? 'Switch to Back Camera' : 'Switch to Front Camera'}
        </button>
      )}
    </div>
  );
};

export default Pick;
