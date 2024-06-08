const password = document.querySelector('#password');
const togglepassword = document.querySelector('#togglepassword');

document.querySelector('form').addEventListener('submit', function (event) {
    if (password.value.length < 8) {
        alert("Password Length should be 8 or more digits.")
        event.preventDefault();
    }
});

togglePassword.addEventListener('click', () => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye-slash');
});

document.addEventListener("contextmenu", (event) =>{
    event.preventDefault();
})