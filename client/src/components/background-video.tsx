import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-[-1]">
      <video 
        ref={videoRef}
        className="w-full h-full object-cover opacity-10"
        autoPlay
        muted
        loop
        playsInline
      >
        {/* Matrix-style digital rain background */}
        <source 
          src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" 
          type="video/mp4" 
        />
        {/* Fallback for older browsers */}
        <source 
          src="https://videos.pexels.com/video-files/856615/856615-hd_1920_1080_30fps.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {/* Additional overlay for better text readability */}
      <div className="absolute inset-0 bg-dark-bg bg-opacity-80"></div>
    </div>
  );
}