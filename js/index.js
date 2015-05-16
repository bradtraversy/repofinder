$(document).ready(function() {
    document.addEventListener("deviceready", function(){
        getLatestRepos();
    });

    // Clear Search Results
    $('.ui-input-clear').click(function(){
        $('#search_list').hide();
        $('#user_info').hide();
    });

  $('#search_btn').click(function(e){
    e.preventDefault();

    var search_html = "";
    var user_html = "";
    var username = $('#search_input').val();
    var user_url   = 'https://api.github.com/users/'+username+'?client_id=144bcbcb85644f5f3b15&client_secret=076a7dd0e4fc9380161e5d58824937a1e7d50e85';
    var rep_url  = 'https://api.github.com/users/'+username+'/repos?client_id=144bcbcb85644f5f3b15&client_secret=076a7dd0e4fc9380161e5d58824937a1e7d50e85';

    $.ajax({
        url : rep_url,
        dataType : "jsonp",
        success : function (response) {
            if(response.data.message == "Not Found") {
                $('#msg').html("<h2>User Not Found</h2>");
            } else {
                $.ajax({
                    url:user_url,
                    datatype: "jsonp",
                    success: function(data){
                        user_html = '<h1><img class="thumbnail" src="'+ data.avatar_url +'"><a href="'+ data.html_url +'" target="_blank">'+ data.name +'</a></h1>';
                        // Output User Info
                        $("#user_info").html(user_html);
                    }
                });

                $('#msg').hide();
                $.each( response.data, function (i,item) {
                    search_html += '<li>' +
                    '<h1><a href="'+ this.html_url +'" target="_blank">' + this.name + '</a></h1>' +
                    '<p>By '+ this.owner.login +'</p>' +
                    '</li>';
                });

                // Output Search List
                $( '#search_list' ).append(search_html);
                $("#search_list").listview("refresh");
            }
        }
    });
  });
  

function getLatestRepos() {
  var html = "";
  
  $.ajax({
        url : "https://api.github.com/repositories?client_id=144bcbcb85644f5f3b15&client_secret=076a7dd0e4fc9380161e5d58824937a1e7d50e85",
        dataType : "jsonp",
        success : function (response) {
        $.each( response.data, function (i,item) {
             if(i < 10){
                html += '<li>' +
                '<img src="'+ this.owner.avatar_url +'">' +
                '<h1><a href="'+ this.html_url +'" target="_blank">' + this.name + '</a></h1>' +
                '<p>By '+ this.owner.login +'</p>' +
                '</li>';
            }
        });
        $( '#item_list' ).append( html );
        $("#item_list").listview("refresh");
        }
    });
}

}); //close document ready