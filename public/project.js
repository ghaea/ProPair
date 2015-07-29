
var dispatcher = _.clone(Backbone.Events)
var router = new Router()

$(".view").hide()

$(document).on('ready', function() {

	$(".page-container").show()

	$(".signIn-button").on('click', function() {
		$(".signUp-window").hide()
		$(".login-window").show()
	})

	$(".signUp-button").on('click', function() {
		$(".login-window").hide()
		$(".signUp-window").show()
	})

	$(".close-button").on('click', function() {
		$("input").val("")
		$(".signUp-window").hide()
		$(".login-window").hide()
	})
// Start Register Button
	$(".register-button").on('click', function() {
		var newUser = new profileList()

		newUser.create({
			
			email: $('.email').val()
		})

		$('input').val("")
		$('.signUp-window').hide()
		$('.login-window').show()
		$('.first-login-message').show()
	})

	$('.signUp-input').on('keyup', function(evt){
		if(evt.keyCode === 13){
			var newUser = new profileList()

			newUser.create({
				
				email: $('.email').val()
			})

			$('input').val("")
			$('.signUp-window').hide()
			$('.login-window').show()
			$('.first-login-message').show()
		}
	})
// End Register Button
	$('.project-button').on('click', function() {
		router.navigate("newProject/" + auth, { trigger: true })
	})

	$('.signOut-button').on('click', function() {
		router.navigate("", { trigger: true })
	})

	$('.profile-button').on('click', function() {
		router.navigate("profile/" + auth, { trigger: true })
	})

	$('.cancelProject-button').on('click', function() {
		router.navigate("dashboard/" + auth, { trigger: true })
	})

	$('.dashboard-button').on('click', function() {
		router.navigate("dashboard/" + auth , { trigger: true })
	})

	$('.newest').on('click', function() {
		$("#newProject-list").empty()

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
	})




	Backbone.history.start()
		
})