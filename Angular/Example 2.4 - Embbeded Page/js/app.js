$.support.cors = true;

// app.js
var routerApp = angular.module('routerApp', ['ui.router', 'ui.bootstrap']);

routerApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    
	// ROUTING
	
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/partial-home.html',
			data: {
				requireLogin: false
			}
        })
		
		// nested list with custom controller
		.state('home.list', {
			url: '/list',
			templateUrl: 'views/partial-home-list.html',
			controller: function($scope) {
				$scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
			}
		})

		// nested list with just some random string data
		.state('home.paragraph', {
			url: '/paragraph',
			templateUrl: 'views/partial-home-paragraph.html',
			controller: 'HomeParagraphCtrl'
		})
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
		.state('about', {
			url: '/about',
			views: {

				// the main template will be placed here (relatively named)
				'': { templateUrl: 'views/partial-about.html' },

				// the child views will be defined here (absolutely named)
				'columnOne@about': { 
					templateUrl: 'views/partial-about-carousel.html',
					controller: 'CarouselDemoCtrl'
				},

				// for column two, we'll define a separate controller 
				'columnTwo@about': { 
					templateUrl: 'views/table-data.html',
					controller: 'UsersCtrl'
				}
			},
			data: {
				requireLogin: false
			}
		})
		
		// CONFIDENTIAL VIEWS ========================================
        .state('confidential', {
            url: '/confidential',
			views: {
				// the main template will be placed here (relatively named)
				'': { templateUrl: 'views/partial-confidential.html' },

				// the child views will be defined here (absolutely named)
				'usersView@confidential': { 
					templateUrl: 'views/partial-confidential-users.html'
				}
			},
			data: {
				requireLogin: true
			}
        })
		
		// nested list with custom controller
		.state('confidential.usersList', {
			url: '/list',
			templateUrl: 'views/partial-confidential-users-list.html',
			controller: 'UsersCtrl'
		})
		
		// nested list with custom controller
		.state('confidential.usersCreate', {
			url: '/create',
			templateUrl: 'views/partial-confidential-users-create.html',
			controller: 'UsersCtrl'
		})
		
		// nested list with custom controller
		.state('login', {
			data: {
				requireLogin: true
			}
		});
});

routerApp.run(function ($rootScope, $state, $modalStack, loginModal) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
	
    var requireLogin = toState.data.requireLogin;

    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      event.preventDefault();

      loginModal()
        .then(function () {
			var isLogin = toState.name === "login";
			
			if(isLogin) {
				return $state.go('home');
			} else {
				return $state.go(toState.name, toParams);
			}
        })
        .catch(function () {
          return $state.go('home');
        });
    }
	
	$modalStack.dismissAll(); 
  });
});

routerApp.service('loginModal', function ($modal, $rootScope) {

  function assignCurrentUser (user) {
    $rootScope.currentUser = user;
    return user;
  }

  return function() {
  
    var instance = $modal.open({
      templateUrl: 'views/partial-modal-login.html',
      controller: 'LoginModalCtrl',
      controllerAs: 'LoginModalCtrl'
    })

    return instance.result.then(assignCurrentUser);
  };
});

routerApp.controller('LoginModalCtrl', function ($scope) {

	this.cancel = $scope.$dismiss;

	this.submit = function (username, password) {
		if(username === 'admin' && password === 'admin')
		{
			$scope.$close(username);
		}
	};
});





// let's define the scotch controller that we call up in the about state
routerApp.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});

routerApp.controller('indexController', function ($rootScope, $state) {
	$rootScope.loggedIn = function () {
		if($rootScope.currentUser === undefined) {
			return false;
		} else {
			return true;
		}
	};
	
	$rootScope.logout = function () {
		$rootScope.currentUser = undefined;
		$state.go('home');
	};
});


routerApp.factory('Users', function ($http) {
	var BASE_URL = 'http://localhost:63152/api/user'; 
	
	return { 
		all: function () {
			return $http.get(BASE_URL).then(function (result) {
				return result.data;
			});
		}, 
		create: function (user) {
			return $http.post(BASE_URL, user).then(function (result) {
				return result.data;
			});
		}, 
		update: function (user) {
			return $http.put(BASE_URL + '/' + user.ID, user).then(function (result) {
				return result.data;
			});
		}, 
		delete: function (id) {
			return $http.delete(BASE_URL + '/' + id).then(function (result) {
				return result.data;
			});
		}
	};
});

routerApp.controller('UsersCtrl', function ($scope, Users) {
	var usersListPromise = Users.all();
	
	usersListPromise.then(function (result) {  // this is only run after $http completes
		$scope.usersList = result;
	});
	
	$scope.create = function () {
		Users.create($scope.newUser).then(function (data) {
			$scope.usersList.push(data);
			$scope.newUser = null;
		});
	};

	$scope.delete = function (user) {
		return Users.delete(user.ID).then(function (data) {
			var index = $scope.usersList.indexOf(user);
			$scope.usersList.splice(index, 1);
		});
	};

	$scope.update = function (user) {
		Users.update(user).then(function (data) {
			$scope.activeUser = null;
		});
	};

	$scope.edit = function (user) {
		$scope.activeUser = user;
	};
	
	$scope.cancel = function () {
		$scope.activeUser = null;
	};
});


routerApp.controller('CarouselDemoCtrl', function ($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }
});


routerApp.controller('HomeParagraphCtrl', function ($scope, $modal) {
   $scope.modalWindow = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/partial-modal-view.html',
            controller: 'modalController',
			controllerAs: 'modalController'
        });
        modalInstance.result.then(
            //close
            function (result) {
                var a = result;
            },
            //dismiss
            function (result) {
                var a = result;
            });
    };
});

routerApp.controller('modalController', function ($scope) {

	this.cancel = $scope.$dismiss;

	this.ok = function () {
		$scope.$close();
	};
});