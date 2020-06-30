import React, { useState } from "react";
import s from "./app.module.scss";
import Slider from "@material-ui/core/Slider";
import GetURL from "./components/GetURL/GetURL";
import Video from "./components/Video/Video";
import Loader from "./components/Loader/Loader";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import TimeText from "./components/TimeText/TimeText";
import Alert from "./components/Alert/Alert";

import { download, getVideoId } from "./utils/helpers";

function App() {
    const [videoUrl, setVideoUrl] = useState(null);
    const [title, setTitle] = useState("");
    const [time, setTime] = useState([0, 5]);
    const [max, setMax] = useState(0);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleTimeChange = (event, newValue) => {
        setTime(newValue);
    };

    return (
        <div className={s.container}>
            <h1 className={s.header}>Glipher</h1>
            <GetURL setVideoUrl={setVideoUrl} />
            <Alert alert={alert} />
            {videoUrl ? (
                <>
                    <div className={s.section}>
                        <TimeText time={time} />
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
                        videoId={getVideoId(videoUrl)}
                    />
                    <button
                        onClick={() =>
                            download(
                                videoUrl,
                                title,
                                time[0],
                                time[1],
                                setLoading,
                                setAlert
                            )
                        }
                        disabled={loading || time[1] - time[0] > 5 * 60}
                        className={s.download}
                    >
                        {loading ? <Loader /> : "Create GIF"}
                    </button>
                </>
            ) : (
                <Disclaimer />
            )}
        </div>
    );
}

export default App;
