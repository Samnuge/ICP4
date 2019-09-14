function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)4

    let info = new XMLHttpRequest();
    let url = `https://api.github.com/users/${user}`

    info.open('GET',url,false);


    info.send('');

    return info;
}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content

    console.log(user);
    let username = user.name;
    let userid = user.id;
    let userpic = user.avatar_url;

    var userpicture = new Image();
        userpicture.src = user.avatar_url;
    let userurltxt = " users URL";
    var userURL = userurltxt.link(user.url);

    let profile = document.getElementById("profile");
    profile.getElementsByTagName("h2")[0].innerText = `Username = ${username} ID ${userid}`;
    profile.getElementsByClassName("avatar")[0].innerHTML = "";
    profile.getElementsByClassName("avatar")[0].appendChild(userpicture);
    profile.getElementsByClassName("information")[0].innerHTML = userURL;


}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    console.log("user not found");
    let profile = document.getElementById("profile");
    profile.getElementsByTagName("h2")[0].innerText = `User; "${username}" not found`;

}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
