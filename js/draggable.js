var dragApp = angular.module('dragModule',[]);

dragApp.directive('draggable',['$document',function($document){
	return {
		scope: false,
		link: function(scope, element, attr){
			console.log(scope);
			var startX = 0;
			var startY = 0;

			element.on('mousedown',function(event){
				event.preventDefault();
				startX = event.pageX - scope.myX;
				startY = event.pageY - scope.myY;
				$document.on('mousemove', mousemove);
				$document.on('mouseup',mouseup);
				element.addClass("dragged");
			});

			function mousemove(e){
				scope.myX = e.pageX - startX;
				scope.myY = e.pageY - startY;
				element.css({
					top: scope.myY + 'px',
					left: scope.myX + 'px'
				});
				scope.$save(scope.myX);
			}

			function mouseup(e){
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
				element.removeClass("dragged");
				console.log(scope.messages);
			}

		}
	};
}]);

dragApp.directive('moving', ['$scope', function($scope){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, iElm, iAttrs, controller) {
			
		}
	};
}]);