$(document).ready(function () {
    $("#serialize").click(function (e) {
        e.preventDefault();
        var myobj = {Name: $("#Name").val(), Comment: $("#Comment").val(), Time: new Date().toUTCString()};
        jobj = JSON.stringify(myobj);
        $("#Comment").val("");

        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function (data, textStatus) {
                $("#done").html("Sent!");
            }
        })
        getComments();
    });
    $("#clear").click(function(){
        var url = "clearComments";
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data, textStatus) {
                $("#done").html("Cleared.");
            }
        })
        getComments();
    });

    function getComments() {
        $.getJSON('comments', function (data) {
            console.log(data);
            var everything = "<div style='border-style: solid'><ul>";
            for (var comment in data) {
                com = data[comment];
                everything += "<li class='comment'><div><p class='name'>" + com.Name + "<span class='timestamp'>" + com.Time + "</span></div><div class='content'>" + com.Comment + "</div></li>";
            }
            everything += "</ul></div>";
            $("#comments").html(everything);
        })
    }

    window.setInterval(getComments, 3000);

    function submit(){
        $( '#serialize' ).trigger( 'click' );
    }
});

