var projectList = Backbone.Collection.extend({

	model: Project,

	url: "https://propair.herokuapp.com/projects",

	initialize: function() {

	}

})

var projectId = Backbone.Collection.extend({

	model: Project,

	url: function() {
		return "https://propair.herokuapp.com/projects/" + localStorage.projectId
	}

})

var newProjectList = Backbone.Collection.extend({

	model: Project,

	url: "https://propair.herokuapp.com/users/1/projects",

	initialize: function() {

	}

})

var newMessageList = Backbone.Collection.extend({
	model: Message,

	url: function() {
		return "https://propair.herokuapp.com/projects/" + localStorage.projectId + "/chat"
	}
})



