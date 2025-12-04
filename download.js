var msi_Download_Button = document.getElementById("msi-button"),
    windows_Portable_Button = document.getElementById("win-port-button"),
    linux_ARM_Deb_Button = document.getElementById("deb-arm-button"),
    linux_ARM_PortableButton = document.getElementById("port-arm-button"),
    linux_AMD_Deb_Button = document.getElementById("deb-amd-button"),
    linux_AMD_Portable_Button = document.getElementById("port-amd-button"),
    jar_Button = document.getElementById("jar-button"),
    version_Text = document.getElementById("version-text")

var downloadButtons = Array.of(
    msi_Download_Button, windows_Portable_Button, linux_AMD_Deb_Button, linux_AMD_Portable_Button, linux_ARM_Deb_Button, linux_ARM_PortableButton, jar_Button
)

var urlSearchParams = new URLSearchParams(location.search)
/** @type {string | null} */
var requested_Version = null
if (urlSearchParams.has("release") && urlSearchParams.get("release") != null) {
    requested_Version = urlSearchParams.get("release")
}
if (requested_Version == null) {
    fetch("https://api.github.com/repos/xFN10x/bedrockR/releases/latest")
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then(json => {
            requested_Version = json.tag_name;
            // @ts-ignore
            version_Text.innerText = requested_Version;
        })
} else {
    // @ts-ignore
    version_Text.innerText = requested_Version;
}


fetch("https://api.github.com/repos/xFN10x/bedrockR/releases")
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((json) => {
        console.log(json);
        for (const release of json) {
            console.log("Does " + release.tag_name + " equal " + requested_Version + "?")
            if (release.tag_name === requested_Version) {
                for (const asset of release.assets) {
                    console.log("handling asset " + asset.name)
                    if (asset.name.endsWith("linux-arm64-portable.zip")) {
                        // @ts-ignore
                        linux_ARM_PortableButton.onclick = (ev) => {
                            location.href = asset.browser_download_url
                        }
                    } else if (asset.name.endsWith("linux-amd64-portable.zip")) {
                        // @ts-ignore
                        linux_AMD_Portable_Button.onclick = (ev) => {
                            location.href = asset.browser_download_url
                        }
                    } else if (asset.name.endsWith("linux-amd64.deb.zip")) {
                        // @ts-ignore
                        linux_AMD_Deb_Button.onclick = (ev) => {
                            location.href = asset.browser_download_url
                        }
                    } else if (asset.name.endsWith("linux-arm64.deb.zip")) {
                        // @ts-ignore
                        linux_ARM_Deb_Button.onclick = (ev) => {
                            location.href = asset.browser_download_url
                        }
                    } else if (asset.name.endsWith("windows-x64-portable.zip")) {
                        // @ts-ignore
                        windows_Portable_Button.onclick = (ev) => {
                            location.href = asset.browser_download_url
                        }
                    } else if (asset.name.endsWith("windows-x64.msi.zip")) {
                        // @ts-ignore
                        msi_Download_Button.onclick = (ev) => {
                            location.href = asset.browser_download_url
                        }
                    } else if (asset.name.endsWith("jar.zip")) {
                        // @ts-ignore
                        jar_Button.onclick = (ev) => {
                            location.href = asset.browser_download_url
                        }
                    }
                }
                document.getElementById("on-gtihub-anchor").href = "https://github.com/xFN10x/bedrockR/releases/tag/" + requested_Version
                // if the button doesnt have an on click, then get rid of it, since that file doesnt exist for that release
                //@ts-ignore
                for (const button of downloadButtons) {
                    if (button.onclick == null) {
                        button.disabled = true
                    }
                }
                break;
            }
        }
    });
