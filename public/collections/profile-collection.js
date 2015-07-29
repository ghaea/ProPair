var profileList = Backbone.Collection.extend({

	model: Profile,

	url: "https://propair.herokuapp.com/users/invite",

})
/*
var slackList = Backbone.Collection.extend({

	model: Slack,

	url: "https://propair.herokuapp.com/projects/" + localStorage.projectId +"/slack",

})*/

var pairList = Backbone.Collection.extend({

	model: Pair,

	url: function(){
		return "https://propair.herokuapp.com/projects/request/" + projectNumber
	}

})



