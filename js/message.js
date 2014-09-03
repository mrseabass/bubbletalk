var messageApp = angular.module('messageModule', []);

messageApp.controller('MessageCtrl',function($scope, $firebase){
	var ref = new Firebase("https://bubbletalk.firebaseio.com/messages");
	var sync = $firebase(ref)
	$scope.messages = sync.$asArray();
});

messageApp.directive('btMessage', function($document,$firebase){
	return {
		scope: {
			message:"=",
			color: "=",
			author:"=",
			created:"=",
			myX: "=",
			myY: "="
		},
		restrict: 'E',
		replace: true,
		templateUrl: 'message.html',
		link: function(scope, element, attr){
			console.log(scope);
			var startX = 0;
			var startY = 0;
			var ref = new Firebase("https://bubbletalk.firebaseio.com/messages/"+attr.id);
			var sync = $firebase(ref);

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
				sync.$update({myX: scope.myX, myY: scope.myY});
			}

			function mouseup(e){
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
				element.removeClass("dragged");
			}

		}
	};
});