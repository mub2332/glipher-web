import React, { useState, useEffect } from "react";
import s from "./alert.module.scss";

const Alert = ({ alert }) => {
    const [alertClass, setAlertClass] = useState(s.alert);

    useEffect(() => {
        if (alert) setAlertClass(s.alert + " " + s.active);
    }, [alert]);

    return (
        <div className={alertClass}>
            The file is available at <a href={alert}>{alert}</a>
        </div>
    );
};

export default Alert;
