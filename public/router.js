var storage, authToken
var email
var Router = Backbone.Router.extend({

	routes: {
		"": "defaultRoute",
		"dashboard/:auth": "dashboardRoute",
		"dashboard/:auth/newest": "newestRoute",
		"profile/:auth": "profileRoute",
		"newProject/:auth": "newProjectRoute",
		"admin": "adminRoute",
		"projects/:auth/:id": "singleProjectRoute",
		"projects/:auth/:id/slack": "slackRoute"
	},

	defaultRoute: function() {
		$('.view').hide()
		$(".page-container").show()
	},

	dashboardRoute: function(auth) {

		$('.view').hide()
		$("#newProject-list").empty()
		$("#myProject-list").empty()
		$('.projects-container').show()

		authToken = auth

	// for project list
		var collection = new projectList()

		collection.fetch({
			success: function(data) {
				_.each(collection, function(a, i) {
					var page = new ProjectView({
						model: collection.at(i)
					})

					var pageModel = page.model.attributes

					$("#newProject-list").append(page.$el)
				})				
			},
			headers: {Authorization: authToken}
		})

	// for my project list
		var myProjects = new myProjectList()
		myProjects.fetch({
			success: function(data) {
				_.each(myProjects, function(a, i){
					var page = new ProjectView({
						model: myProjects.at(i)
					})
					var pageModel = page.model.attributes

					$("#myProject-list").append(page.$el)					
				})		
			},
			headers: {Authorization: authToken}
		})
	},

	newestRoute: function() {
		$("#newProject-list").empty()
		$('.newest').hide()
		$('.oldest').show()

		var collection = new projectList()
		
		collection.fetch({
			success: function(data) {
				_.each(collection, function(a, i) {
					var page = new ProjectView({
						model: collection.at(i)
					})
					var pageModel = page.model.attributes
					$("#newProject-list").prepend(page.$el)
				})				
			},
			headers: {Authorization: authToken}
		})
	},

	profileRoute: function() {
		$('.view').hide()
		$('.profile-container').show()

		var collection = new profileList()

		collection.fetch({
			success: function(data) {
				var user = new profileView({
					model: collection.at(0)
				})

				var userModel = user.model.attributes

				$("#userInfo-list").append(user.$el)
			},

			headers: {Authorization: authToken}
		})
	},

	newProjectRoute: function() {
		$('.view').hide()
		$('.createProject-container').show()

		$('.saveProject-button').on('click', function() {	
			var newProject = new newProjectList()
			console.log('new')
			newProject.create({
				title: $('.input-title').val(),
				description: $('.textarea-description').val(),
				required_skill_1: $('.js:checkbox:checked').val(),
				required_skill_2: $('.ruby:checkbox:checked').val(),
				required_skill_3: $('.swift:checkbox:checked').val(),
				deadline: $('.input-date').val(),	
			},
				{headers: {Authorization: authToken}
			})

			$('input').val("")
			$('.textarea-description').val("")

			router.navigate("dashboard/" + authToken, { trigger: true })
		})
	},

	singleProjectRoute: function(auth, id) {
		$('.view').hide()
		$("#detailed-info").empty()
		$('.project-container').show()
		console.log(arguments)
		var project = new projectId()

		project.fetch({
			success: function(data) {
				var projectDetail = new ProjectView({
					model: project.at(0)
				})

				var projectModel = projectDetail.model.attributes

				$("#detailed-info").append(projectDetail.$el)
			},

			headers: {Authorization: authToken}
		})
	},

	slackRoute: function(auth, id) {
		$('.slack-container').show()
		$('.slack-button').hide()
		$('.pair-button').hide()

		var messageHistory = new messageHistoryList()

		var fetch = function() {
			messageHistory.fetch({
				success: function(data) {

					_.each(messageHistory, function(a, i) {

						var messages = messageHistory.models[0].attributes.messages

						_.each(messages, function(a, i) {
							var messageReceived = new MessageView({
								model: messages[i]
							})
							$(".single-message").prepend(messageReceived.$el)
						})
					})		
				},
				error: function() {
					console.log('error', arguments)
				}, 
				headers: {Authorization: authToken}			
			})
		}
		setInterval(fetch, 50000)
	},

	adminRoute: function() {
		console.log("this is the adminRoute")
	}
})
