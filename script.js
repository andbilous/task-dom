/*
  	document.getElementById("search").addEventListener("keyup",function(){
let ul=document.getElementById("posts");
  		initialiseDOM ();
	let input = document.getElementById("search");
  	let filter = input.value.toUpperCase();
  	
  	let li = ul.getElementsByTagName("li");
  	for(let i=0;i<li.length; i++){
  		let postDataTitle=  li[i].getElementsByTagName("span")[0];

  		 if (postDataTitle.innerHTML.toUpperCase().indexOf(filter) > -1) {
            		console.log('Matched')
        } else {
            li[i].parentNode.removeChild(li[i]);
        }
  	}

  	})
 
  
    let myList = document.querySelector('ul');*/








    /*let post={
      title:"",
      image:"",
      description:"",
      dateCreated:"",
      tags:""
    }*/







    let posts=[];
    let filteredPosts=[];

    let filterQuery={
      searchString:"",
      postsCount:10,
      tags:"",
      dateSort:null

    }

    function filter(posts,filterQuery){
      let filteredPosts;
      let i;
      for(i=0;i<posts.length;i++){
        while(i<=filterQuery.postsCount){
          filteredPosts[i]=posts[i];
        }
      }
      return filteredPosts;
    }
    document.getElementById("search").addEventListener("keyup",function(){
    filterQuery.searchString=document.getElementById("search").value.toUpperCase();
    
   // renderPosts(filter(posts,filterQuery));
     })


/*      
let ul=document.getElementById("posts");
      initialiseDOM ();
  let input = document.getElementById("search");
    let filter = input.value.toUpperCase();
    
    let li = ul.getElementsByTagName("li");
    for(let i=0;i<li.length; i++){
      let postDataTitle=  li[i].getElementsByTagName("span")[0];

       if (postDataTitle.innerHTML.toUpperCase().indexOf(filter) > -1) {
                console.log('Matched')
        } else {
            li[i].parentNode.removeChild(li[i]);
        }
    }*/

   
   function renderPosts(filteredPosts){
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
  }

    fetchPosts();
    window.onscroll = function(){

    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if(scrolled>3000){
      filterQuery.postsCount=20;
        filter(posts,filterQuery);
    }
    }
    console.log(posts);
    /*function initialiseDOM (){
    	fetch('https://api.myjson.com/bins/152f9j')
    .then(function(response) { return response.json(); })
    .then(function(json) {
      for(let i = 0; i < json.data.length; i++) {
        var listItem = document.createElement('li');
        listItem.innerHTML +=  '<span>'+json.data[i].title+'</span><br>';
        listItem.innerHTML+='<img src='+json.data[i].image+'><br>';
        listItem.innerHTML +='<span>'+json.data[i].description + '</span><br>';
        listItem.innerHTML +='<span class="date">'+json.data[i].createdAt+ '</span><br>';
        listItem.innerHTML +='<span>'+json.data[i].tags+'</span><br>';
      //  console.log();
        myList.appendChild(listItem);
        let closeSign = document.createTextNode("\u00D7");
        let close = document.createElement("SPAN");
        close.className = "close";
         close.appendChild(closeSign);
         listItem.appendChild(close);
      }
    });
    }*/
   /* 
    let dateSortSelect = document.getElementById("date-sort");
    dateSortSelect.addEventListener("change",function(){
    	if(dateSortSelect.value=="descending"){
	sortDescendingList();
    	}else
sortAscendingList();
    	
    	});
    function sortAscendingList() {
  let list, i, switching, b, shouldSwitch;
  list = document.getElementById("posts");
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("LI");
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (document.querySelectorAll("#posts>li .date")[i].textContent > document.querySelectorAll("#posts>li .date")[i+1].textContent) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      console.log(new Date(document.querySelectorAll("#posts>li .date")[i].textContent).getMilliseconds());
    }
  }
}

function sortDescendingList() {
	let list, i, switching, b, shouldSwitch;
  list = document.getElementById("posts");
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("LI");
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (document.querySelectorAll("#posts>li .date")[i].textContent < document.querySelectorAll("#posts>li .date")[i+1].textContent) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
}
}};
window.onload = function(){
	initialiseDOM ();
}



  */