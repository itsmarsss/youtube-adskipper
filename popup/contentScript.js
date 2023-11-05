const adskipper = document.createElement("div");
adskipper.setAttribute("id", "adskipper");

const ascontent = document.createElement("as-content");

const skipad = document.createElement("button");
skipad.innerHTML = "Skip Ad";
// skipad.addEventListener("click", () => {
//     skipToEnd();
// });

ascontent.appendChild(skipad);

const shadow = adskipper.attachShadow({ mode: "open" });
const style = document.createElement("style");
style.textContent = `
as-content {
    z-index: 69420;
    position: absolute;
    width: 20px;
    height: 30px;
    background: red;
}
`;
shadow.appendChild(style);
shadow.appendChild(ascontent);

document.body.appendChild(adskipper);

setInterval(() => {
    var skipbutton = document.getElementsByClassName('ytp-ad-skip-button');
    var previewcont = document.getElementsByClassName('ytp-ad-preview-container');

    console.log(skipbutton.length + ":" + previewcont.length);

    if (skipbutton.length != 0 || previewcont.length != 0) {
        try {
            var video = document.getElementsByTagName('video')[0];
            video.currentTime = video.duration;
        } catch (ex) {
            console.log("Error skipping ad.");
        }
        if (skipbutton.length != 0) {
            skipbutton[0].click();
            console.log("Skip clicked.");
        }
    }
}, 250);