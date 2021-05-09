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
// progressDay.style.width = `${tseconds / 864}%`;
// document.querySelector("#day-percent").textContent = `${(tseconds / 864).toPrecision(4)}%`
var tmonth = tseconds + (day) * 86400;
var tyear = (gettimetoday.getTime() - new Date(year, 0).getTime()) / 1000;
var noofsecinyear =
  (new Date(year + 1, 0).getTime() - new Date(year, 0).getTime()) / 1000;

progressYear.style.width = `${(tyear / noofsecinyear) * 100}%`;
document.querySelector("#year-percent").textContent = `${
  ((tyear / noofsecinyear) * 100
).toPrecision(4)}%`;
progressMonth.style.width = `${tmonth / (noofdaysinmonth * 864)}%`;
var interval;
dob.setAttribute("max", today);
interval = setInterval(setAge, 250);

if (localStorage.getItem("dob")) {
  dob.value = localStorage.getItem("dob");
}
var dateofbirth = dob.valueAsNumber;
dob.addEventListener("change", () => {
  localStorage.setItem("dob", dob.value);
  dateofbirth = dob.valueAsNumber;
  clearInterval(interval);
  interval = setInterval(setAge, 250);
});
setAge();

function setAge() {
  var rightnow = new Date();

  tseconds =
    rightnow.getHours() * 60 * 60 +
    rightnow.getMinutes() * 60 +
    rightnow.getSeconds();
  document.querySelector("#day-percent").textContent = `${(tseconds / 864).toPrecision(4)}%`;
  progressDay.style.width = `${tseconds / 864}%`;

  tmonth = tseconds + (rightnow.getDate()-1) * 86400;
  document.querySelector("#month-percent").textContent = `${
    (tmonth / (noofdaysinmonth * 864)
  ).toPrecision(4)}%`;
  progressMonth.style.width = `${tmonth / (noofdaysinmonth * 864)}%`;
  

  if(isNaN((rightnow.getTime() - dateofbirth) /
    (1000 * 60 * 60 * 24 * 365)
  )) age.textContent = "Set Date of Birth";
  else{
    age.textContent = (
      (rightnow.getTime() - dateofbirth) /
      (1000 * 60 * 60 * 24 * 365)
    ).toPrecision(10);
  }
  
}

var inputTask = document.querySelector("#input-task");
var tasklist = document.querySelector('#todolist');
var drawertoogle = document.querySelector("#drawer-toogle");
var drawerin =false;
var numberoftasks = document.querySelector('#numberoftasks');

if(localStorage.getItem("tasks")){
  tasklist.innerHTML = localStorage.getItem("tasks");
  numberoftasks.innerHTML = `<h4>Tasks(${tasklist.children.length})</h4>`
}
tasklist.addEventListener("click",(e)=>{
  var target = e.target;
  if(target.id!='checkbox') return;
  if(target.parentElement.querySelector('#task-name').style.color!='gray'){
    
    target.parentElement.querySelector("#task-name").style.color = "gray";
    target.parentElement.querySelector("#task-name").style.textDecoration = "line-through";
    target.style.backgroundColor ="lightgreen"
    target.style.backgroundImage = "url('./images/done.svg')" 
    tasklist.removeChild(target.parentElement);
    console.log(target.parentElement)
    tasklist.innerHTML += target.parentElement.outerHTML;

  }
  else{
    target.parentElement.querySelector("#task-name").style.color = "white";
    target.parentElement.querySelector("#task-name").style.textDecoration = "line-through";
    target.parentElement.querySelector("#task-name").style.textDecoration =
      "none";
    target.style.backgroundColor = "white";
    target.style.backgroundImage = "none"; 
  }
  localStorage.setItem("tasks", tasklist.innerHTML);

})
function setfocus(){
  inputTask.focus()
}
drawertoogle.addEventListener('click',()=>{
  if(!drawerin){
    document.querySelector('#drawer').style.right="0";
    drawertoogle.textContent = ">";
    drawerin=true;
    setTimeout(setfocus, 500);
  }
  else{
      document.querySelector("#drawer").style.right = "-25vw";
      drawerin = false;
    drawertoogle.textContent = "<";
  }
})
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && inputTask.value.length>0) {
    tasklist.innerHTML += `<li><div id="checkbox"></div><div id="task-name">${inputTask.value}</div>
            <button id="remove"></button>
            </li>`;
    inputTask.value = ""
  numberoftasks.innerHTML = `<h4>Tasks(${tasklist.children.length})</h4>`;
  localStorage.setItem("tasks", tasklist.innerHTML);
  }
  
});

document.querySelector('#clear').addEventListener('click', () => {
  // if(tasklist.children.length)
  
  if (
    tasklist.children.length && confirm("Are you sure you want to clear the list?")
  ){
    tasklist.innerHTML = "";
  numberoftasks.innerHTML = `<h4>Tasks(${tasklist.children.length})</h4>`;

  localStorage.setItem("tasks", tasklist.innerHTML);
  }
})

var remove = document.querySelector(".remove")
tasklist.addEventListener('click',(e) => {
  var target = e.target;
  if(target.id=="remove"){
    tasklist.removeChild(target.parentElement);
  localStorage.setItem("tasks", tasklist.innerHTML);
  numberoftasks.innerHTML = `<h4>Tasks(${tasklist.children.length})</h4>`;

  }
})

