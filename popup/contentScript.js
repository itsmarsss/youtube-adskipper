const adskipper = document.createElement("div");
adskipper.setAttribute("id", "adskipper");

const ascontent = document.createElement("as-content");

const skipad = document.createElement("button");
skipad.innerHTML = "Skip Ad";

ascontent.appendChild(skipad);

const shadow = adskipper.attachShadow({ mode: "open" });
const style = document.createElement("style");
style.textContent = `
#adskipper {
    position: absolute;
    width: 20px;
    height: 30px;
    background: red;
}
`;
shadow.appendChild(style);
shadow.appendChild(ascontent);

document.body.appendChild(adskipper);

function skipToEnd() {
    var video = document.getElementsByTagName('video')[0];
    var videoDuration = video.duration;

    video.currentTime = videoDuration;
}