(function () {
	'use strict';

	angular.module('app.controllers')
		.controller('MainCtrl', function ($scope) {
			// now add http://www.ng-newsletter.com/posts/d3-on-angular.html into this
			// see https://gist.github.com/auser/6506865#file-d3-example1-js
			$scope.awesomeThings = [
				'one',
				'two',
				'fo-shizzle'
			];

			$scope.d3Data = [
				{name: "Chris", score:98},
				{name: "Rob", score:96},
				{name: "Michel", score: 48},
				{name: "Bokkie", score: 79}
			];
			$scope.d3OnClick = function(item){
				alert(item.name);
			};
		});

}());
