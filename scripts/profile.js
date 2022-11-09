const userName = document.getElementById('userName');
const emailId = document.getElementById('emailId');
const password = document.getElementById('password');
const phone = document.getElementById('phone');
const dob = document.getElementById('dob');
const address = document.getElementById('address');
const editBtn = document.getElementById('edit');
const submitBtn = document.getElementById('submit');
const spinner = document.querySelector('i.fa-spinner').parentElement;

const userType = sessionStorage.getItem("userType");
const userId = sessionStorage.getItem("userId");

async function getUserDetails() {
  console.log(userType, userId);

}

window.addEventListener('pageshow', async () => {
  await getUserDetails();
});