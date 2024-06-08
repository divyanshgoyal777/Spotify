let Usercreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

let MsgHead = document.getElementById('email_id');
let GreetHead = document.getElementById('user_name');
let SignoutBtn = document.getElementById('signoutbutton');

let Signout = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = '/login_signup/login.html';
}

let CheckCred = () => {
    if (!sessionStorage.getItem("user-creds"))
        window.location.href = '/login_signup/login.html';
    else {
        MsgHead.textContent = `${Usercreds.email}`;
        GreetHead.textContent = `${UserInfo.username}`;
    }
}
window.addEventListener('load', CheckCred);
SignoutBtn.addEventListener('click', Signout);