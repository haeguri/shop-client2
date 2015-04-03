angular.module('radio.controller')

	.controller('ChannelCodyDetailCtrl', function(Channel, $stateParams, $scope, 
		$rootScope, $location, $state, $ionicSlideBoxDelegate, $ionicHistory, Like, Follow) {

		$scope.cody_detail = {};

		$scope.cody_detail.cody;
		$scope.cody_detail.channel;
		$scope.cody_detail.currentIndex;

		$('#radio-tabs').addClass('tabs-item-hide');
		$('ion-footer-bar').find('.fa-arrow-left').css('color', '#ffffff');

		Channel.getCody($stateParams.channel_id, $stateParams.cody_id).then(function(data) {
			$scope.cody_detail.cody = data;
			console.log("cody data", data);
			Channel.getChannel($stateParams.channel_id).then(function(data){
				$scope.cody_detail.channel = data;
				console.log("channel data", data);
			})
		});

		$scope.cody_detail.updateSlider = function () {
            $ionicSlideBoxDelegate.update();
        }

	  	$scope.slideChanged = function(index) {
	  		$scope.cody_detail.currentIndex = index;
		};

		$scope.cody_detail.channelFollow = function() {
			if($scope.cody_detail.channel.follow == false) {
				Follow.channelFollow($scope.cody_detail.channel.id, 'POST').then(function(data) {
					$scope.user.follow_channels = data;
					$scope.cody_detail.channel.follow = true;
				})
			}else{
				Follow.channelFollow($scope.cody_detail.channel.id, 'DELETE').then(function(data) {
					$scope.user.follow_channels = data;
					$scope.cody_detail.channel.follow = false;
				})
			}
		}

		$scope.cody_detail.codyLike = function(cody_id, $event) {
			if ($scope.cody_detail.cody.like == false) {
				Like.codyLike(cody_id, 'POST').then(function(response) {
					$scope.cody_detail.cody.like = true;
					$('#shop-detail-like').find('.fa.fa-heart.fa-2x').css('color', '#e60000');
				})
			} else {
				Like.codyLike(cody_id, 'DELETE').then(function(responnse) {
					$scope.cody_detail.cody.like = false;
					$('#shop-detail-like').find('.fa.fa-heart.fa-2x').css('color', '#444444');
				})
			}
		}

		$scope.cody_detail.openShopDetail = function(product) {

			var main_tabs_pattern = /\/tabs\/main\//.exec($location.absUrl());
			var channel_tabs_pattern = /\/tabs\/channel\//.exec($location.absUrl());

			if(main_tabs_pattern != null) {
				$location.url('/tabs/main/genders/'+product.tag.gender+'/tags/'+product.tag.id+'/products/'+product.id);
			}
			if(channel_tabs_pattern != null) {
				$location.url('/tabs/channel/genders/'+product.tag.gender+'/tags/'+product.tag.id+'/products/'+product.id);
			}
		}


		$scope.cody_detail.goBack = function() {
			$('#radio-tabs').removeClass('tabs-item-hide');
			$ionicHistory.goBack();
		}
	});

