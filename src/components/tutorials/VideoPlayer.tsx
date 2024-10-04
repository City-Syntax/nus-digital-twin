import { useState } from 'react';

const VideoPlayer = () => {
  const [videoLink, setVideoLink] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ?si=uC20jdl4GHOh0C2y');
  return (
    <main className="video-container">
      <nav className="video__nav">
        <div className="video__nav-title">Playlist</div>
        <button onClick={() => setVideoLink('https://www.youtube.com/embed/dQw4w9WgXcQ')}>
          Never gonna give you up
        </button>
        <button onClick={() => setVideoLink('https://www.youtube.com/embed/y6120QOlsfU')}>Dundun Dundun Dundun</button>
      </nav>
      <div className="video">
        <iframe
          src={videoLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </main>
  );
};

export default VideoPlayer;
