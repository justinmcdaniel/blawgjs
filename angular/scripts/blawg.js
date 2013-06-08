var app = angular.module('blawgApp', []);

app.factory('blawgPosts', function($http) {
  return {
    getPosts: function() {
      return $http.post('posts/posts.json', {});
    }
  }
});

app.controller("BlawgPostCtrl", function($scope, blawgPosts) {
  $scope.blawgPosts = [];
  $scope.handleSuccess = function(json) {
    $scope.blawgPosts = json.posts;
  }
  blawgPosts.getPosts().success($scope.handleSuccess);
});

app.directive("post", function() { 
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    template: '<div ng-include src="\'partials/post.html\'"></div>'
  }
});