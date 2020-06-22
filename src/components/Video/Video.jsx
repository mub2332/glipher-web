import React, { useEffect } from 'react';
import s from './video.module.scss';

const Video = ({ url, start, end, videoId, setMax }) => {
  useEffect(() => {
    if (!window['YT']) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      window['onYouTubeIframeAPIReady'] = loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      loadVideo();
    }
  }, [url, start, end]);

  const loadVideo = () => {
    new window['YT'].Player(`player-${videoId}`, {
      videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const onPlayerReady = (event) => {
    setMax(event.target.getDuration());
    loopStart(event);
    event.target.mute();
    event.target.playVideo();
  };

  const loopStart = (event) => {
    event.target.seekTo(start);
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window['YT'].PlayerState.PLAYING) {
      setTimeout(loopStart, (end - start) * 1000, event); // After 5 seconds, restart the loop
    }
  };

  return (
    <div key={url + start + end} id="playerContainer" className={s.container}>
      <div
        src={url + '?enablejsapi=1&controls=0'}
        id={`player-${videoId}`}
        type="text/html"
        frameborder="0"
      ></div>
    </div>
  );
};

export default Video;
