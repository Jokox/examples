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
		});
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


function htmlbodyHeightUpdate(){
	var height3 = $( window ).height()
	var height1 = $('.nav').height()+50
	height2 = $('.main').height()
	if(height2 > height3){
		$('html').height(Math.max(height1,height3,height2)+10);
		$('body').height(Math.max(height1,height3,height2)+10);
	}
	else
	{
		$('html').height(Math.max(height1,height3,height2));
		$('body').height(Math.max(height1,height3,height2));
	}
	
}
$(document).ready(function () {
	htmlbodyHeightUpdate()
	$( window ).resize(function() {
		htmlbodyHeightUpdate()
	});
	$( window ).scroll(function() {
		height2 = $('.main').height()
		htmlbodyHeightUpdate()
	});
});