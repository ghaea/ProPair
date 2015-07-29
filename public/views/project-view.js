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
		localStorage.setItem("projectId", this.model.id)
		router.navigate("projects/" + localStorage.projectId, { trigger: true })
	},

	deleteProject: function() {
		console.log(this.model.attributes)
		if(this.model.attributes.creator_name === "ghaea"){
			this.$el.remove()
			this.model.destroy()
		}
		else { alert("Sorry! You did not create this project.")}
		
		router.navigate(localStorage.dashboardURL, { trigger: true })
	},

	slackButton: function() {
		router.navigate("projects/" + localStorage.projectId + "/slack", { trigger: true })
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
		projectNumbr = this.model.id
		console.log("pair request sent")
		var newPair = new pairList() 

		newPair.create({
			project_id: localStorage.projectId
		},
			{headers: {Authorization: auth[1]}
		})
	},

	cancelButton: function() {
		router.navigate("projects/" + localStorage.projectId, { trigger: true })
	},

	template: Handlebars.compile( $("#project-template").html() )



})