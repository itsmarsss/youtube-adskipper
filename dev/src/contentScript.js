var ytadskipper = (async function () {
    function detectAddedElements() {
        const targetNode = document.getElementsByClassName('html5-video-player')[0];

        const callback = function (mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function (node) {
                        if (node.nodeType === 1 && node.classList.contains('ytp-ad-player-overlay')) {
                            skipSegment();
                        }
                    });
                }
            }
        };

        const observer = new MutationObserver(callback);

        observer.observe(targetNode, { attributes: true, childList: true, subtree: true });
    }

    detectAddedElements();

    function skipSegment() {
        chrome.storage.local.get(['enabled'], (result) => {
            if (result.enabled || false) {
                waitForVideoLoad();
            }
        });

        function waitForVideoLoad() {
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

            function performSkip() {
                let skipbutton_old = document.getElementsByClassName('ytp-ad-skip-button');
                let previewcont_old = document.getElementsByClassName('ytp-ad-preview-container');
                let skipbutton_new = document.getElementsByClassName('ytp-ad-skip-button-modern');

                if (skipbutton_new.length != 0) {
                    skipbutton_new[0].click();
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

                async function incrementSkipped() {
                    chrome.storage.local.get(['skipped'], (result) => {
                        chrome.storage.local.set({ skipped: (result.skipped || 0) + 1 });
                    });
                }
            }
        }
    }
});

ytadskipper();
