var storage, auth
var email
var Router = Backbone.Router.extend({

	routes: {
		"": "defaultRoute",
		"dashboard/:auth": "dashboardRoute",
		"profile": "profileRoute",
		"newProject": "newProjectRoute",
		"admin": "adminRoute",
		"projects/:id": "singleProjectRoute",
		"projects/:id/slack": "slackRoute"
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

		localStorage.setItem("dashboardURL", window.location.hash)
		auth = localStorage.dashboardURL.split("/")
 

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

			headers: {Authorization: auth[1]}
		})

	// for my project list
		var myProjects = new projectList()
		myProjects.fetch({
			success: function(data) {
				_.each(myProjects, function(a, i){
					var creator = myProjects.models[i].attributes.creator_name
					if(creator === "ghaea"){
						var page = new ProjectView({
							model: myProjects.at(i)
						})
						var pageModel = page.model.attributes

						$("#myProject-list").append(page.$el)
					}
				})		
			},

			headers: {Authorization: auth[1]}
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

			headers: {Authorization: auth[1]}
		})
	},

	newProjectRoute: function() {
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
				{headers: {Authorization: auth[1]}
			})

			$('input').val("")
			$('.textarea-description').val("")

			router.navigate(localStorage.dashboardURL, { trigger: true })
		})
	},

	singleProjectRoute: function() {
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

			headers: {Authorization: auth[1]}
		})

	},

	slackRoute: function() {
		$('.slack-container').show()
		$('.slack-button').hide()
		$('.pair-button').hide()
	},

	adminRoute: function() {
		console.log("this is the adminRoute")
	}

})
