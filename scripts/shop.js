const doc = document;

const base_url = "https://fakestoreapi.com/products?limit=20";

const searchBar = doc.querySelector('#search');

const mens = doc.querySelector('.mens');
const womens = doc.querySelector('.womens');
const jewellery = doc.querySelector('.jewelery');
const electronics = doc.querySelector('.electronics');

const mensList = doc.querySelector('.mens > .item-list');
const womensList = doc.querySelector('.womens > .item-list');
const jeweleryList = doc.querySelector('.jewelery > .item-list');
const electronicsList = doc.querySelector(".electronics > .item-list");

const allBtn = doc.getElementById('all');
const mensBtn = doc.getElementById('mens');
const womensBtn = doc.getElementById('womens');
const jewelleryBtn = doc.getElementById('jewelery');
const electronicsBtn = doc.getElementById('electronics');

let parsedData;
let filteredItems;
// Filter items
const redCheckBox = doc.getElementById('red');
const blueCheckBox = doc.getElementById('blue');
const greenCheckBox = doc.getElementById('green');
const blackCheckBox = doc.getElementById('black');
const whiteCheckBox = doc.getElementById('white');

const smallCheckBox = doc.getElementById('sm');
const mediumCheckBox = doc.getElementById('md');
const largeCheckBox = doc.getElementById('lg');
const xLargeCheckBox = doc.getElementById('xl');

const ratingRange = doc.getElementById('rating');

const price_25 = doc.getElementById('0_to_25');
const price_50 = doc.getElementById('25_to_50');
const price_100 = doc.getElementById('50_to_100');
const price_moreThan_100 = doc.getElementById('100+');

const filterBtn = doc.getElementById('filter');

callAPI();

async function callAPI(){
    const rawData = await fetch(base_url);
    parsedData = await rawData.json();
    renderData(parsedData);
}

function renderData(data){
    mensList.innerHTML = '';
    womensList.innerHTML = '';
    jeweleryList.innerHTML = '';
    electronicsList.innerHTML = '';

    data.forEach(obj => {
        createData(obj);
    })

    if(mensList.childElementCount === 0){
        mensList.innerHTML = "No items Found";
    }
    if(womensList.childElementCount === 0){
        womensList.innerHTML = "No items Found";
    }
    if(jeweleryList.childElementCount === 0){
        jeweleryList.innerHTML = "No items Found";
    }
    if(electronicsList.childElementCount === 0){
        electronicsList.innerHTML = "No items Found";
    }
}

function createData(item){
    const div = doc.createElement('div');
    div.className = 'item';
    div.innerHTML = `
    <div class="item-img">
        <img src="${item.image}" alt="${item.title}">
    </div>
    <div class="details">
        <div class="item-name">${item.title}</div>
        <div class="top">
            <div class="price-tag">$${item.price}</div>
            <div class="size">${getRandomSize()}</div>
        </div>
        <div class="colors">
            Colors: 
            <div class="color-list">
                ${getRandomColors()}
            </div>
        </div>
        <div class="rating">
            Rating: 
            <div class="rating-stars">
                ${generateStars(item.rating.rate)}
            </div>
        </div>
    </div>
    <button class="addBtn" onclick="addToCart(${item.id-1})">Add To Cart</button>
    `
    if(item.category === "men's clothing"){
        mensList.appendChild(div);
    }
    else if(item.category === "women's clothing"){
        womensList.appendChild(div);
    }
    else if(item.category === "jewelery"){
        jeweleryList.appendChild(div);
    }
    else{
        electronicsList.appendChild(div);
    }
}

function addToCart(item){
    let userCart = JSON.parse(sessionStorage.getItem('userCart'));
    if(userCart === null) userCart = [];
    userCart.push(parsedData[item]);
    sessionStorage.setItem('userCart', JSON.stringify(userCart));
}

function generateStars(rating){
    rating = Math.round(rating);
    let res = ``;
    for(let i=0; i<rating; i++){
        res += `<div class="star"><img src="resources/star.svg" alt="" srcset=""></div>`
    }
    return res;
}

function getRandomColors(){
    const colorArray = ['red', 'blue', 'green', 'black', 'white'];
    let res = [];
    for(let i=0; i<3; i++){
        const random = Math.floor(Math.random()*colorArray.length);
        if(res.includes(colorArray[random])) continue;
        res.push(colorArray[random]);
    }

    return res.reduce((list, color) => {
        return list + `<div class="color" style="background-color: ${color};"></div>`
    }, ``)
}

function getRandomSize(){
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    let res = [];

    for(let i=0; i<3; i++){
        const random = Math.floor(Math.random()*sizes.length);
        if(res.includes(sizes[random])) continue;
        res.push(sizes[random]);
    }

    return res.join(',');
}

function showAll(){
    mens.style.display = 'block';
    womens.style.display = 'block';
    jewellery.style.display = 'block';
    electronics.style.display = 'block';
}

function showMenCategory(){
    mens.style.display = 'block';
    womens.style.display = 'none';
    jewellery.style.display = 'none';
    electronics.style.display = 'none';
}

function showWomenCategory(){
    mens.style.display = 'none';
    womens.style.display = 'block';
    jewellery.style.display = 'none';
    electronics.style.display = 'none';
}

function showJewelery(){
    mens.style.display = 'none';
    womens.style.display = 'none';
    jewellery.style.display = 'block';
    electronics.style.display = 'none';
}
function showElectronics(){
    mens.style.display = 'none';
    womens.style.display = 'none';
    jewellery.style.display = 'none';
    electronics.style.display = 'block';
}

filterBtn.addEventListener('click', ()=>{
    const colorObj = {
        red : redCheckBox.checked,
        blue : blueCheckBox.checked,
        green : greenCheckBox.checked,
        black : blackCheckBox.checked,
        white : whiteCheckBox.checked
    }

    const sizeObj = {
        sm : smallCheckBox.checked,
        md : mediumCheckBox.checked,
        large : largeCheckBox.checked,
        xl : xLargeCheckBox.checked
    }

    const rating = ratingRange.value;
    
    const priceObj = {
        'max-25' : price_25.checked,
        'max-50' : price_50.checked,
        'max-100' : price_100.checked,
        '100+' : price_moreThan_100.checked
    }

    filterData(colorObj, sizeObj, rating, priceObj);
})

const priceRanges = {
    'max-25' : [0, 25],
    'max-50' : [25, 50],
    'max-100' : [50, 100],
    '100+' : [100, Number.MAX_VALUE]
}

function filterData(colorObj, sizeObj, rating, priceObj){
    filteredItems = parsedData.filter(obj => {
        if(Math.round(obj.rating.rate) >= rating && checkPrice(obj.price, priceObj)){
            return obj;
        }
    })
    renderData(filteredItems);
}

function checkPrice(price, priceObj){
    for(let range in priceObj){
        if(priceObj[range]){
            if(price > priceRanges[range][0] && price <= priceRanges[range][1]){
                return true;
            }
        }
    }
    return false;
}

let clearTimer;
searchBar.addEventListener('input', ()=>{
    if(clearTimer) clearTimeout(clearTimer);
    clearTimer = setTimeout(()=>{
        const userSearchInput = searchBar.value.trim();
        if(!filteredItems){
            filteredItems = JSON.stringify(parsedData);
            filteredItems = JSON.parse(filteredItems);
        }
        const tempData = filteredItems.filter(obj => {
            if(obj.title.toLowerCase().includes(userSearchInput.toLowerCase())){
                return obj;
            }
        })
        renderData(tempData);
    }, 200)
})