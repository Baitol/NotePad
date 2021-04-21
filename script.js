const list = document.getElementById('list');
const add = document.getElementById('add');
const del = document.getElementById('del');
const choose = document.getElementById('choose');
const delall = document.getElementById('delall')
let checkedBoxes = new Set();

add.addEventListener('click', addElem)

document.addEventListener('keydown', event => {
  if ((event.key).match(/Enter/)){
  addElem();
  }
})

del.addEventListener('click', function() {
  checkedBoxes.clear();
  filtreBoxes();
  removeElem();
})

document.addEventListener('keydown', event => {
  if ((event.key).match(/Delete/)){
    checkedBoxes.clear();
    filtreBoxes();
    removeElem();
    checkedBoxes = new Set();
  }
})

delall.addEventListener('click', function () {
    checkedBoxes.clear();
    ChooseAllList();
    removeElem();
})

choose.addEventListener('click', function() {
  checkedBoxes.clear();
  filtreBoxes();
  chooseText();

})

function chooseText() {
  if (checkedBoxes.size == 1) {
    //alert("ok");
    for (let item of checkedBoxes){
      let text = document.querySelector(`p .${item}`);
      document.getElementById('inputText').value = text.value;
    }
  }else if (checkedBoxes.size == 0) {
    alert("choose something")
  }else {
    alert("to much")
  }
}

function addElem() {
  if (document.getElementById('inputText').value == "") {
    alert("Input is Empty")
  } else{
  let randClass = makeClass();
  list.insertAdjacentHTML('beforeend', `<p class = '${randClass}'>
                          <input class ="${randClass}" type="checkbox" name="name"
                          value="${escapeHtml(document.getElementById('inputText').value)}">
                          ${escapeHtml(document.getElementById('inputText').value)}</p>`);
  document.getElementById('inputText').value = "";
  }
}

function filtreBoxes() {
  let elements = list.querySelectorAll('input[type=checkbox]');
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (element.checked) {
      checkedBoxes.add(element.className);
    }
  }
  //for (let value of checkedBoxes) alert(value);
}

function ChooseAllList() {
  let elements = list.querySelectorAll('input[type=checkbox]');
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    checkedBoxes.add(element.className);
  }
  //for (let value of checkedBoxes) alert(value);
}


function removeElem() {
  for (let value of checkedBoxes) {
    let element = list.querySelectorAll(`.${value}`);
    for (let variable of element) {

      variable.remove();
    }
  }
}

function makeClass() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}
