import React, { useState } from 'react';
import s from './app.module.scss';
import Slider from '@material-ui/core/Slider';
import GetURL from './components/GetURL/GetURL';
import Video from './components/Video/Video';

function App() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [time, setTime] = useState([0, 5]);
  const [max, setMax] = useState(0);

  const getVideoId = () => {
    const parts = videoUrl.split('/');
    return parts[parts.length - 1].split('?')[0];
  };

  const handleTimeChange = (event, newValue) => {
    setTime(newValue);
  };

  return (
    <div className={s.container}>
      <h1 className={s.header}>Glipher</h1>
      <GetURL setVideoUrl={setVideoUrl} />
      {videoUrl && (
        <>
          <div className={s.section}>
            <Slider
              max={max}
              value={time}
              onChange={handleTimeChange}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
            />
          </div>
          <Video
            start={time[0]}
            end={time[1]}
            setMax={setMax}
            setVideoUrl={setVideoUrl}
            url={videoUrl}
            videoId={getVideoId()}
          />
        </>
      )}
    </div>
  );
}

export default App;
