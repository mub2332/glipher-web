import React, { useState } from "react";
import s from "./geturl.module.scss";

const GetURL = ({ setVideoUrl }) => {
    const [url, setUrl] = useState("");

    return (
        <div className={s.inputGroup}>
            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={s.input}
                type="text"
                placeholder="Enter YouTube video URL"
            />
            <button
                onClick={() => {
                    setVideoUrl(url.replace("watch?v=", "embed/"));
                }}
                className={s.button}
            >
                Get Video
            </button>
        </div>
    );
};

export default GetURL;
