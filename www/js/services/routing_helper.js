angular.module('radio.service')
	.factory('RoutingHelper', function(RootUrl, RadioAuth, $http, $state, $rootScope) {
		var RoutingHelper = {
			'goDetailView':function(current_state, item_type, item_id) {
				var self = this;

				switch(current_state) {
                case '/#/main/':
                    $location.url('/main/brands/'+brand_id);
                    break; 
                case '/#/channel/':
                    $location.url('/channel/brands/'+brand_id);
                    break;
                case '/#/private/':
                    $location.url('/private/brands/'+brand_id);
                    break;
                case '/#/search/':
                    $location.url('/search/brands/'+brand_id);
                    break;
           		}
       		},
			'getQuery': function(args){
				var RoutingHelper = this;
				var params = args.params;
				return RoutingHelper.request({
					'extra_url':'/search',
					'params':params
				}).then(function(response) {
					return response.data;
				});
			}
		};

		return RoutingHelper;
	})