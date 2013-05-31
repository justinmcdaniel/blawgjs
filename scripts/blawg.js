var blawgPosts;

jQuery.fn.reverse = [].reverse;

$.getJSON('posts/posts.json', function(json) {
  blawgPosts = json;
  
  $('#blawg').append('<a class="blawg-display-all">Show all posts</a>');
  
  var page = 0
  $(blawgPosts.posts).reverse().each(function() {
    displayPost(this, Math.floor(page++ / 3) + 1);
  });
  
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
