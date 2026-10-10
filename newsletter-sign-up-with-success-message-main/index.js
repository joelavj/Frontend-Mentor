const formulaire = document.querySelector('form');
const signUp = document.querySelector('.sign-up');
const succesMessage = document.querySelector('.succes-message');
const inputEmail = document.getElementById('email');
const error = document.querySelector('.error');
const strong = document.querySelector('strong');
const bouton = document.getElementById('button')

formulaire.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = (inputEmail.value).trim();
    if (!email || !estUnEmail(email)) {
        error.innerHTML = "Valid email required";
        inputEmail.classList.add('error-input');
    } else {
        error.innerHTML = "";
        inputEmail.classList.remove('error-input');
        strong.textContent = email;
        signUp.classList.add('active');
        succesMessage.classList.remove('active');
    }

});

bouton.addEventListener('click', () => {
    succesMessage.classList.add('active');
    signUp.classList.remove('active');
    inputEmail.value = '';
})

function estUnEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}