const getTimeString = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutesString}:${secondsString}`;
};

const getVideoId = (videoUrl) => {
    const parts = videoUrl.split("/");
    return parts[parts.length - 1].split("?")[0].split("&")[0];
};

const download = (
    url,
    videoTitle,
    startDuration,
    endDuration,
    setLoading,
    setAlert
) => {
    setLoading(true);
    const data = {
        url,
        videoTitle,
        startDuration,
        endDuration,
    };

    const socket = new WebSocket(
        "wss://sth4zqzl5e.execute-api.us-east-1.amazonaws.com/dev"
    );

    socket.onopen = (event) => {
        socket.send(
            JSON.stringify({
                action: "createGif",
                payload: JSON.stringify(data),
            })
        );
    };

    socket.onmessage = (event) => {
        var msg = JSON.parse(event.data);

        if (msg.downloadUrl) {
            socket.close();
            setAlert(msg.downloadUrl);
            setLoading(false);
        }
    };
};

export { download, getTimeString, getVideoId };
