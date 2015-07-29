
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
		router.navigate("newProject", { trigger: true })
	})

	$('.signOut-button').on('click', function() {
		router.navigate("", { trigger: true })
	})

	$('.profile-button').on('click', function() {
		router.navigate("profile", { trigger: true })
	})

	$('.cancelProject-button').on('click', function() {
		router.navigate(localStorage.dashboardURL, { trigger: true })
	})

	$('.dashboard-button').on('click', function() {
		router.navigate(localStorage.dashboardURL , { trigger: true })
	})


	Backbone.history.start()
		
})