var profileList = Backbone.Collection.extend({

	model: Profile,

	url: "http://142cdc76.ngrok.io/users/invite",

})

var slackList = Backbone.Collection.extend({

	model: Slack,

	url: "http://142cdc76.ngrok.io/projects/" + id +"/slack",

})

