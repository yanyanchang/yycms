var AccountView = Backbone.View.extend({
    el : '#account',
    events: {},
    initialize: function() {
		 if (sdk) {
            var acc_mod = sdk.getAccount(-1) ;
            var user_mod=sdk.getUserInfo();
            $('#account .accUserName').html(user_mod.userName);
            $('#account .accCode').text(user_mod.uid);
            $('#account .accMoney').text(acc_mod.amMarginRemain.toFixed(2));
			console.log(user_mod);
        }
    },
    render: function() {
    }
});
