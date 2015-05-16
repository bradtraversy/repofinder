window.onload = function(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

// PhoneGap is ready
function onDeviceReady() {
    $('#saveContact').click(function(){
    	saveContact();
    });
}

function saveContact(){
	// Get Form Info
	var full_name = $('#first_name').val()+" "+$('#last_name').val();
	var note = $('#note').val();

	var myContact = navigator.contacts.create({"displayName": full_name});
	myContact.note = note;

	contact.save();

	console.log('Saving Contact ' +full_name+'...');
}