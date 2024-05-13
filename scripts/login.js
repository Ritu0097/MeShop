const doc = document;

const email = doc.getElementById('email');
const password = doc.getElementById('password');
const form = doc.getElementById('form');
const loginBtn = doc.getElementById('login-btn');


form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const userEmail = email.value;
    const pass = password.value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
    if(users === null){
        alert("Incorrect email or password");
        return;
    }
    for(let obj of users){
        if(obj.email === userEmail){
            if(obj.password === pass){
                alert('Successfully logged in');
                sessionStorage.setItem('loggedInUser', JSON.stringify(obj));
                sessionStorage.setItem('token', generateToken());
                location.href = './shop.html';
                return;
            }
            else{
                alert('Incorrect email or password');
                return;
            }
        }
    }
    alert("Incorrect email or password");
})

function generateToken(){
    let token = '';
    for(let i=0; i<12; i++){
        token += Math.floor(Math.random() * 10);
    }
    console.log(token);
    return token;
}