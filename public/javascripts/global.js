var userListData = [];
var currentUserId = '';

$(document).ready(function(){

	$('#btnLogin').on('click', loginUser);

	$('#btnRegister').on('click', addUser);

	$('#btnAddBook').on('click', addBook);

});

function loginUser(event){
	event.preventDefault();
	var userName = $('#login input#loginUserName').val();
	var pass = $('#login input#loginPassword').val();

	$.getJSON( '/users/userlist', function( data ) {
		userListData = data;

		$.each(data, function(i, item){
			if(item.username === userName && item.password === pass){
				currentUserId = item._id;
				window.location.href = "/home";
				return false;
			}
			else if(item.username === userName){
				window.alert("Incorrect Password");
				return false;
			}
			else{
				window.alert("Incorrect User Name/Password combination");
				return false;
			}
		});
	});
};

function addUser(event){

	event.preventDefault();

	var errorCount = 0;
	$('#register input').each(function(index, val){
		if($(this).val() === ''){
			errorCount++;
		}
	});
	$('#register select').each(function(index, val){
		if($(this).val() === null){
			errorCount++;
		}
	});

	if(errorCount === 0){
		var newUser = {
			'fullname': $('#register input#regFullName').val(),
			'username': $('#register input#regUserName').val(),
			'password': $('#register input#regPassword').val(),
			'email': $('#register input#regEmail').val(),
			'year': $('#register select#regYear').val(),
			'gender': $('#register select#regGender').val()
		}

		$.ajax({
			type: 'POST',
			data: newUser,
			url: '/users/registeruser',
			dataType: 'JSON'
		}).done(function(response){

			if(response.msg === ''){
				$('#register fieldset input').val('');
				populateTable();
			}
			else{
				alert('Error: ' + response.msg);
			}

		});

		window.location.href = "/home";

	}
	else{
		alert('Please fill in all fields');
		return false;
	}

};

function displayUserInfo(){
	event.preventDefault();

	//Populate Info Box
	$('#username').text(currentUserId.user);
	$('#userEmail').text(currentUserId.email);
	$('#userYear').text(currentUserId.year);
	$('#userGender').text(currentUserId.gender);
}

function displayBooksRead(){
	event.preventDefault();

	// Empty content string
	var tableContent = '';

	// jQuery AJAX call for JSON
	$.getJSON( '/profileInfo', function( data ) {

		userBookList = data;

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td>' + this.title + '</td>';
			tableContent += '<td>' + this.author + '</td>';
			tableContent += '</tr>';
		});

		// Inject the whole content string into our existing HTML table
		$('#bookTable table tbody').html(tableContent);

	});

}

function addBook(event){

	event.preventDefault();

	var errorCount = 0;
	$('#addBook input').each(function(index, val){
		if($(this).val() === ''){
			errorCount++;
		}
	});

	if(errorCount === 0){
		var newBook = {
			'title': $('#addBook input#bkTitle').val(),
			'author': $('#addBook input#bkAuthor').val(),
		}

		$.ajax({
			type: 'POST',
			data: newBook,
			url: '/profile/addbook',
			dataType: 'JSON'
		}).done(function(response){

			if(response.msg === ''){
				$('#register fieldset input').val('');
				populateTable();
			}
			else{
				alert('Error: ' + response.msg);
			}

		});

		window.location.href = "/home";

	}
	else{
		alert('Please fill in all fields');
		return false;
	}

};

