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
			},
			controller: 'DogsCtrl'
        })
		
		// nested list with custom controller
		.state('home.list', {
			url: '/list',
			templateUrl: 'views/partial-home-list.html'
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

routerApp.run(function ($rootScope, $state, loginModal) {

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


routerApp.controller('HomeParagraphCtrl', function ($scope, $modal, ngToast) {
	

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

routerApp.controller('DogsCtrl', function ($scope, $modal) {
  $scope.dogs = [
				{name: 'Bernese', image: 'data:image/jpeg;base64,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', race: 'Chiuauaua', notes: [
					{subject: 'Yo dogge', date: '2013-10-21'},
					{subject: 'u there?', date: '2013-10-22'}
				]}, 
				{name: 'Toti', image: 'data:image/jpeg;base64,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', race: 'Husky'}, 
				{name: 'Dog', image: 'http://www.metrodogstop.com/cms/wp-content/uploads/2013/05/cute-dog.jpg', race: 'GoldenRetriever'},
				{name: 'Dogge', image: 'http://animalia-life.com/data_images/dog/dog2.jpg', race: 'Chiuauaua', notes: [
					{subject: 'sup?', date: '2014-10-21'}
				]}, 
				{name: 'Puppy', image: 'http://animalia-life.com/data_images/dog/dog1.jpg', race: 'Husky'}, 
				{name: 'Cat', image: 'http://animalia-life.com/data_images/dog/dog5.jpg', race: 'SheCat'}
				];
				

	$scope.addNewDog = function() {
  
		var instance = $modal.open({
		  templateUrl: 'views/partial-modal-addDog.html',
		  controller: 'AddDogModalCtrl',
		  controllerAs: 'AddDogModalCtrl'
		})

		instance.result.then(
            //close
            function (result) {
				$scope.dogs.push(result);
            });
	 };
});


routerApp.controller('AddDogModalCtrl', function ($scope) {

	this.cancel = $scope.$dismiss;

	this.submit = function (name, race, image) {
		$scope.$close({name: name, race: race, image: image});
	};
});


routerApp.controller('modalController', function ($scope) {

	this.cancel = $scope.$dismiss;

	this.ok = function () {
		$scope.$close();
	};
});