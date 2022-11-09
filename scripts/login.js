import { setErrorFor, setSuccessFor, reset, API_URL } from "./config.js";

const customerOption = document.getElementById('customer');
const adminOption = document.getElementById('admin');
const id = document.getElementById('id');
const password = document.getElementById('password');
const submitBtn = document.getElementById('login');
const spinner = document.getElementById('spinner');

window.addEventListener("pageshow", () => {
  let form = $('form');
  form[0].reset();
});

customerOption.addEventListener('click', () => {
  id.placeholder = "Enter Customer ID / Email";
  id.parentElement.querySelector("legend").innerText = "Enter Customer ID / Email";

  id.addEventListener('blur', () => {
    id.placeholder = "Enter Customer ID / Email";
  });
});

adminOption.addEventListener('click', () => {
  id.placeholder = "Enter Admin ID / Email";
  id.parentElement.querySelector("legend").innerText = "Enter Admin ID / Email";

  id.addEventListener('blur', () => {
    id.placeholder = "Enter Admin ID / Email";
  });
});

id.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

id.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

password.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

password.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

async function login() {
  const idValue = id.value.trim();
  const passwordValue = password.value.trim();
  let url, displayMessage, status = false;

  if (adminOption.checked) {
    if (!isNaN(idValue)) {
      url = API_URL + "/api/admins/" + Number(idValue);
    }
    else {
      url = API_URL + "/api/admins/" + idValue;
    }
    displayMessage = "Admin ID / Email cannot be blank";
  }
  else {
    if (!isNaN(idValue)) {
      url = API_URL + "/api/customers/" + Number(idValue);
    }
    else {
      url = API_URL + "/api/customers/" + idValue;
    }
    displayMessage = "Customer ID / Email cannot be blank";
  }

  // Validate inputs
  if (idValue === "") {
    // show error and add error class for blank id
    setErrorFor(id, displayMessage);
  }
  else {
    reset(id);
  }

  if (passwordValue === "") {
    // show error and add error class for blank password
    setErrorFor(password, "Password cannot be blank");
  }
  else {
    reset(password);
  }

  if (idValue !== "" && passwordValue !== "") {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const json = await response.json();

    if (response.status !== 200) {
      let errorMessage = json.message + "<br>" + json.error;

      // show error and add error class for customer not found
      setErrorFor(id, errorMessage);
      setErrorFor(password, "");
    }
    else {
      // add success class for id
      setSuccessFor(id);

      let checkPasswordValue;
      let username, userType, userId;
      if (adminOption.checked) {
        checkPasswordValue = json.admin_details.password;
        username = json.admin_details.name;
        userType = "Admin";
        userId = json.admin_details.adminId;
      }
      else {
        checkPasswordValue = json.customer_details.password;
        username = json.customer_details.name;
        userType = "Customer";
        userId = json.customer_details.customerId;
      }

      if (passwordValue !== checkPasswordValue) {
        // show error and add error class for incorrect password
        setErrorFor(password, "Incorrect Password");
      }
      else {
        // add success class
        setSuccessFor(password);
        status = true;
      }

      sessionStorage.setItem("username", username);
      sessionStorage.setItem("userType", userType);
      sessionStorage.setItem("userId", userId);
    }
  }
  submitBtn.style.display = 'block';
  spinner.style.display = 'none';
  return status;
}

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  submitBtn.style.display = 'none';
  spinner.style.display = 'block';

  let status = await login();
  setTimeout(() => {
    if (status) {
      // creating session
      sessionStorage.setItem("session", Math.random().toString(36).substr(2, 16));
      window.location.assign("./Users/dashboard.html");
    }
  }, 2000);
});