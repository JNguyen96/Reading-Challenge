var userListData = [];

$(document).ready(function(){

	populateTables();

	displayUserInfo();

	$('#btnLogin').on('click', loginUser);

	$('#btnRegister').on('click', addUser);

	$('#btnHome').on('click',goHome);

	$('#btnProf').on('click',goToProfile);

	$('#btnAddBook').on('click', addBook);

	$('#btnLogout').on('click',logoutUser);

});

function populateTables(){

	var cfcTableContent = '';
	var svmTableContent = '';
	var studentBooks = 0;
	var mikeBooks = 0;
	var readCFC = [];
	var fb = 0;
	var numFB = 0;
	var fs = 0;
	var numFS = 0;
	var sob = 0;
	var numSOB = 0;
	var sos = 0;
	var numSOS = 0;
	var jb = 0;
	var numJB = 0;
	var js = 0;
	var numJS = 0;
	var sb = 0;
	var numSB = 0;
	var ss = 0;
	var numSS = 0;
	// TO ADD POST GRADS TO BAR GRAPH
	// var pgb = 0;
	// var numPGB = 0;
	// var pgs = 0;
	// var numPGS = 0;
	var currentUserObject;
	var numStudents = 0;

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
        		numStudents += 1;
        	}
        	for (var i = 0; i<userBooks.length; i++){
        		if(userBooks[i].title.toLowerCase() == 'case for christmas'){
        			readCFC.push(v.fullname);
        		}
        	}
        	if(v.year == 'Freshmen' && v.gender == 'Male'){
        		fb += userBooks.length;
        		numFB += 1;
        	}
        	else if(v.year == 'Freshmen' && v.gender == 'Female'){
        		fs += userBooks.length;
        		numFS += 1;
        	}
        	else if(v.year == 'Sophomore' && v.gender == 'Male'){
        		sob += userBooks.length;
        		numSOB += 1;
        	}
        	else if(v.year == 'Sophomore' && v.gender == 'Female'){
        		sos += userBooks.length;
        		numSOS += 1;
        	}
        	else if(v.year == 'Junior' && v.gender == 'Male'){
        		jb += userBooks.length;
        		numJB += 1;
        	}
        	else if(v.year == 'Junior' && v.gender == 'Female'){
        		js += userBooks.length;
        		numJS += 1;
        	}
        	else if(v.year == 'Senior' && v.gender == 'Male'){
        		sb += userBooks.length;
        		numSB += 1;
        	}
        	else if(v.year == 'Senior' && v.gender == 'Female'){
        		ss += userBooks.length;
        		numSS += 1;
        	}
        	// TO ADD POST GRADS TO BAR GRAPH
        	// else if(v.year == 'Post-Grad' && v.gender == 'Male'){
        	// 	pgb += userBooks.length;
        	// 	numPGB += 1;
        	// }
        	// else if(v.year == 'Post-Grad' && v.gender == 'Female'){
        	// 	pgs += userBooks.length;
        	// 	numPGS += 1;
        	// }
        });
        svmTableContent += '<tr>';
        svmTableContent += '<td>'+ (Math.round((studentBooks / (numStudents)) * 100) / 100) +'</td>';
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
        if(numFB != 0)
        	$('#froshB').text((fb/numFB));
        else
        	$('#froshB').text(0);
        if(numFS != 0)
        	$('#froshS').text(fs/numFS);
        else
        	$('#froshS').text(0);
        if(numSOB != 0)
        	$('#sophB').text(sob/numSOB);
        else
        	$('#sophB').text(0);
        if(numSOS != 0)
        	$('#sophS').text(sos/numSOS);
        else
        	$('#sophS').text(0);
        if(numJB != 0)
        	$('#juniorB').text(jb/numJB);
        else
        	$('#juniorB').text(0);
        if(numJS != 0)
        	$('#juniorS').text(js/numJS);
        else
        	$('#juniorS').text(0);
        if(numSB != 0)
        	$('#seniorB').text(sb/numSB);
        else
        	$('#seniorB').text(0);
        if(numSS != 0)
        	$('#seniorS').text(ss/numSS);
        else
        	$('#seniorS').text(0);
        // TO ADD POST GRADS TO BAR GRAPH
        // if(numPGB != 0)
        // 	$('#postgradB').text(pgb/numPGB);
        // else
        // 	$('#postgradB').text(0);
        // if(numSS != 0)
        // 	$('#postgradS').text(pgs/numPGS);
        // else
        // 	$('#postgradS').text(0);
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
				window.location.href = "/users/profile/" + item._id;
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

