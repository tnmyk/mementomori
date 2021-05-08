var dob = document.querySelector('#dob')
var age = document.querySelector('#age')
let today = new Date(),
  day = today.getDate(),
  month = today.getMonth() + 1, //January is 0
  year = today.getFullYear();
if (day < 10) {
  day = "0" + day;
}
if (month < 10) {
  month = "0" + month;
}
today = year + "-" + month + "-" + day;

dob.setAttribute("max", today);
if(localStorage.getItem('dob')){
    dob.value = localStorage.getItem('dob')
    setInterval(setAge, 200);
}
var dateofbirth = dob.valueAsNumber;
dob.addEventListener('change',()=>{
    localStorage.setItem('dob',dob.value);
    dateofbirth = dob.valueAsNumber;
    setInterval(setAge, 200);
})


function setAge(){
    var rightnow = new Date().getTime();
    age.textContent = (rightnow - dateofbirth)/(1000*60*60*24*365);
}

console.log(rightnow);