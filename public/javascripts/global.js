var userListData = [];
var currentUserId = '';

$(document).ready(function(){

	populateTables();

	$('#btnLogin').on('click', loginUser);

	$('#btnRegister').on('click', addUser);

	$('#btnProf').on('click', displayUserInfo);

	$('#btnProf').on('click', displayBooksRead);

	$('#btnAddBook').on('click', addBook);

});

function populateTables(){

	var cfcTableContent = '';
	var svmTableContent = '';
	var studentBooks = 0;
	var mikeBooks = 0;
	var readCFC = [];

	$.getJSON( '/users/userlist', function( data ) {

    	userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(ind, v){
        	var userBooks = JSON.parse(v.books);
        	if(v.username == "mkang"){
        		mikeBooks = userBooks.length;
        	}
        	else{
        		studentBooks += userBooks.length;
        	}
        	for (var i = 0; i<userBooks.length; i++){
        		if(userBooks[i].title == 'Case For Christmas'){
        			readCFC.push(v.fullname);
        		}
        	}
        });
        svmTableContent += '<tr>';
        svmTableContent += '<td>'+ studentBooks / (userListData.length-1)  +'</td>';
        svmTableContent += '<td>' + mikeBooks + '</td>';
        svmTableContent += '</tr>';
        // Inject the whole content string into our existing HTML table
        $('#svmList table tbody').html(svmTableContent);
        readCFC.forEach(function(name){
        	cfcTableContent += '<tr>';
        	cfcTableContent += '<td>' + name + '</td>';
        	cfcTableContent += '</tr>';
        });
        $('#cfcList table tbody').html(cfcTableContent);
    });

};

function loginUser(event){
	event.preventDefault();
	var userName = $('#login input#loginUserName').val();
	var pass = $('#login input#loginPassword').val();
	var success = false;
	var hasPrompted = false;

	$.getJSON( '/users/userlist', function( data ) {
		userListData = data;

		$.each(data, function(i, item){
			if(item.username === userName && item.password === pass){
				currentUserId = item._id;
				window.location.href = "/home";
				success = true;
				return false;
			}
			else if(item.username === userName){
				window.alert("Incorrect Password");
				hasPrompted = true;
				return false;
			}
		});
		if(!success && !hasPrompted){
			window.alert("Incorrect User Name/Password combination");
			return false;
		}
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
            'gender': $('#register select#regGender').val(),
            'books': '[{"title" : "Case For Christmas", "author" : "Lee Strobel"},{"title" : "Mere Christianity", "author" : "C.S. Lewis"}]'
        };

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

	var user_index = 0;
	var currentUserObject;

	$.getJSON( '/users/userlist', function( data ) {
		userListData = data;

		$.each(data, function(index, val){
			if(val._id == currentUserId){
				currentUserObject = val;
			}
		})
	});

	// // Get Index of object based on id value
	// var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(currentUserId);
	//  // Get our User Object
	// var thisUserObject = userListData[arrayPosition];

	//Populate Info Box
	$('#userInfo #username').text(currentUserObject.username);
	$('#userInfo #userEmail').text(currentUserObject.email);
	$('#userInfo #userYear').text(currentUserObject.year);
	$('#userInfo #userGender').text(currentUserObject.gender);

	
};

function displayBooksRead(){

	// Empty content string
	var tableContent = '';

	// jQuery AJAX call for JSON
	$.getJSON( '/users/userlist', function( data ) {

		userListData = data;

		// For each item in our JSON, add a table row and cells to the content string
		for(var count = 0; count < userListData.length; count++){
			if(userListData[count]._id == currentUserId){
				var books = JSON.parse(userListData[count].books);
				for(var b = 0; b < books.length; b++){
					tableContent += '<tr>';
					tableContent += '<td>' + books[b].title + '</td>';
					tableContent += '<td>' + books[b].author + '</td>';
					tableContent += '</tr>';
				}
			}
		}

		// Inject the whole content string into our existing HTML table
		$('#bookTable table tbody').html(tableContent);

	});
};

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

		var newBookString = JSON.stringify(newBook);

		$.ajax({
			type: 'POST',
			data: newBookString,
			url: '/profile/addbook/' + $(this).attr('rel'),
			dataType: 'JSON'
		}).done(function(response){

			if(response.msg === ''){
				$('#addBook fieldset input').val('');
				displayBooksRead();
			}
			else{
				alert('Error: ' + response.msg);
			}
		});
	}
	else{
		alert('Please fill in all fields');
		return false;
	}
};

