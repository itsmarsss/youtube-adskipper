var ytadskipper=async function(){!function e(){let t=function(e){for(let t of e)"attributes"===t.type&&"src"===t.attributeName&&"VIDEO"===t.target.tagName&&s()},a=new MutationObserver(t);async function s(){let e=document.getElementsByTagName("video");function t(){fetch("https://raw.githubusercontent.com/itsmarsss/youtube-adskipper/main/classes").then(e=>{if(!e.ok)throw Error("Network response was not ok");return e.text()}).then(a=>{let s=a.split("\n"),n=0,r=setInterval(()=>{++n>=100&&clearInterval(r),s.forEach(a=>{let s=document.getElementsByClassName(a);0!=s.length&&chrome.storage.local.get(["enabled"],a=>{a.enabled&&(e.currentTime=e.duration,s[0].click(),t(),clearInterval(r))})})},100)}).catch(e=>{console.error("There was a problem with the fetch operation:",e)});async function t(){chrome.storage.local.get(["skipped"],e=>{chrome.storage.local.set({skipped:(e.skipped||0)+1})})}}0!=e.length&&((e=e[0]).readyState>=2?t():e.addEventListener("loadeddata",()=>{t()}))}a.observe(document,{attributes:!0,childList:!0,subtree:!0})}()};ytadskipper();