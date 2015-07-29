var projectList = Backbone.Collection.extend({

	model: Project,

	url: "https://propair.herokuapp.com/other_projects",

})

var myProjectList = Backbone.Collection.extend({

	model: Project,

	url: "https://propair.herokuapp.com/my_projects"

})

var projectId = Backbone.Collection.extend({

	model: Project,

	url: function() {
		return "https://propair.herokuapp.com/projects/" + projectNumber
	}

})

var newProjectList = Backbone.Collection.extend({

	model: Project,

	url: "https://propair.herokuapp.com/projects"

})

var newMessageList = Backbone.Collection.extend({
	model: Message,

	url: function() {
		return "https://propair.herokuapp.com/projects/" + projectNumber + "/chat"
	}
})

var messageList = Backbone.Collection.extend({
	model: MessageHistory,

	url: function() {
		return return "https://propair.herokuapp.com/projects/" + projectNumber + "/chat_history"
	}

})



