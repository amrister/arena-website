var postsURL= "http://192.168.99.100:8080/posts/";
var postURL = "http://192.168.99.100:8080/post/";

var uID  = "5";
var currentName = "Amr Hussien";

let postIDLatest = "";

$(function(){

  // Get All Post Of Current User ID
  $(window).on("load",getAllPosts());

  // Create New User
  $("#addPost").on("click",function(){
      var postContent = $('#text').val();
      $('#text').val("");
      var priv =$('#privacy').val();
      var myObj = {
            text: postContent,
            privacy: priv,
            userId: uID ,
            name: currentName};
      console.log(myObj);
      $.ajax({
        url: postURL,
        type: 'POST',
        crossDomain: true,
        contentType: 'application/json',
        data: JSON.stringify(myObj),
        success: function () {
            getAllPosts(-1); // to get last Post
        },
        error: function () {
            alert("An error has occurred");
        },
      });
  })

})

// Get All Post Of User
function getAllPosts(num){
    var userID = "5";
    $.ajax({
        url: postsURL + userID,
        type: 'GET',
        contentType: 'application/json',
        success: function (res) {
          var i = res.length-1;
          for(i ; i >= 0 ; i--){
            var postData = res[i];
            var dateObj = postData.date.split(" ");
            var currentPost = "<div class='post'>"+
              "<div class='image'>"+
                "<img src='images/profiles/user.jpeg' alt=''>"+
              "</div>"+
              "<div class='post-content'>"+
                "<div class='text'>"+
                "<h6 class='name second-color'>"+postData.name+"<span class='date'>"+dateObj[0].substr(0,dateObj[0].lastIndexOf("/"))+"<i class='dot'></i>"+dateObj[1].substr(0,dateObj[1].lastIndexOf(":"))+"</span></h6>"+
                  "<p>"+postData.text+"</p>"+
                  "<span class='hr'></span>"+
                "</div>"+
                "<div class='votes'>"+
                  "<div class='up'>"+
                    "<i class='fas fa-chevron-up disabled'></i>"+
                    "<span>"+postData.votesUp+"</span>"+
                  "</div>"+
                  "<div class='down'>"+
                    "<span>"+postData.votesDown+"</span>"+
                    "<i class='fas fa-chevron-down disabled'></i>"+
                  "</div>"+
                "</div>"+
                "<div class='comments btn' data-toggle='modal' data-target='#comments' data-postid="+postData._id+">"+
                  "<span onclick=getAllComments('"+postData._id+"','0')>Comments</span>"+
                "</div>"+
              "</div>"+
            "</div>";
            if(num==-1){
              $(".profile .posts").prepend(currentPost);
              break;
            }
            $(".profile .posts").append(currentPost);
          }
        },
        error: function () {
          alert("Something Went Wrong!!");
        },
    });
  }

// Get All Comments Of Post
function getAllComments(postID,num){
  postIDLatest = postID;
  $(".modal .post-comments").empty();
    $.ajax({
        url: postURL + postID + "/comments",
        type: 'GET',
        contentType: 'application/json',
        success: function (res) {
          var i = res.length-1;
          for(i ; i >= 0 ; i--){
            var commentData = res[i];
            var dateObj = commentData.date.split(" ");
            console.log(commentData);
            var currentComment= "<div class='comment'>"+
              "<div class='media'>"+
                "<img src='images/profiles/user.jpeg' alt=''>"+
                "<div class='media-body'>"+
                  "<h6>"+commentData.name+"</h6>"+
                  "<span>"+dateObj[0]+"<i class='dot'></i>"+dateObj[1].substr(0,dateObj[1].lastIndexOf(":"))+"</span>"+
                  "<p>"+commentData.text+"</p>"+
                "</div>"+
              "</div>"+
            "</div>";
            if(num==-1){
              console.log("here");
              $(".modal .post-comments").prepend(currentComment);
              break;
            }
            $(".modal .post-comments").append(currentComment);
          }
        },
        error: function () {
          // alert("Something Went Wrong!!");
        },
    });
}

// Create New Comment
function addComment(){
    var comContent = $('#text-comment').val();
    $('#text-comment').val("");
    var myObj = {
          text: comContent,
          userId: uID ,
          name: currentName};
    console.log(myObj);
    $.ajax({
      url: postURL + postIDLatest + "/comment",
      type: 'POST',
      crossDomain: true,
      contentType: 'application/json',
      data: JSON.stringify(myObj),
      success: function () {
          getAllComments(-1); // to get last Post
      },
      error: function () {
          //alert("An error has occurred");
      },
    });
}
