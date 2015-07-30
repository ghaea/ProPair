var storage, auth
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

	dashboardRoute: function(_auth) {

		$('.view').hide()
		$("#newProject-list").empty()
		$("#myProject-list").empty()
		$('.projects-container').show()

		auth = _auth

	// for project list
		var collection = new projectList()
		console.log(collection)
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
			headers: {Authorization: auth}
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
			headers: {Authorization: auth}
		})
	},

	newestRoute: function(_auth) {
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
			headers: {Authorization: auth}
		})
	},

	profileRoute: function(_auth) {
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

			headers: {Authorization: auth}
		})
	},

	newProjectRoute: function(_auth) {
		$('.view').hide()
		$('.createProject-container').show()

		$('.saveProject-button').on('click', function() {	
			var newProject = new projectList()

			newProject.create({
				title: $('.input-title').val(),
				description: $('.textarea-description').val(),
				required_skill_1: $('.js:checkbox:checked').val(),
				required_skill_2: $('.ruby:checkbox:checked').val(),
				required_skill_3: $('.swift:checkbox:checked').val(),
				deadline: $('.input-date').val(),	
			},
				{headers: {Authorization: auth}
			})

			$('input').val("")
			$('.textarea-description').val("")

			router.navigate("dashboard/" + auth, { trigger: true })
		})
	},

	singleProjectRoute: function(_auth) {
		$('.view').hide()
		$("#detailed-info").empty()
		$('.project-container').show()
		
		var project = new projectId()

		project.fetch({
			success: function(data) {
				var projectDetail = new ProjectView({
					model: project.at(0)
				})

				var projectModel = projectDetail.model.attributes

				$("#detailed-info").append(projectDetail.$el)
			},

			headers: {Authorization: auth}
		})
	},

	slackRoute: function(_auth) {
		$('.slack-container').show()
		$('.slack-button').hide()
		$('.pair-button').hide()

		var messageHistory = new messageHistoryList()
		console.log('hello', messageHistory)
		messageHistory.fetch({
			success: function(data) {
				console.log(messageHistory)
				_.each(messageHistory, function(a, i) {
					var messageReceived = new MessageView({
						model: messageHistory.at(i)
					})

					var message = messageReceived.model.attributes

					$(".single-message").append(messageReceived.$el)
				})		
			},
			error: function() {
				console.log('error', arguments)
			}, 
			headers: {Authorization: auth}			
		})
	},

	adminRoute: function() {
		console.log("this is the adminRoute")
	}
})
