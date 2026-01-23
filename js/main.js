let contentJSON = "content.json";
let content;

fetch(contentJSON)
    .then((res) => { return res.text() })
    .then((text) => { content = JSON.parse(text) })
    .catch((e) => { console.log(e) });

let mainMenu = document.getElementsByClassName("mainMenuContainer")[0];
let tabbedThread = document.getElementsByClassName("tabbedThread")[0];
let tabButtonContainer = document.getElementsByClassName("tabButtonContainer")[0];
let tabViewContainer = document.getElementsByClassName("tabViewContainer")[0];

let path = [];

window.onload = () => {
    setTimeout(() => { window.scrollTo(0, 0); }, 1);
};

let viewContainerIndex = 0;
let initialviewContainerTop = 80;

let tabbedThreadHidden = true;

function loadTabContent(event) {
    if (event) {
        if (event.srcElement.className === "tabButtonSelected") return;
        for (const selectedElements of document.getElementsByClassName("tabButtonSelected")) {
            selectedElements.className = "tabButton";
        }
        event.srcElement.className = "tabButtonSelected";
        if (path[0]) {
            path[1] = event.srcElement.innerText;
        }
    }

    tabViewContainer.style.opacity = 0;
    setTimeout(() => {
        while (tabViewContainer.hasChildNodes()) {
            tabViewContainer.removeChild(tabViewContainer.firstChild);
        }

        for (const item of content[path[0]][path[1]]) {
            TabItem = createTabItem(item.label, item.screenshot, item.link, item.shadow);
            tabViewContainer.appendChild(TabItem)
        }
        window.scrollTo(0, 0);

        setTimeout(() => {
            tabViewContainer.style.opacity = 1;
        }, 100)

    }, 100)

}

function clearTabButtonContainer() {
    while (tabButtonContainer.hasChildNodes()) {
        tabButtonContainer.removeChild(tabButtonContainer.firstChild);
    }
}

function createTabButton(text, isDefault) {
    let tabButton = document.createElement("button");
    if (isDefault) tabButton.className = "tabButtonSelected";
    else tabButton.className = "tabButton";
    tabButton.innerText = text;
    tabButton.onclick = loadTabContent;

    return tabButton;
}
function createTabItem(label, screenshot, link, shadow) {
    let a = document.createElement("a");
    a.className = "tabItem";
    a.rel = "noopener noreferrer";
    a.href = link;
    a.target = "_blank";

    let imgChild = document.createElement("img");
    imgChild.className = "tabItemImage";
    imgChild.src = screenshot;

	if (shadow == false) imgChild.style.boxShadow = "none";

    let labelChild = document.createElement("label");
    labelChild.className = "tabItemLabel";
    labelChild.innerText = label;

    a.appendChild(imgChild);
    a.appendChild(labelChild);

    return a;
}

function showTable(event) {
    tabbedThreadHidden = false;
    mainMenu.style.top = "-50vh";
    tabbedThread.style.top = "0vh";
    tabButtonContainer.style.opacity = 1;
    setTimeout(() => { document.body.style.overflow = "auto" }, 305);

    if (event.srcElement.innerText == path[0]) return;

    path[0] = event.srcElement.innerText;
    path[1] = content[path[0]].visible[content[path[0]].default];

    clearTabButtonContainer();

    for (let index = 0; index < content[path[0]].visible.length; index++) {
        tabButtonContainer.appendChild(createTabButton(content[path[0]].visible[index], index == content[path[0]].default))
    }

    returnButton = document.createElement("button");
    returnButton.className = "tabButtonReturn";
    returnButton.onclick = hideTable;
    returnButton.innerText = "▲";
    tabButtonContainer.appendChild(returnButton);

    loadTabContent();

}

function hideTable(event) {
    tabbedThreadHidden = true;
    mainMenu.style.top = "50vh";
    tabbedThread.style.top = "100vh";
    tabButtonContainer.style.opacity = 0;

    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
}
