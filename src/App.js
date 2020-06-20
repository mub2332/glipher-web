import React, { useState } from "react";
import s from "./app.module.scss";
import GetURL from "./components/GetURL/GetURL";
import Video from "./components/Video/Video";

function App() {
    const [videoUrl, setVideoUrl] = useState(null);

    const getVideoId = () => {
        const parts = videoUrl.split("/");
        return parts[parts.length - 1].split("?")[0];
    };

    return (
        <div className={s.container}>
            <h1 className={s.header}>Glipher</h1>
            <GetURL setVideoUrl={setVideoUrl} />
            {videoUrl && (
                <Video
                    setVideoUrl={setVideoUrl}
                    url={videoUrl}
                    videoId={getVideoId()}
                />
            )}
        </div>
    );
}

export default App;
