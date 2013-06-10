var blawgApp = angular.module('blawgApp', []);

blawgApp.factory('blawgPosts', function($http) {
  return {
    getPosts: function() {
      return $http.post('posts/posts.json', {});
    }
  }
});

blawgApp.controller("BlawgPostCtrl", function($scope, blawgPosts) {
  $scope.blawgPosts = [];
  $scope.handleSuccess = function(json) {
    $scope.blawgPosts = json.posts;
  }

  //***        BEGIN COPIED CODE        ***//
  //taken from: http://jsfiddle.net/2ZzZB/56/
  $scope.currentPage = 0;
  $scope.pageSize = 3;

  $scope.numberOfPages = function() {
    return Math.ceil($scope.blawgPosts.length / $scope.pageSize);                
  }
  //***         END COPIED CODE         ***//

  // Init...
  blawgPosts.getPosts().success($scope.handleSuccess);
});

blawgApp.directive("post", function() { 
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    template: '<div ng-include src="\'partials/post.html\'"></div>'
  }
});

//***        BEGIN COPIED CODE        ***//
//taken from: http://jsfiddle.net/2ZzZB/56/

blawgApp.filter('startFrom', function() {
  return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
  }
});

//***         END COPIED CODE         ***//