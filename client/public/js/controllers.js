app.controller('myController', function($scope, myFactory, $http) {
  $scope.movie = {};
  $scope.edit = false;
  getMovies = function(url) {
    myFactory.getAll(url)
      .then(function(response){
        $scope.movies = response.data;
      });
  };
  getMovies('api/tatums');

//functions
  $scope.postMovie = function() {
    var payload = $scope.movie;
    myFactory.post('/api/tatums', payload)
      .then(function(response){
        $scope.movies.push(response.data);
        $scope.movie = {};
      });
  };

  $scope.deleteMovie = function() {
    myFactory.delete('/api/tatum/' + id)
      .then(function(response) {
        getMovies('/api/tatums');
      });
  };

  $scope.editMovie = function(id) {
    var payload = $scope.movieEdit;
    myFactory.put('/api/tatum/' + id, payload)
      .then(function(response){
        $scope.movieEdit.movie = '';
        $scope.movieEdit.year = '';
        $scope.movieEdit.chickflick = '';
        $scope.edit = false;
        getMovies('/api/tatums');
    });
  };

  $scope.getMovie = function(id) {
    myFactory.getSingle('/api/tatum/' + id)
      .then(function(response){
        $scope.movieEdit = response.data;
      });
    $scope.edit = true;
  };
});
