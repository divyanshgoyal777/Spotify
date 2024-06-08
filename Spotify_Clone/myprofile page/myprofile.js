function editProfile() {
    alert("Profile updates are currently not functioning. Changes made will not be saved.");

    const profileImageLabel = document.getElementById('profileImageLabel');
    profileImageLabel.classList.add('editing');

    document.getElementById('profile-head').innerHTML = `Change Profile Photo`
    document.getElementById('user_name').innerHTML = '<input type="text" id="newUsername" placeholder="New Username" required>';
    document.getElementById('email_id').innerHTML = '<input type="email" id="newEmail" placeholder="New Email" required>';
    document.getElementById('saveChanges').style.display = 'inline-block';
    document.getElementById('profileImageInput').removeAttribute('disabled');
    document.getElementById('editProfile').style.display = 'none';
    document.getElementById('profileImage').setAttribute('title', 'Change Profile Photo');
}


function saveChanges() {
    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;
    const profileImageInput = document.getElementById('profileImageInput');
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (newUsername !== "" && newEmail !== "" && emailFormat.test(newEmail)) {
        document.getElementById('user_name').innerText = newUsername;
        document.getElementById('userhead').style.display = 'block';
        document.getElementById('email_id').innerText = newEmail;
        document.getElementById('emailhead').style.display = 'block';

        if (profileImageInput.files.length > 0) {
            displayProfileImage(profileImageInput);
        }
    } else {
        if (newUsername === "" && newEmail === "") {
            alert("New Username or New Email is blank. Please fill in both fields.");
        } else {
            alert("Invalid email format. Please enter a valid email address.");
        }
        return;
    }

    document.getElementById('saveChanges').style.display = 'none';
    document.getElementById('profileImageLabel').classList.remove('editing');a
}

function displayProfileImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const profileImage = document.getElementById('profileImage');
            profileImage.src = e.target.result;
            profileImage.style.width = '120px';
            profileImage.style.height = '120px';

        };
        reader.readAsDataURL(file);
    }
}
