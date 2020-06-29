import React from "react";
import s from "./disclaimer.module.scss";

const Disclaimer = () => {
    return (
        <div className={s.disclaimer}>
            <h3>Alpha Application (Websocket Solution)</h3>
            <p>
                This app can only effectively process 5 minutes video with about
                15 seconds of gif (Longer videos cause long wait time), We are
                currently considering several solutions toward the long
                processing time.
            </p>
        </div>
    );
};

export default Disclaimer;
