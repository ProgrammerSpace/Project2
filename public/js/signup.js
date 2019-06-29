

//java for signup page.

$(document).ready(function () {
    var signForm = $("#newUsr");
    var email = $("input#inputEmail4");
    var password = $("input#inputPassword4");
    var name = $("input#inputName");
    var phone = $("input#inputPhone");
    var city = $("input#inputCity");
    var state = $("input#inputState");


    signForm.on("submit", function (event) {
        event.preventDefault();
        var newUsr = {
            username: email.val().trim(),
            password: password.val().trim()
        };

        var newSel = {
            name: name.val().trim(),
            email: email.val().trim(),
            phone: phone.val().trim(),
            city: city.val().trim(),
            state: state.val(),
        }

        //makes sure we got the email and password
        if (!newUsr.username || !newUsr.password) {
            return;
        }

        createNewUsr(newUsr.username, newUsr.password);
        email.val("");
        password.val("");

    });

    function createNewUsr(email, password) {
        $.post("/api/signup", {
            username: email,
            password: password
        }).then(function (data) {

            var newSel = {
                name: name.val().trim(),
                email: email,
                phone: phone.val().trim(),
                city: city.val().trim(),
                state: state.val(),
            }

            console.log("signed up");
            createNewSeller(newSel.name, newSel.phone, newSel.city, newSel.state, newSel.email);
        }).catch(handleLoginError);
    };

    function handleLoginError(err) {
        $("#alert .msg").text("User name already exists");
        $("#alert").fadeIn(500);
    };

    function createNewSeller(name, phone, city, state, email) {
        var loc = city + ", " + state;
        $.post("/api/sellers/newseller", {
            name: name,
            email: email,
            phone: phone,
            location: loc,
        }).then(function (data) {
            window.location.replace("/");
            console.log("created new seller");
        });
    };


});