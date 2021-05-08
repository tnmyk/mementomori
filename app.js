var dob = document.querySelector('#dob')
var age = document.querySelector('#age')

if(localStorage.getItem('dob')){
    dob.value = localStorage.getItem('dob')
}
var dateofbirth = dob.valueAsNumber;
dob.addEventListener('change',()=>{
    localStorage.setItem('dob',dob.value);
    dateofbirth = dob.valueAsNumber;
})


function setAge(){
    var rightnow = new Date().getTime();
    age.textContent = (rightnow - dateofbirth)/(1000*60*60*24*365);
}
setInterval(setAge,200);
console.log(rightnow);