
function addCloseButton(li) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7"); 
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  span.onclick = function () {
    let div = this.parentElement;
    div.style.display = "none";
  };
}
let myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
  addCloseButton(myNodelist[i]);
}

let list = document.querySelector("ul");
list.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  }
});

document.getElementById("addBtn").addEventListener("click", function () {
  let inputValue = document.getElementById("myInput").value.trim();

  
  if (inputValue === "") {
    alert("You must write something!");
    return;
  }

  let li = document.createElement("li");
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);

  addCloseButton(li);

  document.getElementById("myInput").value = "";
});














