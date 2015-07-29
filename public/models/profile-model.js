var Profile = Backbone.Model.extend({

	defaults: {
		email: "Unknown"
	
	}
})

var Slack = Backbone.Model.extend({

	defaults: {
		user1: "Unknown",
		user2: "Unknown"
	}
})

var Pair = Backbone.Model.extend({
	defaults: {
		project_id: ""
	}
})