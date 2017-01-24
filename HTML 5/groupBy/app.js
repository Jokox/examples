'use strict';

var angularApp = angular.module('angularApp', ['ui.bootstrap', 'ui.router', 'mgcrea.ngStrap', 'angular.filter', 'ui.mask']);

angularApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    
	// ROUTING
	
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/partial-home.html'
        })
		
		// nested list with custom controller
		.state('searchMulti', {
			url: '/searchMulti',
			templateUrl: 'views/partial-search-multi.html'
		});
});

angularApp.controller('MainController', function($scope, FormService) { 
	$scope.searchForms = function (value) {
		FormService.form(value).then(
		function(data) {
			$scope.form = data.form_fields;
		},
		function(msg) {
			alert("Error");
		});
	};
	
	
	$scope.retrieveGroupDescription = function (index) {
		return index + 1 + ". Group: ";	
	};
 });