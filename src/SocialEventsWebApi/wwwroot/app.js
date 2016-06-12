!function(){"use strict";var a=angular.module("SocialEventsApp",["ngRoute","socialEventsService"]);a.config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"partials/events.html",controller:"socialEventsController"}).when("/events/add",{templateUrl:"partials/add.html",controller:"socialEventsAddController"}).when("/events/edit/:id",{templateUrl:"partials/edit.html",controller:"socialEventsEditController"}).when("/events/delete/:id",{templateUrl:"partials/delete.html",controller:"socialEventsDeleteController"}).otherwise({redirectTo:"/"}),window.history&&window.history.pushState&&b.html5Mode({enabled:!0,requireBase:!1})}])}(),function(){"use strict";function a(a,b){a.socialEvents=b.query()}function b(a,b){a.validationErrors=[];var c=b.data;if(c)for(var d in c){var e=c[d][0];a.validationErrors.push(e)}}function c(a){var b=new Date(a.socialEvent.CreationDate),c=new Date(a.socialEvent.EventDate),d=b.getTime()+6e4*b.getTimezoneOffset(),e=c.getTime()+6e4*c.getTimezoneOffset();a.socialEvent.CreationDate=new Date(d),a.socialEvent.EventDate=new Date(e)}function d(a,c,d){a.socialEvent=new c,a.addEvent=function(){a.socialEvent.$save(function(){a.socialEvent.CreationDate=new Date(a.socialEvent.CreationDate),a.socialEvent.EventDate=new Date(a.socialEvent.EventDate),d.path("/")},function(c){console.log("Got an error back from the server"),b(a,c)})}}function e(a,b,d,e){a.socialEvent=b.get({id:e.id},function(){c(a)}),a.editEvent=function(){a.socialEvent.$update(function(){a.socialEvent.CreationDate=new Date(a.socialEvent.CreationDate),a.socialEvent.EventDate=new Date(a.socialEvent.EventDate),d.path("/")})},a.cancelEdit=function(){d.path("/")}}function f(a,b,c,d){a.socialEvent=b.get({id:d.id}),a.deleteEvent=function(){a.socialEvent.$remove(function(){c.path("/")})}}var g=angular.module("SocialEventsApp");g.controller("socialEventsController",a).controller("socialEventsAddController",d).controller("socialEventsEditController",e).controller("socialEventsDeleteController",f),a.$inject=["$scope","socialEvents","$sce"],g.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),d.$inject=["$scope","socialEvents","$location"],e.$inject=["$scope","socialEvents","$location","$routeParams"],f.$inject=["$scope","socialEvents","$location","$routeParams"]}(),function(){"use strict";var a=angular.module("socialEventsService",["ngResource"]);a.factory("socialEvents",["$resource",function(a){return a("/api/socialEvents/:id",{id:"@Id"},{update:{method:"PUT"}})}])}();