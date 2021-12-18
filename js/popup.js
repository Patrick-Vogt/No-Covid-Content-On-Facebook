

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "getCount" }, function (count) {
        if (chrome.runtime.lastError) {
            document.querySelector(".warning").style.display = "block";
            document.querySelector("body").style.opacity = "0.5";
        }
        if (count != undefined) {
            document.querySelector(".blocked").textContent = count;
            document.querySelector(".warning").style.display = "none";
        }
    });
});