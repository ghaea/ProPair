var id, projectNumber

var ProjectView = Backbone.View.extend({

	className: "projectView",

	events: {
		"click .projectName": "projectDetail",
		"click .delete": "deleteProject",
		"click .slack-button": "slackButton",
		"click .send-button": "sendButton",
		"click .pair-button": "pairButton",
		"click .cancel-button": "cancelButton"
	},

	initialize: function(){
		this.render()
	},

	render: function() {

		var attrs = this.model.attributes

		attrs.deadline = moment(attrs.deadline).fromNow()

		var htmlString = this.template(attrs)
		this.$el.html(htmlString)

	},

	projectDetail: function() {
		projectNumber = this.model.id
		router.navigate("projects/" + authToken + "/" + projectNumber, { trigger: true })
	},

	deleteProject: function() {
		this.$el.remove()
		this.model.destroy()

		
		router.navigate(authToken, { trigger: true })
	},

	slackButton: function() {
		router.navigate("projects/" + authToken + "/" + projectNumber + "/slack", { trigger: true })
	},

	sendButton: function() {
		
		var newMessage = new newMessageList()

		newMessage.create({
			text: this.$('.slack-message').val()
		},
			{headers: {Authorization: authToken}
		})

		this.$('.slack-message').val("")
		fetch()
	},

	pairButton: function() {
		projectNumbr = this.model.id
		console.log("pair request sent")
		var newPair = new pairList() 

		newPair.create({
			project_id: projectNumber
		},
			{headers: {Authorization: authToken}
		})
	},

	cancelButton: function() {
		router.navigate("projects/" + authToken + "/" + projectNumber, { trigger: true })
	},

	template: Handlebars.compile( $("#project-template").html() )



})