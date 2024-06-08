const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const repassword = document.querySelector("#repassword");
const number = document.querySelector("#number");

togglePassword.addEventListener('click', () => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye-slash');
});

document.querySelector('form').addEventListener('submit', function (event) {
    if (password.value !== repassword.value) {
        alert("Passwords do not match");
        event.preventDefault();
        repassword.value = "";
    } else if (password.value.length < 8) {
        alert("Password Length should be 8 or more digits.")
        event.preventDefault();
    } else if (number.value.length !== 10 || isNaN(parseInt(number.value))) {
        alert("Invalid mobile number. Please enter 10 digits.");
        event.preventDefault();
        number.value = "";
    }
});

document.addEventListener("contextmenu", (event) =>{
    event.preventDefault();
})