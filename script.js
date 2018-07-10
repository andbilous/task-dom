let posts=[];
let filteredPosts=[];

let filterQuery={
  searchString:"",
  postsCount:10,
  tags:"",
  dateSort:null

};

function filter(posts,filterQuery){
  let i;
  for(i=0;i<posts.length;i++){
    while(i<=filterQuery.postsCount){
      filteredPosts[i]=posts[i];
    }
    if(posts[i].title.includes(filterQuery.searchString)){
      filteredPosts.push(posts[i]);
    }
  }

  return filteredPosts;
};

document.getElementById("search").addEventListener("keyup",function(){
  filterQuery.searchString=document.getElementById("search").value.toUpperCase();
});


function renderPosts(filteredPosts){
  console.log(JSON.filteredPosts[0]);
  for(let i = 0; i < filteredPosts.length; i++) {
    var listItem = document.createElement('li');
    listItem.innerHTML +=  '<span>'+filteredPosts[i].title+'</span><br>';
    listItem.innerHTML+='<img src='+filteredPosts[i].image+'><br>';
    listItem.innerHTML +='<span>'+filteredPosts[i].description + '</span><br>';
    listItem.innerHTML +='<span class="date">'+filteredPosts[i].createdAt+ '</span><br>';
    listItem.innerHTML +='<span>'+filteredPosts[i].tags+'</span><br>';
      //  console.log();
      myList.appendChild(listItem);
      let closeSign = document.createTextNode("\u00D7");
      let close = document.createElement("SPAN");
      close.className = "close";
      close.appendChild(closeSign);
      listItem.appendChild(close);
    }
  };




  function fetchPosts(){
    let post={}
    fetch('https://api.myjson.com/bins/152f9j')
    .then(function(response) { return response.json(); })
    .then(function(json) {
      for(let i = 0; i < json.data.length; i++) {
        post.title=json.data[i].title;
        post.image=json.data[i].image;
        post.description=json.data[i].description;
        post.dateCreated=json.data[i].createdAt;
        post.tags=json.data[i].tags;
        posts.push(post);
      }
      
    })
  };

  

  window.onscroll = function ()
  {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if(scrolled>3000){
      filterQuery.postsCount=20;
      renderPosts(filter(posts,filterQuery));
    }
    if(scrolled>6000){
      filterQuery.postsCount=30;
      renderPosts(filter(posts,filterQuery));
    }
    if(scrolled>9000){
      filterQuery.postsCount=40;
      renderPosts(filter(posts,filterQuery));
    }
    if(scrolled>12000){
      filterQuery.postsCount=50;
      renderPosts(filter(posts,filterQuery));
    }
  };
  fetchPosts();
  console.log();
  renderPosts(posts);

