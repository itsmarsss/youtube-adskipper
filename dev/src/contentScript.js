var ytadskipper = (async function () {

    waitForHTML5();

    function waitForHTML5() {
        const callback = function (mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes') {
                    if (mutation.attributeName === 'src' && mutation.target.tagName === 'VIDEO') {
                        skipSegment();
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);

        observer.observe(document, { attributes: true, childList: true, subtree: true });

        async function skipSegment() {
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
                fetch('https://raw.githubusercontent.com/itsmarsss/youtube-adskipper/main/classes')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(text => {
                        const lines = text.split('\n');

                        let pollCount = 0;
                        let skipPoll = setInterval(() => {
                            pollCount++;
                            if (pollCount >= 100) {
                                clearInterval(skipPoll);
                            }
                            lines.forEach(line => {
                                const skipbutton = document.getElementsByClassName(line);
                                if (skipbutton.length != 0) {
                                    chrome.storage.local.get(['enabled'], (result) => {
                                        if (result.enabled || false) {
                                            video.currentTime = video.duration;
                                            skipbutton[0].click();
                                            incrementSkipped();
                                            clearInterval(skipPoll);
                                        }
                                    });
                                }
                            });
                        }, 100);
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
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
