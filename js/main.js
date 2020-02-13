document.addEventListener("DOMContentLoaded", function () {
    let searchEngines = [
        { name: "百度", url: "https://www.baidu.com/s?wd=" },
        { name: "必应", url: "https://www.bing.com/search?q=" },
        { name: "谷歌", url: "https://www.google.com/search?q=" },
        { name: "搜狗", url: "https://www.sogou.com/web?query=" },
        // { name: "本站", url: "5" }
    ]
    let searchEngine = document.getElementById('search-engine');
    searchEngine.onclick = function (e) {
        e.stopPropagation()
        ulDIsplay()
    }
    function setEngine(engine) {
        searchEngine.innerHTML = engine.name;
        searchEngine.dataset.url = engine.url;
    }
    function getLoclEngine() {
        return  localStorage.getItem("engine");
    }
    function setLocalEngine(engine) {
        localStorage.setItem("engine", engine);
    }
    let localEngineName = getLoclEngine();
    let localEngine = searchEngines.find((val) => val.name === localEngineName) || searchEngines[0]
    setEngine(localEngine)
    let liStr = '';
    for (let i = 0; i < searchEngines.length; i++) {
        const engine = searchEngines[i];
        liStr +=  '<li  data-url="'+ engine.url +'">' + engine.name + '</li>'
    }
    let ul = document.getElementById('search-select-menu');
    function ulDIsplay(hidden) {
        if (hidden) {
            ul.style.display =  "none";
        } else if (ul.style.display === "none") {
            ul.style.display =  "";
        } else {
            ul.style.display = "none";
        }
    }
    ul.style.display = "none";
    ul.innerHTML = liStr;
    for (let i = 0; i < ul.children.length; i++) {
        ul.children[i].onclick = function (e) {
            setEngine({ name: this.innerHTML, url: this.dataset.url })
            setLocalEngine(this.innerHTML)
            ulDIsplay()
            e.stopPropagation()
        }
    }

    var button = document.getElementById('search-button');
    var input = document.getElementById('search-input');
    input.onkeypress = function (e) {
        if(e.keyCode == "13") {
            window.open(searchEngine.dataset.url + input.value)
        }
    }
    button.onclick = function (e) {
        this.blur()
        window.open(searchEngine.dataset.url + input.value)
    }
    document.onclick = function (e) {
        e.stopPropagation()
        ulDIsplay(true)
    }
})