let listSolved = [];
chrome.storage.sync.get('solvedProblems', ({ solvedProblems }) => {
    listSolved = solvedProblems;
    executeScript();
});

function addCheckBox(element) {
    let isInList = listSolved.includes(element.innerHTML);
    var x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.classList.add("leetcheckbox");
    x.setAttribute("data-problem", element.innerHTML);
    if (isInList) {
        x.checked = true;
        element.classList.add('leetsolved');
    }
    element.after(x);
    addListenerToElement(x);
}

function addListenerToElement(element){
    element.addEventListener('change', function (data) {
        if (this.checked) {
            listSolved.push(data.currentTarget.getAttribute('data-problem'));
            data.currentTarget.parentElement.children[0].classList.add('leetsolved')
            chrome.storage.sync.set({solvedProblems: listSolved})
        } else {
            const index = listSolved.indexOf(data.currentTarget.getAttribute('data-problem'));
            if (index > -1){
                listSolved.splice(index,1);
                data.currentTarget.parentElement.children[0].classList.remove('leetsolved')
                chrome.storage.sync.set({solvedProblems: listSolved})
            }
        }
    });
}

function executeScript() {
    let listBackground = document.getElementsByClassName('whitespace-nowrap');
    if (listBackground.length > 0) {
        for (let i = 0; i < listBackground.length; i++) {
            addCheckBox(listBackground[i])
            listBackground[i].parentElement.addEventListener("mouseenter", function (event) {
                event.currentTarget.children[1].style.display = "block";
            });
            listBackground[i].parentElement.addEventListener("mouseleave", function (event) {
                event.currentTarget.children[1].style.display = "none";
            })
        }
    }
    let expand = document.getElementsByClassName('flex-grow text-right');
    if (expand.length) {
        expand[0].click();
    }
}