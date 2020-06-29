import React from "react";
import { getTimeString } from "../../utils/helpers";
import s from "./time-text.module.scss";

const TimeText = ({ time }) => {
    return (
        <div className={s.alignAtOppositeEnds}>
            <span className={s.timeText}>Start: {getTimeString(time[0])}</span>
            <span className={s.timeText}>End: {getTimeString(time[1])}</span>
        </div>
    );
};

export default TimeText;
