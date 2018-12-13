let h2 = document.querySelector('#dog-name');
let button = document.querySelector('button');
button.addEventListener('click', hash);
const removeAllIncludeSlash = /^.*\//; // RegExp
function getBreedList() {
    function reqListener () {
        let obj = JSON.parse(this.responseText);
        let breedsObj = obj.message;
        renderBreeds(breedsObj);
    };
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open('GET', 'https://dog.ceo/api/breeds/list/all');
    oReq.send();    
};
getBreedList();
function hash() {
    if (window.location.hash) {
        let hash = window.location.hash.replace('#', '');
        let h2Text = window.location.hash.replace('#', '');
        h2.textContent = h2Text.replace(removeAllIncludeSlash, '');
        getBreedsImg(hash, '');
    } else imgWithoutHash();
}
hash(); 
function imgWithoutHash() {
    function reqListener () {
        let obj = JSON.parse(this.responseText);
        let imgSrc = obj.message;
        renderImg(imgSrc);
    };
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open('GET', 'https://dog.ceo/api/breeds/image/random');
    oReq.send();    
};
function getBreedsImg(breed, subbreed) {
    function reqListener () {
        let obj = JSON.parse(this.responseText);
        let imgSrc = obj.message;
        renderImg(imgSrc);
    };
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open('GET', 'https://dog.ceo/api/breed/' + breed + subbreed + '/images/random');
    oReq.send();    
};
function renderImg(imgSrc) {
    let img = document.querySelector('img');
    img.src = imgSrc;
};
function renderBreeds(obj) {
    let ul = document.querySelector('ul');
    for (let breeds in obj) {
        let li = document.createElement('li');
        li.textContent = breeds;
        ul.appendChild(li);
        let breedsArr = obj[breeds];
        if (breedsArr.length > 1) {
            let ul = document.createElement('ul');
            for (let i in breedsArr) {
                let subBreeds = breedsArr[i];
                let subLi = document.createElement('li');
                subLi.textContent = subBreeds;
                ul.appendChild(subLi);
                li.appendChild(ul);
                subLi.addEventListener('click', function(e) {
                    e.stopPropagation();
                    window.location.hash = breeds + '/' + subBreeds;
                    button.removeEventListener('click', imgWithoutHash);
                    h2.textContent = subBreeds;
                    getBreedsImg(breeds, '/' + subBreeds);
                });
            }
        } 
        li.addEventListener('click', function() {
            window.location.hash = breeds;
            button.removeEventListener('click', imgWithoutHash);
            h2.textContent = breeds;
            getBreedsImg(breeds, '');
        });
    }
};