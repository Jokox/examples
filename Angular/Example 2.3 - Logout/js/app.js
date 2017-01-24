
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
			},
			data: {
				requireLogin: false
			}
		})

		// nested list with just some random string data
		.state('home.paragraph', {
			url: '/paragraph',
			template: 'I could sure use a drink right now.',
			data: {
				requireLogin: false
			}
		})
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
		.state('about', {
			url: '/about',
			views: {

				// the main template will be placed here (relatively named)
				'': { templateUrl: 'views/partial-about.html' },

				// the child views will be defined here (absolutely named)
				'columnOne@about': { template: 'Look I am a column!' },

				// for column two, we'll define a separate controller 
				'columnTwo@about': { 
					templateUrl: 'views/table-data.html',
					controller: 'scotchController'
				}
			},
			data: {
				requireLogin: false
			}
		})
		
		// CONFIDENTIAL VIEWS ========================================
        .state('confidential', {
            url: '/confidential',
            templateUrl: 'views/partial-confidential.html',
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
          return $state.go(toState.name, toParams);
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
      templateUrl: 'views/partial-login.html',
      controller: 'LoginModalCtrl',
      controllerAs: 'LoginModalCtrl'
    })

    return instance.result.then(assignCurrentUser);
  };
});

routerApp.controller('LoginModalCtrl', function ($scope) {

	this.cancel = $scope.$dismiss;

	this.submit = function (email, password) {
		if(email === '1@1' && password === '1')
		{
			$scope.$close('1');
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