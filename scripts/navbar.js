let flag = false;
if(sessionStorage.getItem('loggedInUser'))
    flag = true;

function home(){
    if(flag){
        location.href = './shop.html';
    }
    else returnHome();
}
function myCart(){
    if(flag){
        location.href = './myCart.html';
    }
    else returnHome();
}

function profile(){
    if(flag){
        location.href = './profile.html';
    }
    else returnHome();
}

function returnHome(){
    alert("login to access this page");
    location.href = './index.html';
}