const doc = document;

const fname = doc.getElementById('first-name');
const lname = doc.getElementById('last-name');

const oldPass = doc.getElementById('old-pass');
const newPass = doc.getElementById('new-pass');
const confPass = doc.getElementById('confirm-pass');

const saveBtn = doc.getElementById('save-btn');
const changePassBtn = doc.getElementById('change-pass');
const logoutBtn = doc.getElementById('logout');

const userData = JSON.parse(sessionStorage.getItem('loggedInUser'));



fname.value = userData.fname;
lname.value = userData.lname;

saveBtn.addEventListener('click', ()=>{
    if(!fname.value.trim() || !lname.value.trim()){
        alert('Enter valid input');
        return;
    }

    userData.fname = fname.value.trim();
    userData.lname = lname.value.trim();

    sessionStorage.setItem('loggedInUser', JSON.stringify(userData));

    updateLocalStorage(userData);

    alert('User Data successfully updated!!');

    fname.value = '';
    lname.value = '';
})

changePassBtn.addEventListener('click', ()=>{
    if(!oldPass.value || !newPass.value || !confPass.value){
        alert('Enter valid input!');
        return;
    }
    if(oldPass.value != userData.password){
        alert('Old password incorrect');
        return;
    }
    if(newPass.value != confPass.value){
        alert('Password mismatch!!');
        return;
    }
    if(newPass.value.includes(' ')){
        alert('Password must not have space');
        return;
    }

    userData.password = newPass.value;

    sessionStorage.setItem('loggedInUser', JSON.stringify(userData));

    updateLocalStorage(userData);

    alert('Password Updated Successfully!');
    oldPass.value = '';
    newPass.value = '';
    confPass.value = '';
})

function updateLocalStorage(data){
    const users = JSON.parse(localStorage.getItem('users'));

    for(let obj of users){
        if(obj.email === data.email){
            obj.fname = data.fname;
            obj.lname = data.lname;
            obj.password = data.password;
            break;
        }
    }
    console.log(users);
    localStorage.setItem('users', JSON.stringify(users));
}

logoutBtn.addEventListener('click', ()=>{
    sessionStorage.removeItem('loggedInUser');
    location.href = './index.html';
})
