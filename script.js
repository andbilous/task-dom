let posts=[];
let post={}
let filterQuery={
  searchString:"",
  postsCount:null,
  tags:"",
  dateSort:"descending"

};

function filter(posts,filterQuery)
{
  let i;
  let filteredPosts=[];
  if(filterQuery.postsCount==10){
      filteredPosts=posts.slice(0,10);
      console.log(filteredPosts);
  }
  if(filterQuery.postsCount==20){
      filteredPosts=posts.slice(11,20);

      console.log(filteredPosts);
  }
  if(filterQuery.postsCount==30){
   filteredPosts=posts.slice(21,30);
  }
  if(filterQuery.postsCount==40){
    filteredPosts=posts.slice(31,40);
  }
  if(filterQuery.postsCount==50){
filteredPosts=posts.slice(41,50);
  }

console.log(filteredPosts.length)
  return filteredPosts;
};

document.getElementById("tag-search").addEventListener("change",function(){

});
let datesortchoice=document.getElementById("date-sort");

datesortchoice.addEventListener("change",function(){
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


function renderPosts(filteredPosts){
let postsList=document.getElementById("posts");
    while(postsList.hasChildNodes()){
      postsList.removeChild(postsList.lastChild);
    }
  for (let i =0; i < filteredPosts.length; i++) {
    var listItem = document.createElement('li');
    listItem.innerHTML='<span>'+i+'</span><br>';
    listItem.innerHTML +=  '<span>'+filteredPosts[i].title+'</span><br>';
    listItem.innerHTML +='<img src='+filteredPosts[i].image+'><br>';
    listItem.innerHTML +='<span>'+filteredPosts[i].description + '</span><br>';
    listItem.innerHTML +='<span class="date">'+filteredPosts[i].createdAt+ '</span><br>';
    listItem.innerHTML +='<span>'+filteredPosts[i].tags+'</span><br>';
      postsList.appendChild(listItem);
      let closeSign = document.createTextNode("\u00D7");
      let close = document.createElement("SPAN");
      close.className = "close";
      close.appendChild(closeSign);
      listItem.appendChild(close);
    }
  };

 // let posts=[];
  function fetchPosts(){
    fetch('https://api.myjson.com/bins/152f9j')
    .then(function(response) { return response.json(); })
    .then(function(json) {
        posts=json.data;
       renderPosts(posts);
    })
  }

function searchByWord(searchWord,filteredPosts){

}
function searchByTags(tags,filteredPosts){

}





fetchPosts();

//  setTimeout(renderPosts(fetchPosts()),1000);

