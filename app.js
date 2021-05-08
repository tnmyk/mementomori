var dob = document.querySelector("#dob");
var age = document.querySelector("#age");

var progressDay = document.querySelector("#day");
var progressMonth = document.querySelector("#month");
var progressYear = document.querySelector("#year");
var today = new Date(),
  seconds = today.getSeconds(),
  minutes = today.getMinutes(),
  hours = today.getHours(),
  day = today.getDate(),
  month = today.getMonth() + 1, //January is 0
  year = today.getFullYear();
if (day < 10) {
  day = "0" + day;
}
if (month < 10) {
  month = "0" + month;
}
var gettimetoday = today;
today = year + "-" + month + "-" + day;
var noofdaysinmonth = new Date(year, month, 0).getDate();
var tseconds = hours * 60 * 60 + minutes * 60 + seconds;
progressDay.style.width = `${tseconds / 864}%`;
var tmonth = tseconds + day * 86400;
var tyear = (gettimetoday.getTime() - new Date(year, 0).getTime()) / 1000;
var noofsecinyear =
  (new Date(year + 1, 0).getTime() - new Date(year, 0).getTime()) / 1000;

progressYear.style.width = `${(tyear / noofsecinyear) * 100}%`;
progressMonth.style.width = `${tmonth / (noofdaysinmonth * 864)}%`;
var interval;
dob.setAttribute("max", today);
if (localStorage.getItem("dob")) {
  dob.value = localStorage.getItem("dob");
  interval = setInterval(setAge, 1000);
}
var dateofbirth = dob.valueAsNumber;
dob.addEventListener("change", () => {
  localStorage.setItem("dob", dob.value);
  dateofbirth = dob.valueAsNumber;
  clearInterval(interval);
  interval = setInterval(setAge, 1000);
});

function setAge() {
  var rightnow = new Date();

  tseconds =
    rightnow.getHours() * 60 * 60 +
    rightnow.getMinutes() * 60 +
    rightnow.getSeconds();

  progressDay.style.width = `${tseconds / 864}%`;

  tmonth = tseconds + rightnow.getDate() * 86400;

  progressMonth.style.width = `${tmonth / (noofdaysinmonth * 864)}%`;
  age.textContent = (
    (rightnow.getTime() - dateofbirth) /
    (1000 * 60 * 60 * 24 * 365)
  ).toPrecision(16);
}

var inputTask = document.querySelector("#input-task");
var tasklist = document.querySelector('#todolist');
var drawertoogle = document.querySelector("#drawer-toogle");
var drawerin =false;
drawertoogle.addEventListener('click',()=>{
  if(!drawerin){
    document.querySelector('#drawer').style.right="0";
    drawertoogle.textContent = ">";
    drawerin=true;
  }
  else{
      document.querySelector("#drawer").style.right = "-25vw";
      drawerin = false;
    drawertoogle.textContent = "<";


  }
})
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && inputTask.value.length>0) {
    tasklist.innerHTML += `<li><div id="task-name">${inputTask.value}</div>
            <button id="remove">x</button>
            </li>`;
    inputTask.value = ""
  }
  
});

document.querySelector('#clear').addEventListener('click', () => {
  // if(tasklist.children.length)
  
  if (
    tasklist.children.length && confirm("Are you sure you want to clear the list?")
  )
    tasklist.innerHTML = "";
})

var remove = document.querySelector(".remove")
tasklist.addEventListener('click',(e) => {
  var target = e.target;
  if(target.id=="remove"){
    tasklist.removeChild(target.parentElement);
  }
  
})
