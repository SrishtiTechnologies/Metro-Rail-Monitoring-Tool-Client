import { setErrorFor, setSuccessFor, reset, API_URL } from "./config.js";

const customerOption = document.getElementById('customer');
const adminOption = document.getElementById('admin');
const id = document.getElementById('id');
const otp = document.getElementById('otp');
const sendOTPBtn = document.getElementById('sendOTP');
const confirmOTPBtn = document.getElementById('confirmOTP');
const newPassword = document.getElementById('newPassword');
const newPassword2 = document.getElementById('newPassword2');
const submitBtn = document.getElementById('resetPassword');
const spinner = document.querySelector('i.fa-spinner').parentElement;
const modalHeader = document.getElementById('alertModalHeader');
const modalTitle = document.getElementById('alertModalTitle');
const modalBody = document.getElementById('alertModalBody');
const modalFooter = document.getElementById('alertModalFooterText');

let checkOtpValue, checkPasswordValue;

window.addEventListener("pageshow", () => {
  let form = $('form');
  form[0].reset();
});

customerOption.addEventListener('click', () => {
  id.placeholder = "Enter Customer ID / Email ID";
  id.parentElement.querySelector("legend").innerText = "Enter Customer ID / Email ID";

  id.addEventListener('blur', () => {
    id.placeholder = "Enter Customer ID / Email ID";
  });
});

adminOption.addEventListener('click', () => {
  id.placeholder = "Enter Admin ID / Email ID";
  id.parentElement.querySelector("legend").innerText = "Enter Admin ID / Email ID";

  id.addEventListener('blur', () => {
    id.placeholder = "Enter Admin ID / Email ID";
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

otp.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

otp.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

newPassword.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

newPassword.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

newPassword2.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

newPassword2.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

function sendEmail(OTP, email) {
  emailjs.init("user_Vr1Y5QeLoak93uH1s4hXI");

  let templateParams = {
    OTP: OTP,
    email: email
  };

  return emailjs.send('service_9r8xwc8', 'template_5ivhdyv', templateParams);
}

async function sendOTP() {
  const idValue = id.value.trim();
  const messageElement = id.parentElement.querySelector('p.message');
  let url, displayMessage, emailId;

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
      url = url = API_URL + "/api/customers/" + Number(idValue);
    }
    else {
      url = API_URL + "/api/customers/" + idValue;
    }
    displayMessage = "Customer ID / Email cannot be blank";
  }

  if (idValue === "") {
    // show error and add error class for blank id
    setErrorFor(id, displayMessage);
  }
  else {
    reset(id);
    checkOtpValue = Math.floor(Math.random() * 1000000);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const json = await response.json();

    if (response.status != 200) {
      let errorMessage = json.message + "<br>" + json.error;

      // show error and add error class for customer not found
      setErrorFor(id, errorMessage);
    }
    else {
      setSuccessFor(id);
      if (adminOption.checked) {
        checkPasswordValue = json.admin_details.password;
        emailId = json.admin_details.emailId;
      }
      else {
        checkPasswordValue = json.customer_details.password;
        emailId = json.customer_details.emailId;
      }

      const emailResponse = await sendEmail(checkOtpValue, emailId);

      if (emailResponse.status === 200) {
        messageElement.className = "message success";
        messageElement.innerHTML = "OTP sent to your email.";
      }
      else {
        messageElement.innerHTML = emailResponse.error;
      }

      setTimeout(() => {
        id.parentElement.className = "col-sm-12 p-0 hide-input";
        otp.parentElement.className = "col-sm-12 p-0";
        sendOTPBtn.parentElement.className = "col-sm-12 p-0 hide-input";
        confirmOTPBtn.parentElement.className = "col-sm-12 p-0";
      }, 2000);
    }
  }
  sendOTPBtn.style.display = 'block';
  spinner.style.display = 'none';
}

sendOTPBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  sendOTPBtn.style.display = 'none';
  spinner.style.display = 'block';

  await sendOTP();
});

