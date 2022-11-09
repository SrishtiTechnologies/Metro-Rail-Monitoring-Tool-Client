import { setSuccessFor, setErrorFor, reset, API_URL } from "./config.js";

const customerOption = document.getElementById('customer');
const adminOption = document.getElementById('admin');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const phone = document.getElementById('phone');
const employeeId = document.getElementById('employeeId');
const dob = document.getElementById('dob');
const address = document.getElementById('address');
const submitBtn = document.getElementById('register');
const spinner = document.querySelector('i.fa-spinner').parentElement;
const modalHeader = document.getElementById('alertModalHeader');
const modalTitle = document.getElementById('alertModalTitle');
const modalBody = document.getElementById('alertModalBodyText');
const modalFooter = document.getElementById('alertModalFooterText');

window.addEventListener("pageshow", () => {
  const form = $('form');
  form[0].reset();
});

customerOption.addEventListener('click', () => {
  let employeeIdElement = employeeId.parentElement;
  employeeIdElement.className = 'col-sm-12 p-0 hide-input';

  let dateElement = dob.parentElement;
  dateElement.className = 'col-sm-12 p-0 hide-input';

  let addressElement = address.parentElement;
  addressElement.className = 'col-sm-12 p-0 hide-input';
});

adminOption.addEventListener('click', () => {
  let employeeIdElement = employeeId.parentElement;
  employeeIdElement.className = 'col-sm-12 p-0';

  let dateElement = dob.parentElement;
  dateElement.className = 'col-sm-12 p-0';

  let addressElement = address.parentElement;
  addressElement.className = 'col-sm-12 p-0';
});

username.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

username.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

email.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

email.addEventListener('blur', (event) => {
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

password2.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

password2.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

phone.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

phone.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

employeeId.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

employeeId.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

address.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

address.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

function sendEmail(name, email) {
  emailjs.init("user_Vr1Y5QeLoak93uH1s4hXI");

  let templateParams = {
    name: name,
    email: email
  };

  return emailjs.send('service_9r8xwc8', 'template_ed71wqv', templateParams);;
}

async function register() {
  let usernameValue = username.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();
  let password2Value = password2.value.trim();
  let phoneValue = phone.value.trim();
  let employeeIdValue, dobValue, addressValue;

  let validEmail = "^(?=.{8,64}@)[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z]{2,})$";
  let validPassword = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*~`?/]).{8,}";
  let validPhone = "^[6-9]{1}[0-9]{9}$";

  let status = true;

  if (usernameValue === "") {
    // show error and add error class for blank username
    setErrorFor(username, "Name cannot be blank");
    status = false;
  }
  else {
    reset(username);
  }

  if (emailValue === "") {
    // show error and add error class for blank email
    setErrorFor(email, "Email cannot be blank");
    status = false;
  }
  else if (!emailValue.match(validEmail)) {
    // show error and add error class for invalid email
    setErrorFor(email, "Email is not valid<br>Tip: firstname(.)lastname@domainname and atleast 8 characters before @");
    status = false;
  }
  else {
    reset(email);
  }

  if (passwordValue === "") {
    // show error and add error class for blank passowrd
    setErrorFor(password, "Password cannot be blank");
    status = false;
  }
  else if (!passwordValue.match(validPassword)) {
    // show error and add error class for weak password
    setErrorFor(password, "Password cannot be weak<br>Tip: atleast 1 upper case, 1 lower case, 1 digit and 1 special character (without commas and brackets) and 8 characters long");
    status = false;
  }
  else {
    reset(password);
  }

  if (password2Value === "") {
    // show error and add error class for blank passowrd
    setErrorFor(password2, "Password cannot be blank");
    status = false;
  }
  else if (passwordValue === "" || !password2Value.match(passwordValue)) {
    // show error and add error class for un-matching passwrod
    setErrorFor(password2, "Password does not match");
    status = false;
  }
  else {
    reset(password2);
  }

  if (phoneValue === "") {
    // show error and add error class for blank phone number
    setErrorFor(phone, "Phone number cannot be blank");
    status = false;
  }
  else if (!phoneValue.match(validPhone)) {
    // show error and add error class for invalid phone number
    setErrorFor(phone, "Phone Number is not valid");
    status = false;
  }
  else {
    reset(phone);
  }

  if (adminOption.checked) {
    employeeIdValue = employeeId.value.trim();
    dobValue = dob.value;
    addressValue = address.value.trim();

    if (employeeIdValue === "") {
      // show error and add error class for blank employee id
      setErrorFor(employeeId, "Employee Id cannot be blank");
      status = false;
    }
    else {
      reset(employeeId);
    }

    if (dobValue === "") {
      // show error and add error class for blank dob
      setErrorFor(dob, "DOB cannot be blank");
      status = false;
    }
    else {
      reset(dob);
    }

    if (addressValue === "") {
      // show error and add error class for blank address
      setErrorFor(address, "Address cannot be blank");
      status = false;
    }
    else {
      reset(address);
    }
  }

  if (status) {
    setSuccessFor(username);
    setSuccessFor(email);
    setSuccessFor(password);
    setSuccessFor(password2);
    setSuccessFor(phone);

    let url, body = {}, id;

    if (adminOption.checked) {
      setSuccessFor(dob);
      setSuccessFor(address);

      url = API_URL + "/api/admins";

      body = JSON.stringify({
        employeeId: employeeIdValue,
        name: usernameValue,
        emailId: emailValue,
        password: passwordValue,
        phone: phoneValue,
        dob: dobValue,
        address: addressValue
      });
    }
    else {
      url = API_URL + "/api/customers";

      body = JSON.stringify({
        name: usernameValue,
        employeeId: employeeIdValue,
        emailId: emailValue,
        password: passwordValue,
        phone: phoneValue
      });
    }

    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const json = await response.json();

    if (adminOption.checked) {
      id = `Your admin id is ${json.adminId}.`;
    }
    else {
      id = `Your customer id is ${json.customerId}.`;
    }

    if (response.status != 200) {
      console.log(json.error);
      modalTitle.innerText = "Registration Unsuccessful";
      modalHeader.style.backgroundColor = "#e74c3c";
      modalBody.innerText = `${json.message} as ${json.error}`;
      modalFooter.innerText = "Click Close to register again";
    }
    else {
      modalTitle.innerText = "Registration Successful";
      modalHeader.style.backgroundColor = "#2ecc71";
      modalBody.innerText = `${json.message}\n ${id}`;
      modalFooter.innerText = "Click Close to login";
    }

    $("#alertModal").modal({
      backdrop: 'static',
      keyboard: false
    });

    $(document).on('hidden.bs.modal', '#alertModal', () => {
      if (response.status != 200) {
        window.location.assign("./register.html");
      }
      else {
        window.location.assign("./");
      }
    });
  }
  submitBtn.style.display = 'block';
  spinner.style.display = 'none';
}

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  submitBtn.style.display = 'none';
  spinner.style.display = 'block';

  await register();
});