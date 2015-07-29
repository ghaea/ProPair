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
		router.navigate("projects/" + auth + "/" + projectNumber, { trigger: true })
	},

	deleteProject: function() {
		if(this.model.attributes.creator_name === "ghaea"){
			this.$el.remove()
			this.model.destroy()
		}
		else { alert("Sorry! You did not create this project.")}
		
		router.navigate("dashboard/" + auth, { trigger: true })
	},

	slackButton: function() {
		console.log(auth)
		router.navigate("projects/" + auth + "/" + projectNumber + "/slack", { trigger: true })
	},

	sendButton: function() {
		console.log('sent', this.$('.slack-message').val())
		/*
		var newMessage = new newMessageList()

		newMessage.create({
			message: this.$('.slack-message').val()
		})*/
	},

	pairButton: function() {
		var newPair = new pairList() 

		newPair.create({
			project_id: projectNumber
		},
			{headers: {Authorization: auth}
		})

		console.log('pair request sent')
	},

	cancelButton: function() {
		router.navigate("projects/" + auth + "/" + projectNumber, { trigger: true })
	},

	template: Handlebars.compile( $("#project-template").html() )



})