$('.message a').click(function () {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    setTimeout(() => removeAlerts(), 650)
});

function removeAlerts() {
    $(".container .info").remove();
}
function preAlert(message) {
    var element = document.createElement("span");
    element.classList.add("info");
    element.innerHTML = message;
    return element;
}

$("#signUpButton").click(function (event) {
    removeAlerts();
    flag = true;
    event.preventDefault();
    var username = $("#sUsername").val();
    if (username == "") {
        $("#sUsername").before(preAlert("enter a username"));
        flag = false;
    }
    var password = $("#sPassword").val();
    if (password == "") {
        $("#sPassword").before(preAlert("enter a password"));
        flag = false;
    }
    var email = $("#sEmail").val();
    if (email == "" || !checkEmail(email)) {
        $("#sEmail").before(preAlert("enter a valid email"));
        flag = false;
    }

    if (flag) {

        var data = {
            "username": username,
            "password": password,
            "email": email
        }

        $.ajax({
            type: "POST",
            url: "signup",
            data: data
        }).done(function (response) {
            /* dealing with errors here */
            console.log(response);
            if (response.status == "409") {
                //username taken
                $("#sUsername").before(preAlert("username is taken"));
            } else if (response.status == "500") {
                //server error
                $(".message").before(preAlert("error: ", response.message));
            } else if (response.status == "200") {
                //success
                ajaxSignIn(data);
            }
        });
    }
});

$("#logInButton").click(function (event) {
    removeAlerts();
    flag = true;
    event.preventDefault();
    var username = $("#lUsername").val();
    if (username == "") {
        $("#lUsername").before(preAlert("enter a username"));
        flag = false;
    }
    var password = $("#lPassword").val();
    if (password == "") {
        $("#lPassword").before(preAlert("enter a password"));
        flag = false;
    }
    if (flag) {
        var data = {
            "username": username,
            "password": password
        }
        ajaxSignIn(data);
    }

});

function ajaxSignIn(data) {
    $.ajax({
        type: "POST",
        url: "login1",
        data: data,
        /* dataType: "json", */
    }).done(function (response) {
        /* dealing with errors here */
        if (response.status == "200") {
            localStorage.setItem("token", response.token);
            window.location = "/chat";
        } else if (response.status == "403") {
            $("#lUsername").before(preAlert(response.message));
        } else if (response.status == "500") {
            $(".message").before(preAlert("error: ", response.message));
        }
        console.log(response);
    });
}

function dummy(){
    var data = {
        "username": "dummy",
        "password": "password"
    }
    ajaxSignIn(data);
}



function checkEmail(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(email)) return false;
    return true;
}

