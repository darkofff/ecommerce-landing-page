function App() {
  const stateBtn = document.querySelector("[data-modal-btn-state]");
  let logState = setLogBtnState(stateBtn); //set initial loginBtn state. czyli czy powinno być zaloguj się czy zarejestruj

  changeLogState(stateBtn, logState);
  exitForm();
  validateFormInput();

  smile(); //absolutelt useless function
}

function setLogBtnState(stateBtn) {
  const logState = sessionStorage.getItem("logState");
  if (logState === "register") {
    //console.log("register");
    stateBtn.textContent = "Zaloguj się";
  } else if (logState === "login") {
    //console.log("login");
    stateBtn.textContent = "Zarejestruj się";
  }
  return logState;
}

function changeLogState(stateBtn, logState) {
  const formHeader = document.getElementById("form-header");
  const formPar = document.getElementById("form-par");
  const formBtnTxt = document.getElementById("form-btn-text");
  logState = setLogState(logState, formHeader, formPar, formBtnTxt);

  stateBtn.addEventListener("click", () => {
    //console.log(stateBtn);
    //console.log(logState);
    logState = setLogState(logState, formHeader, formPar, formBtnTxt);
  });
}

function setLogState(logState, formHeader, formPar, formBtnTxt) {
  if (logState === "register") {
    formHeader.textContent = "Utwórz konto";
    formPar.style.display = "inline-block";
    formBtnTxt.style.display = "none";
    logState = "login";
  } else if (logState === "login") {
    formHeader.textContent = "Zaloguj się za pomocą adresu email";
    formPar.style.display = "none";
    formBtnTxt.style.display = "block";
    logState = "register";
  }
  return logState;
}
function exitForm() {
  const exitBtn = document.getElementById("exit-btn");
  exitBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
}

function validateFormInput() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  emailInput.addEventListener("input", () => {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailValue = regexEmail.test(emailInput.value);

    if (emailValue) {
      emailInput.style.outlineColor = "green";
    } else {
      emailInput.style.outlineColor = "red";
    }
  });

  passwordInput.addEventListener("input", () => {
    const regexPassword = /^(?=.*\d).{8,}$/g;
    const passwordValue = regexPassword.test(passwordInput.value);
    if (passwordValue) {
      passwordInput.style.outlineColor = "green";
    } else {
      passwordInput.style.outlineColor = "red";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  App();
});

function smile() {
  const smile = document.getElementById("form-btn-text");
  smile.addEventListener("click", () => {
    smile.innerText = "No to mamy problem ;(";
  });
}

/* 
things to do
  -  validate email and password
*/
