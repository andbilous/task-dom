let posts=[];
let post={}


document.getElementById("tag-search").addEventListener("change",function(){

});



let datesortchoice=document.getElementById("date-sort");

datesortchoice.value=localStorage.getItem("sortingType");

datesortchoice.addEventListener("change",function(){
  localStorage.setItem('sortingType', datesortchoice.value);
  let mathchedPosts=[];
  mathchedPosts=posts;
  if(datesortchoice.value=="ascending"){
    mathchedPosts=  mathchedPosts.sort(function (a, b) {
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      return 0;
    });
  }
  else if(datesortchoice.value=="descending"){
    mathchedPosts=  mathchedPosts.sort(function (a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    });
  }
  renderPosts(mathchedPosts);
  
})

document.getElementById("search").addEventListener("keyup",function(){
  let searchString=document.getElementById("search").value;
  let mathchedPosts=[];
  for(let i=0;i<posts.length;i++){
    if(posts[i].title.indexOf(searchString)>=0){
      
      mathchedPosts.push(posts[i]);
    }
  }
  renderPosts(mathchedPosts);
});


window.onscroll=function(){
  let scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if(scrolled<6900){
    for(let i=10;i<posts.length;i++){
      document.querySelectorAll("#posts>li")[i].style.display = 'none';
    }
    return 0;
  }
  if(scrolled>=6900&&scrolled<14200){
    for(let i=20;i<posts.length;i++){
      document.querySelectorAll("#posts>li")[i].style.display = 'none';
    }
    for(let i=10;i<20;i++){
      document.querySelectorAll("#posts>li")[i].style.display ='block';
    }
    return 0;
  }

  if(scrolled>=14200&&scrolled<21400){
    for(let i=30;i<posts.length;i++){
      document.querySelectorAll("#posts>li")[i].style.display = 'none';
    }
    for(let i=10;i<30;i++){
      document.querySelectorAll("#posts>li")[i].style.display ='block';
    }
    return 0;
  }
  if(scrolled>=21400&&scrolled<28700){
    for(let i=40;i<posts.length;i++){
      document.querySelectorAll("#posts>li")[i].style.display = 'none';
    }
    for(let i=10;i<40;i++){
      document.querySelectorAll("#posts>li")[i].style.display ='block';
    }
    return 0;
  }
  if(scrolled>=28700){
    for(let i=10;i<50;i++){
      document.querySelectorAll("#posts>li")[i].style.display ='block';
    }
    return 0;
  }
}

function renderPosts(filteredPosts){
  let postsList=document.getElementById("posts");
  while(postsList.hasChildNodes()){
    postsList.removeChild(postsList.lastChild);
  }
  for (let i =0; i < filteredPosts.length; i++) {
    var listItem = document.createElement('li');
    listItem.innerHTML +=  '<span class="title">'+filteredPosts[i].title+'</span><br>';
    listItem.innerHTML +='<img src='+filteredPosts[i].image+'><br>';
    listItem.innerHTML +='<span class="postbody">'+filteredPosts[i].description + '</span><br>';
    listItem.innerHTML +='<span class="date">'+filteredPosts[i].createdAt+ '</span><br>';
    listItem.innerHTML +='<span class="tags">'+filteredPosts[i].tags+'</span><br>';
    postsList.appendChild(listItem);
    let closeSign = document.createTextNode("\u00D7");
    let close = document.createElement("button");
    close.className = "close";
    close.onclick=function(){
      close.parentNode.remove();
    }
    close.appendChild(closeSign);
    listItem.appendChild(close);
  }
};

function fetchPosts(){
  fetch('https://api.myjson.com/bins/152f9j')
  .then(function(response) { return response.json(); })
  .then(function(json) {
    posts=json.data;
    renderPosts(posts);
  })
}

fetchPosts();


