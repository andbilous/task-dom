function createNode(element) {
  return document.createElement(element);
}

function appendChildtoParent(parent, element) {
  return parent.appendChild(element);
}
function getDate(str) {
  const date = new Date(str)
  return `<span>created at: </span> ${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
function sortAscending(posts) {
  localStorage.setItem(sorting, 'ascending');
  const postsSorted = posts.sort((a, b) => {
    const dateA = new Date(a.createdAt), 
          dateB = new Date(b.createdAt);
    return dateB < dateA ? 1 : -1;
  }); 
  filteredPosts = postsSorted;
  renderPost(postsSorted);
}

function sortDescending(posts) {
  localStorage.setItem(sorting, 'descending');
  const postsSorted = posts.sort((a, b) => {
    const dateA = new Date(a.createdAt), 
          dateB = new Date(b.createdAt);
    return dateB > dateA ? 1 : -1;
  }); 
 filteredPosts = postsSorted;
  renderPost(postsSorted);
}

// sort by tags
let filterTags = [];
document.addEventListener('click', function (event) {
  const el = event.target;
  if(el.classList.contains('tag')) {
    el.classList.toggle('selected');
    filteredPosts = parseArray(posts);
    const tagIngex = filterTags.indexOf(el.id);
    if(tagIngex === -1) {
      filterTags.push(el.id);
    } else {
      filterTags.splice(tagIngex, 1);
    }
    console.warn(filterTags);
    if(filterTags.length > 0) {
    filterTags.map(tag => {
      filteredPosts.map(post => {
        if(post.tags.indexOf(tag) !== -1) {
          post.index = post.index + 1; 
        }
      });
    });
    const sortedTags = filteredPosts
    .sort((a, b) => {
      const dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
      if (b.index > a.index) {
        return 1;
      } else if (b.index === a.index) {
        return dateB > dateA ? 1 : -1;
      } else {
        return -1;
      }
    })
    .filter(post => post.index !== 0);
    filteredPosts = sortedTags;
    renderPost(sortedTags);
    } else {
    	filteredPosts = parseArray(posts);
    renderPost(filteredPosts);
    }
  }


  if(el.classList.contains('close')) {
    const id = el.id;
    const indexFiltered = filteredPosts.map(p => p.id).indexOf(Number(id));
    const index = posts.map(p => p.id).indexOf(Number(id));
    filteredPosts.splice(indexFiltered, 1);
    posts.splice(index, 1);
    console.log(posts, index, indexFiltered, id);
    renderPost(filteredPosts, limit);
  }
});

function getMarginFromBottom () {
  return Math.max(document.body.offsetHeight 
    - (window.pageYOffset + window.innerHeight), 0);
}

function scrollTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  const sort = localStorage.getItem(sorting);
  filteredPosts = parseArray(posts);
  limit = 10;
  sort === 'descending' ? sortDescending(filteredPosts) : sortAscending(filteredPosts);
  if(filterTags.length > 0) {
    filterTags.map(id => {
      document.getElementById(id).classList.remove('selected');
    })
  }
  filterTags = [];
}

function renderPost(posts, _limit = 10) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  if (_limit > posts.length) {
    _limit = posts.length;
  }
  for (let i = 0; i < _limit; i++) {
    let post = posts[i];
    let postTitle = createNode('h4'),
        postDescription = createNode('p'),
        postImage = createNode('img'),
        postTags = createNode('div'),
        postDate = createNode('p'),
        closePost = createNode('i');  
    closePost.id = post.id;
    closePost.innerHTML = '&times;';
    closePost.classList.add('close');
    postTitle.innerHTML = post.title;
    postDescription.innerHTML = post.description;
    postImage.src = post.image;
    postDate.innerHTML = getDate(post.createdAt);

    post.tags.map(function(tag) {
      let tagSpan = createNode('span');
      tagSpan.innerHTML = tag;
      appendChildtoParent(postTags, tagSpan);
    });
    postTags.classList.add('tags-wrp');
    postDate.classList.add('created-at');
    appendChildtoParent(div, postTitle);
    appendChildtoParent(div, closePost);
    appendChildtoParent(div, postImage);
    appendChildtoParent(div, postDescription);
    appendChildtoParent(div, postDate);
    appendChildtoParent(div, postTags);
    appendChildtoParent(postsWrapper, div);
  };
}


const tagSearch = document.getElementById('tag-search');
const search = document.getElementById('search');
const postsWrapper = document.getElementById('posts');
const url = 'https://api.myjson.com/bins/152f9j';
const sorting = 'sorting';
let limit = 10;
let div = createNode('div');
let posts = [];
let filteredPosts = [];

fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    posts = data.data.map((post, i) => ({...post, index: 0, id: i}));    
    filteredPosts = parseArray(posts);
    const sort = localStorage.getItem(sorting);
    const sortType = sort === null ? 'descending' : sort;
    sortType === 'descending' ? sortDescending(filteredPosts) : sortAscending(filteredPosts);
    let tags = [];
    posts.map(post => {
      post.tags.map(tag => {
        if(tags.indexOf(tag) === -1) {
          tags.push(tag);
        }
      })
    })
    tags.map(tag => {
      const tagBtn = createNode('button');
      tagBtn.innerHTML = tag;
      tagBtn.id = tag;
      tagBtn.classList.add('tag');
      appendChildtoParent(tagSearch, tagBtn);
    });
  })
  .catch(function(error) {
  console.log(JSON.stringify(error));
  });  


const dateSort =document.getElementById('dateSort');
dateSort.addEventListener("change",  function(){
 if(dateSort.value=="ascending"){
  sortAscending(filteredPosts)
}
else 
if(dateSort.value=="descending"){
sortDescending(filteredPosts) ;
}
});



search.addEventListener('input', function(event){
  filteredPosts = parseArray(posts).filter(post => post.title.includes(this.value)); 
  renderPost(filteredPosts);
});
document.addEventListener('scroll', function() {
  if(getMarginFromBottom() < 100){
    renderPost(filteredPosts, limit);
    limit = limit + 10;
  }
});
function parseArray(arr) {
  return JSON.parse(JSON.stringify(arr))
}