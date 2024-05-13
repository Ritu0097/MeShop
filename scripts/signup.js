const doc = document;

const fname = doc.getElementById('first-name');
const lname = doc.getElementById('last-name');
const email = doc.getElementById('email');
const password = doc.getElementById('password');
const confPassword = doc.getElementById('confirm-password');
const form = doc.getElementById('form')

const signupBtn = doc.getElementById('signup-btn');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const obj = {
        fname: fname.value.trim(),
        lname: lname.value.trim(),
        email: email.value.trim(),
        password: password.value
    }

    if(obj.password.includes(' ')){
         alert('password must not contain space');
         return;
    }
    if(obj.password != confPassword.value){
        alert('Password mismatch!!');
        return;
    }

    if(localStorage.getItem('users') && checkUser(obj.email)){
        alert('This email is linked with another account');
    }
    else saveUser(obj);

    form.reset();
});

function checkUser(email){
    const users = JSON.parse(localStorage.getItem('users'));
    const obj = users.find(data => data.email === email)

    return obj;
}

function saveUser(data){
    let users = JSON.parse(localStorage.getItem('users'));
    if(users === null) users = [];

    users.push(data);

    localStorage.setItem('users', JSON.stringify(users));

    sessionStorage.setItem('loggedInUser', JSON.stringify(data));

    alert('Successfully signed in');
    location.href = './shop.html';
}