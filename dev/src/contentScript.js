var html5_video_container_node = null;

var observerConfig = { attributes: true, childList: true, subtree: true };

var observer = new MutationObserver(function () {
    checkControllerNode();
});

observer.observe(document, observerConfig);

function checkControllerNode() {
    if (html5_video_container_node != null) {
        observer.disconnect();
        startSkipper();
        return;
    }
    html5_video_container_node = document.getElementsByClassName('html5-video-container')[0];
}

function startSkipper() {
    function skipSegment() {
        var video = document.getElementsByTagName('video');

        if (video.length == 0) {
            return;
        }

        video = video[0];

        video.addEventListener('loadeddata', () => {
            var skipbutton = document.getElementsByClassName('ytp-ad-skip-button');
            var previewcont = document.getElementsByClassName('ytp-ad-preview-container');

            if (skipbutton.length != 0 || previewcont.length != 0) {
                if (video.duration == NaN) {
                    return;
                }

                video.currentTime = video.duration;
                incrementSkipped();

                if (skipbutton.length != 0) {
                    skipbutton[0].click();
                }
            }
        });
    }

    skipSegment();

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
                if (isVideo(mutation.addedNodes)) {
                    skipSegment();
                }
            } else if (mutation.type === 'attributes') {
                if (mutation.attributeName == 'src') {
                    skipSegment();
                }
            }
        });
    });

    observer.observe(html5_video_container_node, observerConfig);
}

async function incrementSkipped() {
    chrome.storage.local.get(['skipped'], function (result) {
        console.log('Skipped queried');
        var value = result.skipped || 0;
        chrome.storage.local.set({ skipped: value + 1 }, function () {
            console.log("Skipped setted");
        });
    });
}