function logoutUser(event){
	event.preventDefault();

	window.location.href = "/";

}

function goHome(event){
	event.preventDefault();
	
	var userId = $('#currId').attr('rel');
	window.location.href = "/home/" + userId;
}

function goToProfile(event){
	event.preventDefault();

	var userId = $('#currId').attr('rel');
	window.location.href = "/users/profile/" + userId;

}

function addUser(event){

	event.preventDefault();

	var uniqueName = true;
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

	for(var i = 0; i < userListData.length; i++){
		if($('#register input#regUserName').val() == userListData[i].username){
			window.alert('This username has been taken!');
			uniqueName = false
			return false;
		}
	}
	if($('#register input#regPassword').val().length < 6){
		window.alert('Password must be at least 6 characters long.');
		return false;
	}
	else if(errorCount === 0 && uniqueName){
		var newUser = {
			'fullname': $('#register input#regFullName').val(),
            'username': $('#register input#regUserName').val(),
            'password': $('#register input#regPassword').val(),
            'email': $('#register input#regEmail').val(),
            'year': $('#register select#regYear').val(),
            'gender': $('#register select#regGender').val(),
            'books': '[]'//'[{"title" : "Case For Christmas", "author" : "Lee Strobel"},{"title" : "Mere Christianity", "author" : "C.S. Lewis"}]'
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
        		window.alert('Error: ' + response.msg);
        	}

        });

        window.location.href = "/";
        window.alert("Registration Sucessful! Please Sign In");

	}
	else{
		alert('Please fill in all fields');
		return false;
	}

};

function displayUserInfo(){

	var userId = $('#currId').attr('rel');
	$.getJSON( '/users/userlist', function( data ) {

		$.each(data, function(index, val){
			if(val._id == userId){
				$('#fullName').text(val.fullname);
				$('#username').text(val.username);
				$('#userEmail').text(val.email);
				$('#userYear').text(val.year);
				$('#userGender').text(val.gender);
			}
		});
		
	});
	
	displayBooksRead(userId);
	
};

function displayBooksRead(userId){

	// Empty content string
	var tableContent = '';

	// jQuery AJAX call for JSON
	$.getJSON( '/users/userlist', function( data ) {

		userListData = data;

		// For each item in our JSON, add a table row and cells to the content string
		for(var count = 0; count < userListData.length; count++){
			if(userListData[count]._id == userId){
				var books = JSON.parse(userListData[count].books);
				$('#numBooks').text("Books Read: " + books.length);
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

	var userId = $('#currId').attr('rel');

	var errorCount = 0;
	$('#addBook input').each(function(index, val){
		if($(this).val() === ''){
			errorCount++;
		}
	});

	if(errorCount === 0){
		var userId = $('#currId').attr('rel');
		var newBook = {
			'title': $('#addBook input#bkTitle').val(),
			'author': $('#addBook input#bkAuthor').val()
		}
		$.getJSON( '/users/userlist', function ( data ){

			$.each(data, function(int,val){
				if(val._id == userId){
					var userBooks = JSON.parse(val.books);

					userBooks.push(newBook);
					var newBookString = JSON.stringify(userBooks);

					$('#addBook input#bkTitle').text("");
					$('#addBook input#bkAuthor').text("");

					$.ajax({
						type: 'PUT',
						data: newBookString,
						url: '/users/profile/addbook/' + val._id,
						dataType: 'JSON'
					}).done(function(response){

						if(response.msg === ''){
							$('#addBook fieldset input').val('');
							displayBooksRead(val._id);
						}
						else{
							window.alert('Error: ' + response.msg);
						}
					});
				}
			});

		});
		
	}
	else{
		alert('Please fill in all fields');
		return false;
	}
};

