var messageApp = angular.module('messageModule', []);

messageApp.controller('MessageCtrl',function($scope, $firebase){
	var ref = new Firebase("https://bubbletalk.firebaseio.com/messages");
	var sync = $firebase(ref)
	$scope.messages = sync.$asArray();
});

messageApp.directive('btMessage', function(){
	return {
		scope: true,
		restrict: 'E',
		replace: true,
		templateUrl: 'message.html',
		link: function($scope, iElm, iAttrs, controller) {
			var id = iAttrs.id;
			var child = iElm.children(1);
			console.log($scope.messages[id].color);
			iElm.css({
					  backgroundColor: $scope.messages[id].color,
					  top: $scope.messages[id].myY + 'px',
					  left: $scope.messages[id].myX + 'px'
					});
			/*child[1].css({borderBottom: "20px solid #379BFF"});REVISAR*/ 
		}
	};
});