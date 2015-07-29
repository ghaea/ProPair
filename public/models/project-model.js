var Project = Backbone.Model.extend({

	defaults: {
		title: "Awesome Project Name",
		description: "My awesome project does this...",
		required_skill_1: "",
		required_skill_2: "",
		required_skill_3: "",
		status: "unknown",
		remote: "false",
		deadline: "never",
		active: "false",
		in_progress: "false" 
	},

	initialize: function() {
		
	}

})

var Message = Backbone.Model.extend({
	defaults: {
		message: ""
	}
})