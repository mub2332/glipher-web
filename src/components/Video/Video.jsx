import React, { useEffect } from "react";
import s from "./video.module.scss";

const Video = ({ url, start, end, videoId, setMax, setTitle }) => {
    useEffect(() => {
        if (!window["YT"]) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";

            window["onYouTubeIframeAPIReady"] = loadVideo;

            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            loadVideo();
        }
        // eslint-disable-next-line
    }, [url, start, end]);

    const loadVideo = () => {
        new window["YT"].Player(`player-${videoId}`, {
            videoId,
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    };

    const onPlayerReady = event => {
        const max = event.target.getDuration();
        setMax(max);
        setTitle(event.target.getVideoData().title);
        loopStart(event);
        event.target.mute();
        event.target.playVideo();
    };

    const loopStart = event => {
        event.target.seekTo(start);
    };

    const onPlayerStateChange = event => {
        if (event.data === window["YT"].PlayerState.PLAYING) {
            setTimeout(loopStart, (end - start) * 1000, event); // After 5 seconds, restart the loop
        }
    };

    return (
        <div
            key={url + start + end}
            id="playerContainer"
            className={s.container}
        >
            <div
                src={url + "?enablejsapi=1&controls=0"}
                id={`player-${videoId}`}
                type="text/html"
                frameBorder="0"
            ></div>
        </div>
    );
};

export default Video;
