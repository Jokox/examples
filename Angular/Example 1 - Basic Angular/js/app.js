$.support.cors = true;

var app = angular.module('UsersApp', []).factory('Users', function ($http) {
	var BASE_URL = 'http://localhost:63152/api/user'; 
	
	return { 
		all: function () {
			console.log("Retrieving all users");
			
			return $http.get(BASE_URL).then(function (result) {
				return result.data;
			});
		}
	};
});

angular.module('UsersApp').controller('UsersCtrl', function ($scope, Users) {
	var usersListPromise = Users.all();
	usersListPromise.then(function (result) {  // this is only run after $http completes
		$scope.usersList = result;
	});
});
