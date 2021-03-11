const image = document.getElementById("img");
const inputImage = document.getElementById("inputImage");
const img_text = document.getElementById("img_text");
const cv = document.getElementById("cv");
const inputCV = document.getElementById("inputCV");
const cv_text = document.getElementById("cv_text");
const inputDOB = document.getElementById("inputDOB");
const inputName = document.getElementById("inputName");
const lastname = document.getElementById("lastname");
const selectedGender = document.getElementById("selectedGender");
const inputAddress = document.getElementById("inputAddress");
const inputEmail = document.getElementById("inputEmail");
const inputOccupy = document.getElementById("inputOccupy");
const inputDegree = document.getElementById("inputDegree");
const inputEmployer = document.getElementById("inputEmployer");
const inputYears = document.getElementById("inputYears");
const inputPhone = document.getElementById("inputPhone");
const submitForm = document.getElementById("submitForm");
let invalids1;
let invalids2;

inputImage.addEventListener("change", (event) => {
    showImage();
  });
  
  function showImage() {
    const files = Array.from(event.target.files).map((file) => file.name);
    image.removeChild(img_text);
    let newuploadImage = document.createElement("div");
    newuploadImage.style.width = "50%";
    newuploadImage.style.height = "100%";
    newuploadImage.style.display = "flex";
    newuploadImage.style.alignItems = "center";
    newuploadImage.style.justifyContent = "space-evenly";
    newuploadImage.innerHTML = files;
    newuploadImage.style.zIndex = "999999999";
    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = "X";
    newuploadImage.appendChild(closeBtn);
    image.appendChild(newuploadImage);
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      image.appendChild(img_text);
      image.removeChild(newuploadImage);
    });
  }
  
  inputCV.addEventListener("change", (event) => {
    showCV();
  });
  
  function showCV() {
    const files = Array.from(event.target.files).map((file) => file.name);
    cv.removeChild(cv_text);
    let newuploadImage = document.createElement("div");
    newuploadImage.style.width = "50%";
    newuploadImage.style.height = "100%";
    newuploadImage.style.display = "flex";
    newuploadImage.style.alignItems = "center";
    newuploadImage.style.justifyContent = "space-evenly";
    newuploadImage.innerHTML = files;
    newuploadImage.style.zIndex = "999999999";
    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = "X";
   
    newuploadImage.appendChild(closeBtn);
    cv.appendChild(newuploadImage);
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      cv.appendChild(cv_text);
      cv.removeChild(newuploadImage);
    });
  }

submitForm.addEventListener("click", (event) => {
  event.preventDefault();
  dataValues()
  sendRequest();

});
function dataValues() {
  localStorage.setItem("name", inputName.value);
  localStorage.setItem("surname", lastname.value);
  localStorage.setItem("dob", inputDOB.value);
  localStorage.setItem("gender", selectedGender.value);
  localStorage.setItem("address", inputAddress.value);
  localStorage.setItem("phone", inputPhone.value);
  localStorage.setItem("email", inputEmail.value);
  localStorage.setItem("occupation", inputOccupy.value);
  localStorage.setItem("employer", inputEmployer.value);
  localStorage.setItem("years", inputYears.value);
  localStorage.setItem("degree", inputDegree.value);
  localStorage.setItem("imageFile", inputImage.files[0].name);
  localStorage.setItem("cvFile", inputCV.files[0].name);

}
storeValues();

function storeValues() {
  inputName.value = localStorage.getItem("name");
  lastname.value = localStorage.getItem("surname");
  inputDOB.value = localStorage.getItem("dob");
  selectedGender.value = localStorage.getItem("gender");
  inputAddress.value = localStorage.getItem("address");
  inputPhone.value = localStorage.getItem("phone");
  inputEmail.value = localStorage.getItem("email");
  inputOccupy.value = localStorage.getItem("occupation");
  inputEmployer.value = localStorage.getItem("employer");
  inputYears.value = localStorage.getItem("years");
  inputDegree.value = localStorage.getItem("degree");
  let closeBtn = document.createElement("button");
  closeBtn.style.zIndex = "1000000000"
  closeBtn.innerHTML = "X";
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    img_text.innerHTML = "Image";
    closeBtn.style.display = "none";
  });
  image.appendChild(closeBtn);
  img_text.innerHTML = localStorage.getItem("imageFile");
  inputDegree.value = localStorage.getItem("degree");
  let closeButton = document.createElement("button");
  closeButton.style.zIndex = "1000000000"
  closeButton.innerHTML = "X";
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    cv_text.innerHTML = "CV";
    closeButton.style.display = "none";
  });
  cv.appendChild(closeButton);
  cv_text.innerHTML = localStorage.getItem("cvFile");
  
}

function sendRequest() {
  axios({
    method: "post",
    url: "http://localhost:3001/createUser",
    data: {
      name: inputName.value,
      surname: lastname.value,
      dob: inputDOB.value,
      gender: selectedGender.value,
      address: inputAddress.value,
      phone: inputPhone.value,
      email: inputEmail.value,
      occupation: inputOccupy.value,
      employer: inputEmail.value,
      years: inputYears.value,
      degree: inputDegree.value,
    },
  });
  axios({
    method: "post",
    url: "http://localhost:3001/uploadImage",
    data: {
      imageFile: inputImage.files,
    },
  });

  axios({
    method: "post",
    url: "http://localhost:3001/uploadCV",
    data: {
      cvFile: inputCV.files,
    },
  });
}

function enableBtn() {
  if (invalids1 == 0 && invalids2 == 0) {
    submitForm.removeAttribute("disabled");
  } else {
    submitForm.setAttribute("disabled", "disabled");
  }
}

function control(formId) {
  invalids1 = document.getElementById(formId).querySelectorAll(":invalid")
    .length;
   console.log(invalids1)
  enableBtn();
}
function control2(formId) {
  invalids2 = document.getElementById(formId).querySelectorAll(":invalid")
    .length;
   console.log(invalids2)
  enableBtn();
}
control("form1");
control2("form2");
