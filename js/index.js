const loggedInLinks = document.querySelectorAll('.logedIn');
const loggedOutLinks = document.querySelectorAll('.logedOut');
const accountDetails = document.querySelector('.account-details');
var outfeed = $('.view-feedback');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if (user) {
        document.querySelector('.view-feedback').style.display = 'none';
        if(user.admin){
            adminItems.forEach(item => item.style.display = 'block');
            document.querySelector('.view-feedback').style.display = 'block';
            db.collection('feedback').limit(20).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                
                var div = $('<div></div>', {class: 'feedbackdiv'});
                var name = $('<h3 id="feedh"> Email: '+ doc.data().username +'</h3>');
                div.append(name);
                var feed = $('<p id="feedp">').append(doc.data().text);
                div.append(feed);
                outfeed.append(div); 

                })
            })
        }
        //acount info
        const html = `
            <div>Logged in as ${user.email}.</div>
            <div>${user.admin ? 'Admin' : ''}</div>
        `;
        accountDetails.innerHTML = html;

        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none'); 
        document.querySelector('.entry-form').style.display = 'inline-block';
        document.querySelector('.image-screen-2').style.display = 'block';
        document.querySelector('.border-line-2').style.display = 'block';
        document.querySelector('.border-line-3').style.display = 'block';
    } else {
        adminItems.forEach(item => item.style.display = 'none');
        //hide account info
        accountDetails.innerHTML = '';
        document.querySelector('.entry-form').style.display = 'none';
        document.querySelector('.image-screen-2').style.display = 'none';
        document.querySelector('.border-line-2').style.display = 'none';
        document.querySelector('.border-line-3').style.display = 'none';
        document.querySelector('.view-feedback').style.display = 'none';
        document.querySelector('#question-panel').style.display = 'none';
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}


jQuery(document).ready(function ($) {

    // Model link
    $('#login-key').click(function () {
        $('#mask').fadeIn(300);
        document.querySelector('#add-questions').style.display = 'none';
        document.querySelector('#modal-account').style.display = 'none';
        document.querySelector('#feed-form').style.display = 'none';
        document.querySelector('#modal-signup').style.display = 'block';
        $('.model').delay(10).animate({
            top: ($(window).height() - $('.model').outerHeight()) / 2
        }, 400);
    });

    $('#create-key').click(function () {
        $('#mask').fadeIn(300);
        document.querySelector('#modal-signup').style.display = 'none';
        document.querySelector('#modal-account').style.display = 'none';
        document.querySelector('#feed-form').style.display = 'none';
        document.querySelector('#add-questions').style.display = 'block';
        $('.model').delay(10).animate({
            top: ($(window).height() - $('.model').outerHeight()) / 2
        }, 400);
    });

    $('#feedbtn').click(function () {
        $('#mask').fadeIn(300);
        document.querySelector('#modal-signup').style.display = 'none';
        document.querySelector('#modal-account').style.display = 'none';
        document.querySelector('#feed-form').style.display = 'block';
        document.querySelector('#add-questions').style.display = 'none';
        $('.model').delay(10).animate({
            top: ($(window).height() - $('.model').outerHeight()) / 2
        }, 400);
    })

    $('#view-account').click(function () {
        $('#mask').fadeIn(300);
        document.querySelector('#add-questions').style.display = 'none';
        document.querySelector('#modal-account').style.display = 'block';
        document.querySelector('#modal-signup').style.display = 'none';
        document.querySelector('#feed-form').style.display = 'none';
        $('.model').delay(10).animate({
            top: ($(window).height() - $('.model').outerHeight()) / 2
        }, 400);
    });

    // Popup
    $('#mask, .close').click(function () {
        $('.model').animate({ top: -($('.model').outerHeight()) - 50 });
        $('#mask').fadeOut(200);
        document.querySelector('#signup-form').reset();
        document.querySelector('#login-form').reset();
        document.querySelector('.question-adder').reset();
    });
    $(window).resize(function () {
        $('.model').css({
            left: ($(window).width() - $('.model').outerWidth()) / 2
        });
    });
    $(window).resize();

});

let btnToggle = Array.from(document.getElementsByClassName('btn-toggle'));

btnToggle.forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('slider').classList.toggle('toggled');
    });
});

