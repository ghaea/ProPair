var projectList = Backbone.Collection.extend({

	model: Project,

	url: "https://propair.herokuapp.com/projects",

	initialize: function() {

	}

})

var projectId = Backbone.Collection.extend({

	model: Project,

	url: function() {
		return "https://propair.herokuapp.com/projects/" + id
	}

})

var newProjectList = Backbone.Collection.extend({

	model: Project,

	url: "http://142cdc76.ngrok.io/users/1/projects",

	initialize: function() {

	}

})