function confirmOTP() {
  const otpValue = otp.value.trim();

  if (otpValue === "") {
    // show error and add error class for blank password
    setErrorFor(otp, "OTP cannot be blank");
  }
  else if (!otpValue.match(checkOtpValue)) {
    // show error and add error class for incorrect otp
    setErrorFor(otp, "Incorrect OTP");
  }
  else {
    setSuccessFor(otp);

    setTimeout(() => {
      otp.parentElement.className = "col-sm-12 p-0 hide-input";
      confirmOTPBtn.parentElement.className = "col-sm-12 p-0 hide-input";
      newPassword.parentElement.className = "col-sm-12 p-0";
      newPassword2.parentElement.className = "col-sm-12 p-0";
      submitBtn.parentElement.className = "col-sm-12 p-0";
    }, 2000);
  }
  confirmOTPBtn.style.display = 'block';
  spinner.style.display = 'none';
}

confirmOTPBtn.addEventListener('click', (event) => {
  event.preventDefault();
  confirmOTPBtn.style.display = 'none';
  spinner.style.display = 'block';

  confirmOTP();
});

async function resetPassword() {
  const idValue = id.value.trim();
  const newPasswordValue = newPassword.value.trim();
  const newPassword2Value = newPassword2.value.trim();

  let validPassword = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*~`?/]).{8,}";
  let url, displayMessage, status = true;

  if (adminOption.checked) {
    if (!isNaN(idValue)) {
      url = API_URL + "/api/admins/" + Number(idValue);
    }
    else {
      url = API_URL + "/api/admins/" + idValue;
    }
  }
  else {
    if (!isNaN(idValue)) {
      url = url = API_URL + "/api/customers/" + Number(idValue);
    }
    else {
      url = API_URL + "/api/customers/" + idValue;
    }
  }

  if (newPasswordValue === "") {
    // show error and add error class for blank password
    setErrorFor(newPassword, "Password cannot be blank");
    status = false;
  }
  else if (!newPasswordValue.match(validPassword)) {
    // show error and add error class for weak password
    setErrorFor(newPassword, "Password cannot be weak<br>Tip: atleast 1 upper case, 1 lower case, 1 digit and 1 special character (without commas and brackets) and 8 characters long");
    status = false;
  }
  else if (newPasswordValue.match(checkPasswordValue)) {
    // show error and add error class for matching old password
    setErrorFor(newPassword, "New password cannot be same as old password");
    status = false;
  }
  else {
    reset(newPassword);
  }

  if (newPassword2Value === "") {
    // show error and add error class for blank passowrd
    setErrorFor(newPassword2, "Password cannot be blank");
    status = false;
  }
  else if (newPasswordValue === "" || !newPassword2Value.match(newPasswordValue)) {
    // show error and add error class for weak password
    setErrorFor(newPassword2, "Password does not match");
    status = false;
  }
  else {
    reset(newPassword2);
  }

  if (status) {
    setSuccessFor(newPassword);
    setSuccessFor(newPassword2);

    let body = JSON.stringify({
      password: newPasswordValue
    });

    const response = await fetch(url, {
      method: "PUT",
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const json = await response.json();

    if (response.status != 200) {
      console.log(json.error);
      modalTitle.innerText = "Reset Password Unsuccessful";
      modalHeader.style.backgroundColor = "#e74c3c";
      modalBody.innerText = `${json.message} as ${json.error}`;
      modalFooter.innerText = "Click Close to reset password again.";
    }
    else {
      modalTitle.innerText = "Reset Password Successful";
      modalHeader.style.backgroundColor = "#2ecc71";
      modalBody.innerText = "Updated password successfully";
      modalFooter.innerText = "Click Close to login";
    }

    $("#alertModal").modal({
      backdrop: 'static',
      keyboard: false
    });

    $(document).on('hidden.bs.modal', '#alertModal', () => {
      if (response.status != 200) {
        window.location.assign("./reset-password.html");
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

  await resetPassword();
});