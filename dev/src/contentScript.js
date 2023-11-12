console.log("YTSkipper Start Here");

var vsc_controller_node = null;

var observer = new MutationObserver(function () {
    console.log('DOM has changed on YouTube.');
    checkControllerNode();
});

var config = { attributes: true, childList: true, subtree: true };

observer.observe(document, config);

function checkControllerNode() {
    if (vsc_controller_node != null) {
        observer.disconnect();
        console.log(vsc_controller_node.classList)
        return;
    }
    vsc_controller_node = document.getElementsByClassName('vsc-controller')[0];
}