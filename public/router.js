var Router = Backbone.Router.extend({

	routes: {
		"": "defaultRoute",
		"dashboard": "dashboardRoute",
		"profile": "profileRoute",
		"newProject": "newProjectRoute",
		"admin": "adminRoute",
		"projects/:id": "singleProjectRoute"
	},

	defaultRoute: function() {
		$('.view').hide()
		$(".page-container").show()
	},

	dashboardRoute: function() {

		$('.view').hide()
		$("#newProject-list").empty()
		$("#myProject-list").empty()
		$('.projects-container').show()
	// for project list
		var collection = new projectList()

		console.log(collection)

		collection.fetch({
			success: function(data, res) {
				_.each(collection, function(a, i) {
					var page = new ProjectView({
						model: collection.at(i)
					})

					var pageModel = page.model.attributes

					$("#newProject-list").append(page.$el)
				})
				
			},

			headers: {Authorization: "TOKEN"}
		})

	// for my project list
		var myProjects = new projectList()

		myProjects.fetch({
			success: function(data) {
				var page = new ProjectView({
					model: myProjects.at(1)
				})

				var pageModel = page.model.attributes

				$("#myProject-list").append(page.$el)

			},

			headers: {Authorization: "TOKEN"}
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

			headers: {Authorization: "TOKEN"}
		})
	},

	newProjectRoute: function() {
		$('.view').hide()
		$('.createProject-container').show()

		$('.saveProject-button').on('click', function() {
			console.log('click')
		
			var newProject = new projectList()

			newProject.create({
				title: $('.input-title').val(),
				description: $('.textarea-description').val(),
				creatorName: $('.input-creator').val(),
				required_skill_1: $('.js:checkbox:checked').val(),
				required_skill_2: $('.ruby:checkbox:checked').val(),
				required_skill_3: $('.swift:checkbox:checked').val(),
				deadline: $('.input-date').val(),	
			},
				{headers: {Authorization: "TOKEN"}
			})

			$('input').val("")
			$('.textarea-description').val("")

			router.navigate("dashboard", { trigger: true })

		})
	},

	singleProjectRoute: function() {
		$('.view').hide()
		$("#detailed-info").empty()
		$('.project-container').show()
		
		var project = new projectId()
		console.log(id, project)
		project.fetch({
			success: function(data) {
				var projectDetail = new ProjectView({
					model: project.at(0)
				})

				var projectModel = projectDetail.model.attributes

				$("#detailed-info").append(projectDetail.$el)
			},

			headers: {Authorization: "TOKEN"}
		})

		$('.slack-button').on("click", function() {
			var newSlack = new slackList()

			newSlack.create({
				user1: "ptnielsen55",
				user2: "ghaea"
			},
			{ headers: {Authorization: "TOKEN"}
			})
		})

	},

	adminRoute: function() {
		console.log("this is the adminRoute")
	}

})
