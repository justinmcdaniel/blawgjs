var blawgPosts;

$.getJSON('posts/posts.json', function(json) {
  blawgPosts = json;
  
  $('#blog').append('<a class="blawg-display-all">Show all posts</a>');
  
  $.each(blawgPosts.posts, function() {
    displayPost(this);
  });
  
  $('.blawg-tag').click(function() {
    displayPostsWithTag($(this).data('blawg-tag'));
  });
  
  $('.blawg-display-all').click(function() {
    $('.blawg-post-wrapper').show();
  });
});


function displayPost(blawgPost) {
  var post = '<section class="blawg-post-wrapper" data-blawg-tag=' + blawgPost.tags + '>';
  post += '<span class="blawg-title">' + blawgPost.title + '</span>';
  post += '<span class="blawg-author">'
    + 'Posted '
    + blawgPost.timestamp
    + ' by '
    + blawgPost.author
    + ' in ';
    
  $.each(blawgPost.tags, function() {
    post += '<a class="blawg-tag" data-blawg-tag="' + this + '">' + this + '</a>, ';
  });

  post += '</span>';
  post += '<span class="blawg-post">' + blawgPost.post + '</span>';
  post += '</section>';

  $('#blog').append(post);
}


function displayPostsWithTag(tag) {
  //$('#blog').html('');
  //
  //$.each(blawgPosts.posts, function() {
  //  if(this.tags.indexOf(tag) !== -1) {
  //    displayPost(this);
  //  }
  //});
  
  
  $('.blawg-post-wrapper').each(function() {
    if($(this).data('blawg-tag').indexOf(tag) === -1) {
      $(this).hide();
    }
    else{
      $(this).show();
    }
  });
}
