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

  const getTimeString = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutesString}:${secondsString}`;
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
            <div className={s.alignAtOppositeEnds}>
              <span className={s.timeText}>
                Start: {getTimeString(time[0])}
              </span>
              <span className={s.timeText}>End: {getTimeString(time[1])}</span>
            </div>
            <Slider
              className={s.slider}
              min={0}
              max={max}
              value={time}
              onChange={handleTimeChange}
              valueLabelDisplay="off"
              aria-labelledby="range-slider"
            />
          </div>
          <Video
            start={time[0]}
            end={time[1]}
            setMax={setMax}
            setTime={setTime}
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
