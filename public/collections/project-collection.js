var projectList = Backbone.Collection.extend({

	model: Project,

	url: "https://propair.herokuapp.com/other_projects",

	initialize: function() {

	}

})

var projectId = Backbone.Collection.extend({

	model: Project,

	url: function() {
		return "https://propair.herokuapp.com/projects/" + projectNumber
	}

})

var newProjectList = Backbone.Collection.extend({

	model: Project,

	url: "https://propair.herokuapp.com/projects",

	initialize: function() {

	}

})

var myProjectList = Backbone.Collection.extend({

	model: Project,

	url: "https://propair.herokuapp.com/my_projects",

	initialize: function() {

	}

})

var newMessageList = Backbone.Collection.extend({
	model: Message,

	url: function() {
		return "https://propair.herokuapp.com/projects/" + projectNumber + "/chat"
	}
})



