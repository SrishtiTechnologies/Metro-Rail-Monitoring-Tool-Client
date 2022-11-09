import { setErrorFor, setSuccessFor, reset, API_URL } from "./config.js";

const queryName = document.getElementById('queryName');
const emailOption = document.getElementById('emailOption');
const callOption = document.getElementById('callOption');
const queryEmail = document.getElementById('queryEmail');
const query = document.getElementById('query');
const submitBtn = document.getElementById('submit');
const spinner = document.getElementById('querySpinner');
const modalHeader = document.getElementById('alertModalHeader');
const modalTitle = document.getElementById('alertModalTitle');
const modalBody = document.getElementById('alertModalBody');
const modalFooter = document.getElementById('alertModalFooterText');

window.addEventListener("pageshow", () => {
  let form = $('form');
  form[1].reset();
});

queryName.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

queryName.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

emailOption.addEventListener('click', () => {
  queryEmail.placeholder = "Enter Email";
  queryEmail.parentElement.querySelector("legend").innerText = "Enter Email";

  queryEmail.addEventListener('blur', () => {
    queryEmail.placeholder = "Enter Email";
  });
});

callOption.addEventListener('click', () => {
  queryEmail.placeholder = "Enter Phone Number";
  queryEmail.parentElement.querySelector("legend").innerText = "Enter Phone Number";

  queryEmail.addEventListener('blur', () => {
    queryEmail.placeholder = "Enter Phone Number";
  });
});

queryEmail.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

queryEmail.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

query.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

query.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

async function submitQuery() {
  const queryNameValue = queryName.value.trim();
  const queryEmailValue = queryEmail.value.trim();
  const queryValue = query.value.trim();
  let status = true, url, displayMessage, displayMessage2, validEmailValue;

  if (emailOption.checked) {
    validEmailValue = "^(?=.{8,64}@)[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z]{2,})$";
    displayMessage = "Email cannot be blank";
    displayMessage2 = "Email is not valid";
    url = API_URL + "/api/query/email";
  }
  else {
    validEmailValue = "^[6-9]{1}[0-9]{9}$";
    displayMessage = "Phone Number cannot be blank";
    displayMessage2 = "Phone Number is not valid";
    url = API_URL + "/api/query/phone";
  }

  if (queryNameValue === "") {
    setErrorFor(queryName, "Name cannot be blank");
    status = false;
  }
  else {
    reset(queryName);
  }

  if (queryEmailValue === "") {
    setErrorFor(queryEmail, displayMessage);
    status = false;
  }
  else if (!queryEmailValue.match(validEmailValue)) {
    setErrorFor(queryEmail, displayMessage2);
  }
  else {
    reset(queryEmail);
  }

  if (queryValue === "") {
    setErrorFor(query, "Query description cannot be blank");
    status = false;
  }
  else {
    reset(query);
  }

  if (status) {
    setSuccessFor(queryName);
    setSuccessFor(queryEmail);
    setSuccessFor(query);

    let body = JSON.stringify({
      customerName: queryNameValue,
      emailId: queryEmailValue,
      query: query
    });

    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const json = await response.json();

    if (response.status != 200) {
      console.log(json.error);
      modalTitle.innerText = "Query Submission Unsuccessful";
      modalHeader.style.backgroundColor = "#e74c3c";
      modalBody.innerText = `${json.message} as ${json.error}.`;
      modalFooter.innerText = "Click Close to try again";
    }
    else {
      modalTitle.innerText = "Query Submission Successful";
      modalHeader.style.backgroundColor = "#2ecc71";
      modalBody.innerText = `${json.message} \nYour Query number is ${json.queryNumber}.`;
      modalFooter.innerText = "Click Close";
    }

    $("#alertModal").modal({
      backdrop: 'static',
      keyboard: false
    });

    $(document).on('hidden.bs.modal', '#alertModal', () => {
      window.location.assign("./");
    });
  }

  submitBtn.style.display = 'block';
  spinner.style.display = 'none';
}

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  submitBtn.style.display = 'none';
  spinner.style.display = 'block';

  await submitQuery();
});