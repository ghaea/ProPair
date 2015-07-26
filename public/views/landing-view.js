var LandingView = Backbone.View.extend({

	events: {
		"click .signIn-button": "signIn",
		"click .signUp-button": "signUp",
		"click .about": "about"
	},

	initialize: function() {
		this.render
	},

	render: function() {
		console.log("render Landing Page")
	},

	signIn: function() {
		console.log("sign in view")
	},

	signUp: function() {
		console.log("register view")
	},

	about: function() {
		console.log("about view")
	}

	

})