var ytadskipper = (async function () {
    const observerConfig = { attributes: true, childList: true, subtree: true };

    let html5_video_container_node = null;
    let observer = new MutationObserver(() => {
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
            function performCheck() {
                function performSkip() {
                    async function incrementSkipped() {
                        chrome.storage.local.get(['skipped'], (result) => {
                            chrome.storage.local.set({ skipped: (result.skipped || 0) + 1 });
                        });
                    }

                    let skipbutton_old = document.getElementsByClassName('ytp-ad-skip-button');
                    let previewcont_old = document.getElementsByClassName('ytp-ad-preview-container');
                    let skip_button = document.querySelectorAll('[id ^= "skip-button:"]');

                    if (skip_button.length >= 2) {
                        skip_button[0].click();
                        skip_button[1].click();
                        incrementSkipped();
                    } else if (skipbutton_old.length != 0 || previewcont_old.length != 0) {
                        if (video.duration == NaN) {
                            return;
                        }

                        video.currentTime = video.duration;

                        if (skipbutton_old.length != 0) {
                            skipbutton_old[0].click();
                        }
                        incrementSkipped();
                    }
                }

                let video = document.getElementsByTagName('video');

                if (video.length == 0) {
                    return;
                }

                video = video[0];

                if (video.readyState >= 2) {
                    performSkip();
                } else {
                    video.addEventListener('loadeddata', () => {
                        performSkip();
                    });
                }
            }

            chrome.storage.local.get(['enabled'], (result) => {
                if (result.enabled || false) {
                    performCheck();
                }
            });
        }

        skipSegment();

        let observer = new MutationObserver((mutations) => {
            function isVideo(nodeList) {
                for (let i = 0; i < nodeList.length; i++) {
                    if (nodeList[i]['className'] == 'video-stream html5-main-video') {
                        return true;
                    }
                };
                return false;
            }

            mutations.forEach((mutation) => {
                if (mutation.type == 'childList') {
                    if (isVideo(mutation.addedNodes) || isVideo(mutation.removedNodes)) {
                        skipSegment();
                    }
                } else if (mutation.type == 'attributes') {
                    if (mutation.attributeName == 'src') {
                        skipSegment();
                    }
                }
            });
        });

        observer.observe(html5_video_container_node, observerConfig);
    }
});

ytadskipper();
