const firstname = document.getElementById("name")
const surname = document.getElementById("surname")
const dob = document.getElementById("dob")
const email = document.getElementById("email")
const address = document.getElementById("address")
const phone = document.getElementById("phone")
const gender = document.getElementById("gender")
const occupy = document.getElementById("occupy")
const years = document.getElementById("years")
const employer = document.getElementById("employer")
const degree = document.getElementById("degree")

showData()

function showData(){
    firstname.innerHTML = localStorage.getItem("name")
    surname.innerHTML = localStorage.getItem("surname")
    dob.innerHTML = localStorage.getItem("dob")
    gender.innerHTML = localStorage.getItem("gender")
    email.innerHTML = localStorage.getItem("email")
    address.innerHTML = localStorage.getItem("address")
    phone.innerHTML = localStorage.getItem("phone")
    occupy.innerHTML = localStorage.getItem("occupation")
    years.innerHTML = localStorage.getItem("years")
    employer.innerHTML = localStorage.getItem("employer")
    degree.innerHTML = localStorage.getItem("degree")
    let resultPdf = localStorage.getItem("cvFile")
    if(resultPdf == undefined){
      document.getElementById("pdf").innerHTML = ""
      document.getElementById("pdf").href = ""
    }else{
        document.getElementById("pdf").href = "./../documents/cv.pdf"
    }
}