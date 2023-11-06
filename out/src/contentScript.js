const adskipper = document.createElement("div"); adskipper.setAttribute("id", "adskipper"); const ascontent = document.createElement("as-content"), shadow = adskipper.attachShadow({ mode: "open" }), style = document.createElement("style"); style.textContent = `
as-content {
    // n/a
}
`, shadow.appendChild(style), shadow.appendChild(ascontent), document.body.appendChild(adskipper), setInterval(() => { var e = document.getElementsByClassName("ytp-ad-skip-button"), t = document.getElementsByClassName("ytp-ad-preview-container"); if (0 != e.length || 0 != t.length) { try { var a = document.getElementsByTagName("video")[0]; a.currentTime = a.duration } catch (n) { } 0 != e.length && e[0].click() } }, 250);