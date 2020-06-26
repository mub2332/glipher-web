import React, { useState } from "react";
import s from "./app.module.scss";
import Slider from "@material-ui/core/Slider";
import GetURL from "./components/GetURL/GetURL";
import Video from "./components/Video/Video";
import Loader from "./components/Loader/Loader";

function App() {
    const [videoUrl, setVideoUrl] = useState(null);
    const [title, setTitle] = useState("");
    const [time, setTime] = useState([0, 5]);
    const [max, setMax] = useState(0);
    const [loading, setLoading] = useState(false);

    const getVideoId = () => {
        const parts = videoUrl.split("/");
        return parts[parts.length - 1].split("?")[0];
    };

    const getTimeString = timeInSeconds => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;

        const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${minutesString}:${secondsString}`;
    };

    const handleTimeChange = (event, newValue) => {
        setTime(newValue);
    };

    const download = () => {
        setLoading(true);
        const url =
            "https://a9dqqmewub.execute-api.us-east-1.amazonaws.com/production/gif";
        const data = {
            url: videoUrl,
            videoTitle: title,
            startDuration: time[0],
            endDuration: time[1],
        };
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(json => {
                console.log(json);
                window.open(json.body.downloadUrl, "_blank");
                setLoading(false);
            });
    };

    return (
        <div className={s.container}>
            <h1 className={s.header}>Glipher</h1>
            <GetURL setVideoUrl={setVideoUrl} />

            {videoUrl ? (
                <>
                    <div className={s.section}>
                        <div className={s.alignAtOppositeEnds}>
                            <span className={s.timeText}>
                                Start: {getTimeString(time[0])}
                            </span>
                            <span className={s.timeText}>
                                End: {getTimeString(time[1])}
                            </span>
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
                    <h3 className={s.preview}>GIF Preview</h3>
                    <Video
                        start={time[0]}
                        end={time[1]}
                        setMax={setMax}
                        setTitle={setTitle}
                        setVideoUrl={setVideoUrl}
                        url={videoUrl}
                        videoId={getVideoId()}
                    />
                    <button
                        onClick={download}
                        disabled={loading || time[1] - time[0] > 5 * 60}
                        className={s.download}
                    >
                        {loading ? <Loader /> : "Download GIF"}
                    </button>
                </>
            ) : (
                <div className={s.disclaimer}>
                    <h3>Alpha Application</h3>
                    <p>
                        This app can currently only process 5 minutes video with
                        about 10-20 seconds of gif, We are currently considering
                        several solutions toward the long download time and 30
                        seconds limit of the API Gateway
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
