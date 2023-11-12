console.log("YTSkipper Start Here");

var html5_video_container_node = null;

var observer = new MutationObserver(function () {
    console.log('DOM has changed on YouTube.');
    checkControllerNode();
});

var config = { attributes: true, childList: true, subtree: true };

observer.observe(document, config);

function checkControllerNode() {
    if (html5_video_container_node != null) {
        observer.disconnect();
        console.log(html5_video_container_node.classList);
        startSkipper();
        return;
    }
    html5_video_container_node = document.getElementsByClassName('html5-video-container')[0];
}

function startSkipper() {
    function skipSegment() {
        var skipbutton = document.getElementsByClassName('ytp-ad-skip-button');
        var previewcont = document.getElementsByClassName('ytp-ad-preview-container');

        if (skipbutton.length != 0 || previewcont.length != 0) {
            try {
                var video = document.getElementsByTagName('video')[0];
                video.currentTime = video.duration;
            } catch (ex) {
                //console.log("Error skipping ad.");
            }
            if (skipbutton.length != 0) {
                skipbutton[0].click();
                //console.log("Skip clicked.");
            }
        }
    }
    var observer = new MutationObserver(function (mutations) {
        function isVideo(nodeList) {
            for (var i = 0; i < nodeList.length; i++) {
                if (nodeList[i]['className'] == 'video-stream html5-main-video') {
                    return true;
                }
            };
            return false;
        }

        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                if (isVideo(mutation.addedNodes) || isVideo(mutation.removedNodes)) {
                    console.log('Nodes added:', mutation.addedNodes);
                    console.log('Nodes removed:', mutation.removedNodes);
                }
            } else if (mutation.type === 'attributes') {
                if (mutation.attributeName == 'src') {
                    console.log('Attribute modified:', mutation.attributeName);
                    console.log('Old attribute value:', mutation.oldValue);
                }
            }
        });
    });

    var config = { attributes: true, childList: true, subtree: true };

    observer.observe(html5_video_container_node, config);
}