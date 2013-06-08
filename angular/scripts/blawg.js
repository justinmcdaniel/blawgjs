var BlawgPostCtrl= function($scope) {
  var self = $scope;

  self.posts = [];
  self.currentPageIndex = 0;
  self.postsPerPage = 3;
  self.filter = { page: 1 };

  self.loadPosts = function() {
    $.getJSON('posts/posts.json', function(json) {
      self.posts = json.posts.reverse();
      
      $(self.posts).each(function(i){
        var post = this;
        post.csvTags = post.tags.join(",");
      });

      self.$apply();
    });
  }

  self.pageCount = function() {
    return (self.posts.length / self.postsPerPage) + 1;
  }

  self.pageIndices = function() {
    var indices = [];
    for (var i = 1; i <= self.pageCount(); ++i) {
      indices.push(i);
    }
    return indices;
  }

  self.showPage = function(pageNumber) {
    self.filter.page = pageNumber;
  }

  self.displayedPosts = function() {
    if (self.filter.page == 0) { // 0 means "all"
      return self.posts
    } else { // expected to be a valid page number
      var posts = [];
      $(self.posts).each(function(i) {
        var pageIndex = Math.floor((i / self.postsPerPage) + 1);
        if (pageIndex == self.filter.page) {
          posts.push(self.posts[i]);
        }
      });
      return posts;
    }
  }


  // Load data.
  self.loadPosts();
}


/*
function old_stuff_to_delete(json) {

  
  var pagination = '<section class="blawg-pagination">';
  for(var i = 0; i < page; i += 3) {
    var p = Math.floor(i / 3) + 1;
    pagination += '<a class="blawg-tag" data-blawg-tag="blawg-page-' + p + '">' + p + '</a>';
  }
  pagination += '</section>';
  $('#blawg').append(pagination);
  
  $('.blawg-tag').click(function() {
    displayPostsWithTag($(this).data('blawg-tag'));
  });
  
  $('.blawg-display-all').click(function() {
    $('.blawg-post-wrapper').show();
  });
  
  displayPostsWithTag('blawg-page-1');
});


function displayPost(blawgPost, page) {
  var post = '<section class="blawg-post-wrapper" data-blawg-tag=' + blawgPost.tags + ',blawg-page-' + page + '>';
  post += '<span class="blawg-title">' + blawgPost.title + '</span>';
  post += '<span class="blawg-author">'
    + 'Posted '
    + blawgPost.timestamp
    + ' by '
    + blawgPost.author
    + ' in ';
    
  $.each(blawgPost.tags, function(i) {
    post += '<a class="blawg-tag" data-blawg-tag="' + this + '">' + this + '</a>';
    
    if(i !== blawgPost.tags.length - 1) {
      post += ', ';
    }
  });

  post += '</span>';
  post += '<span class="blawg-post">' + blawgPost.post + '</span>';
  post += '</section>';

  $('#blawg').append(post);
}


function displayPostsWithTag(tag) {
  $('.blawg-post-wrapper').each(function() {
    if($(this).data('blawg-tag').indexOf(tag) === -1) {
      $(this).hide();
    }
    else{
      $(this).show();
    }
  });
}
*/