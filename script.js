var input = document.querySelectorAll(".to-do-list input")[0];
var form = document.querySelectorAll(".to-do-list form")[0];
console.log(form)
var trashItem = document.querySelectorAll(".to-do-list .delete");
var ul = document.querySelectorAll(".to-do-list ul")[0];

//Add a new element

function addTask() {
    var div = document.createElement("div");
    var newItem = document.createElement("span");
    var textItem = document.createTextNode(input.value);
    var deleteItem = document.createElement("span");
    var textDeleteItem = document.createTextNode("x");

    deleteItem.classList.add("float-right", "delete");
    newItem.classList.add("item");
    newItem.appendChild(textItem);
    deleteItem.appendChild(textDeleteItem);
    div.appendChild(newItem);
    div.appendChild(deleteItem);

    ul.appendChild(div);
    input.value = "";
    input.focus();

}



form.addEventListener("submit", function (e) {
    e.preventDefault();
    addTask();
});

//mark or remove a element

function addLineThrough(item){
    item.classList.toggle("line-through");
}

function removeTask(item){
    if(confirm("Do you really want to exclude " + item.children[0].textContent + "?")){
        item.parentNode.removeChild(item);
    }
    
}


ul.addEventListener("click", function(e){
    if(e.target.nodeName === "SPAN" && e.target.classList.contains("item")){
        addLineThrough(e.target);
    }
    
    if(e.target.nodeName === "SPAN" && e.target.classList.contains("delete")){
       removeTask(e.target.parentNode); 
    }
});

