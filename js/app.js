
var parseID = 'cG4cPGEYdfZJBRA3pjkJLJmCok3CdoaKhTpowlZR';
var parseRestKey = 'EC7irDDqHG9p8KS2CCxB9g5P4d9nK2pCLdLQLk3m';


$(document).ready(function(){

	getMessages();
	$('#send').click(function () {
		var username = $('input[name=username]').attr('value');
		var message = $('input[name=message]').attr('value');
		console.log(username);
		$.ajax({
			url: 'https://api.parse.com/1/classes/MessageBoard',
			headers: {
				'X-Parse-Application-Id': parseID,
				'X-Parse-REST-API-KEY': parseRestKey

			},
			contentType: 'application/json',
			dataType: 'json',
			processData: false,
			data: JSON.stringify({
				'username': username,
				'message': message
			}),
			type: 'POST',
			success: function() {
				console.log('sent');
				getMessages();
			},
			error: function() {
				console.log('error');
			}
		});
	});
});

function getMessages() {
	$.ajax({
		url: 'https://api.parse.com/1/classes/MessageBoard',
		headers: {
			'X-Parse-Application-Id': parseID,
			'X-Parse-REST-API-KEY': parseRestKey

		},
		contentType: 'application/json',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			console.log('get');
			updateView(data);
		},
		error: function() {
			console.log('error');
		}
	});
}

function updateView(messages) {
	var table = $('.table tbody');
	table.html('');
	$.each(messages.results, function(index, value) {
		var trEL = $(
			'<tr><td>' + value.username
			+ '</td><td>' + value.message
			+ '</td></tr>'
		);
		table.append(trEL);
	});
	console.log(messages);

}

