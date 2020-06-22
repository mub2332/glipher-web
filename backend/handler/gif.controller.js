const fs = require("fs");
const { uploadImage, getDownloadURL } = require("../utilities/S3Interface");
const { downloadVideo } = require("../utilities/ytdlInterface");
const { trimVideo } = require("../utilities/ffmpegInterface");
const path = require("path");

const createGif = async (req, res) => {
    try {
        console.log("Request Params", req.body);

        const { url, startDuration, endDuration, videoTitle } = req.body;

        if (startDuration >= endDuration) {
            throw { message: "End time is put before start time" };
        }

        const correctedTitle = videoTitle
            .replace("/", "_")
            .split(" ")
            .join("_")
            .concat(String(startDuration), "-", String(endDuration), ".gif");

        const gifDuration = endDuration - startDuration;

        await downloadVideo(url);

        await trimVideo(correctedTitle, startDuration, gifDuration);

        const buffer = fs.readFileSync(path.join(`/tmp/`, correctedTitle));
        await uploadImage(buffer, correctedTitle);

        const downloadURL = await getDownloadURL(correctedTitle);

        // Upload the gif into the
        res.status(200).json({
            downloadUrl: downloadURL,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { createGif };
