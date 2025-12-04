var converter = new showdown.Converter();

var latestVersionTag = document.getElementById("latest-version-tag"),
    latestVersionBody = document.getElementById("latest-markdown-body");

fetch("https://api.github.com/repos/xFN10x/bedrockR/releases/latest")
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((json) => {
        console.log(json);
        latestVersionTag.innerText = json.tag_name;
        latestVersionBody.insertAdjacentHTML("afterbegin", converter.makeHtml(json.body))
    });
