var dragApp = angular.module('dragModule',[]);

dragApp.directive('draggable',[ '$document',function($document){
	return function(scope, element, attr){
		var myScope = scope.messages[attr.id];
		var startX = 0;
		var startY = 0;

		element.on('mousedown',function(event){
			event.preventDefault();
			startX = event.pageX - myScope.myX;
			startY = event.pageY - myScope.myY;
			$document.on('mousemove', mousemove);
			$document.on('mouseup',mouseup);
			element.addClass("dragged");
		});

		function mousemove(e){
			myScope.myX = e.pageX - startX;
			myScope.myY = e.pageY - startY;
			element.css({
				top: myScope.myY + 'px',
				left: myScope.myX + 'px'
			});
		}

		function mouseup(e){
			$document.off('mousemove', mousemove);
			$document.off('mouseup', mouseup);
			element.removeClass("dragged");
			scope.messages.$save(myScope);
			console.log(scope.messages);
		}
	};
}]);