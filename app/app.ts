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
		})
		.state('root.sample', {
			url: "/sample",
			template: '<sample/>',
		})
		;

});

import HomeDirective from './components/home/home'
app.directive(HomeDirective.directiveName, directiveFactory.GetFactoryFor<HomeDirective>(HomeDirective));

import SampleDirective from './components/sample/sample'
app.directive(SampleDirective.directiveName, directiveFactory.GetFactoryFor<SampleDirective>(SampleDirective));


export default app;