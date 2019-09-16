const loggedInLinks = document.querySelectorAll('.logedIn');
const loggedOutLinks = document.querySelectorAll('.logedOut');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if (user) {
        if(user.admin){
            adminItems.forEach(item => item.style.display = 'block');
        }
        //acount info
        const html = `
            <div>Logged in as ${user.email}.</div>
            <div>${user.admin ? 'Admin' : ''}</div>
        `;
        accountDetails.innerHTML = html;

        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        document.querySelector('.entry-form').style.display = 'block';
    } else {
        adminItems.forEach(item => item.style.display = 'none');
        //hide account info
        accountDetails.innerHTML = '';
        document.querySelector('.entry-form').style.display = 'none';
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
        document.querySelector('#modal-signup').style.display = 'block';
        $('.model').delay(10).animate({
            top: ($(window).height() - $('.model').outerHeight()) / 2
        }, 400);
    });

    $('#create-key').click(function () {
        $('#mask').fadeIn(300);
        document.querySelector('#modal-signup').style.display = 'none';
        document.querySelector('#modal-account').style.display = 'none';
        document.querySelector('#add-questions').style.display = 'block';
        $('.model').delay(10).animate({
            top: ($(window).height() - $('.model').outerHeight()) / 2
        }, 400);
    });

    $('#view-account').click(function () {
        $('#mask').fadeIn(300);
        document.querySelector('#add-questions').style.display = 'none';
        document.querySelector('#modal-account').style.display = 'block';
        document.querySelector('#modal-signup').style.display = 'none';
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

