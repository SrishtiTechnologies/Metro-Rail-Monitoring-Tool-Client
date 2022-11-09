const registerCard = document.getElementById('registerCard');
const rechargeCard = document.getElementById('rechargeCard');
const editCard = document.getElementById('editCard');
const deleteCard = document.getElementById('deleteCard');
const searchRoute = document.getElementById('searchRoute');
const searchMetro = document.getElementById('searchMetro');
const username = document.getElementById('username');
const profile = document.getElementById('profile');
const logout = document.getElementById('logout');
const contentBox = document.querySelector('.container-content');

const usernameValue = sessionStorage.getItem("username");

window.addEventListener('pageshow', () => {
  username.innerHTML = "Hi " + usernameValue;
  contentBox.style.display = 'none';
});

profile.addEventListener('click', () => {
  contentBox.style.display = 'block';
});

logout.addEventListener('click', () => {
  // deleting session
  sessionStorage.removeItem("session");
  window.location.assign("../");
});