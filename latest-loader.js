var converter = new showdown.Converter();

var latestVersionTag = document.getElementById("latest-version-tag"),
    latestVersionBody = document.getElementById("latest-markdown-body"),
    olderVersionDiv = document.getElementById("older-ver-div")

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


fetch("https://api.github.com/repos/xFN10x/bedrockR/releases")
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((json) => {
        console.log(json);
        for (const release of json) {
            if (json.indexOf(release) == 0) continue; // skips most recent release (its already showing)
            olderVersionDiv.insertAdjacentHTML("beforeend", `<details>
                <summary>${release.tag_name}</summary>
                <div>${converter.makeHtml(release.body)}</div>
                <button
              style="width: -webkit-fill-available; height: 5rem"
              onclick="location.href = '/download?release=${release.tag_name}'"
            >
              Download
            </button>
              </details>`)
        }
    });
