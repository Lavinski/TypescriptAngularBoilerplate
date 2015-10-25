'use strict';

import 'angular'
import 'angular-ui-router'

import directiveFactory from './directiveFactory'

var app = angular.module("application", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('root', {
			abstract: true,
			template: '<ui-view/>'
		})
		.state('root.home', {
			url: "/",
			template: '<home/>',
		});

});

import HomeDirective from './components/home/home'
app.directive(HomeDirective.directiveName, directiveFactory.GetFactoryFor<HomeDirective>(HomeDirective));

export default app;