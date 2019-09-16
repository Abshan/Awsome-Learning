//add admin
const adminForm = document.querySelector('.admin-actions');
const adminFormButton = document.querySelector('.make-admin');
adminFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail }).then(result => {
        console.log(result);
        adminForm.reset();
    });
})

//status change
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        })
    } else {
        setupUI();
    }
});

//signup
const signupForm = document.querySelector('#signup-form');
const signupButton = document.querySelector('#signup-button');
signupButton.addEventListener('click', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up user
    if (email === "" || email == null || password === "" || password == null) {
        alert("Fill in the empty fields!");
    } else {
        auth.createUserWithEmailAndPassword(email, password).then(cred => {

            $('.model').animate({ top: -($('.model').outerHeight()) - 50 });
            $('#mask').fadeOut(200);
            document.querySelector('#modal-signup').style.display = 'none';
            signupForm.reset();
            loginform.reset();
        }).catch(error => {
            if(error.code == 'auth/invalid-email'){
                alert('*Invalid Email Address');
            }
            if(error.code == 'auth/weak-password'){
                alert('*Enter a valid password');
            }
        });
    }
});

//logout
const logout = document.querySelector('#logout-key');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    var logOut = confirm("Are you sure you want to log out?");
    if (logOut == true) {
        auth.signOut().then(() => {
            document.querySelector('#welcome-screen').style.display = 'inline-block';
        });
    }
});

//login
const loginform = document.querySelector('#login-form');
const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    //get user info
    const email = loginform['login-email'].value;
    const password = loginform['login-password'].value;

    if (email === "" || email == null || password === "" || password == null) {
        alert("*Fill in the empty fields!");
    } else {
        auth.signInWithEmailAndPassword(email, password).then(cred => {
            $('.model').animate({ top: -($('.model').outerHeight()) - 50 });
            $('#mask').fadeOut(200);
            document.querySelector('#modal-signup').style.display = 'none';
            loginform.reset();
            signupForm.reset();
        }).catch(error => {
            if(error.code == 'auth/user-not-found'){
                alert('*User Not Found');
            }
            if(error.code == 'auth/invalid-email'){
                alert('*Invalid Email Address');
            }
            if(error.code == 'auth/wrong-password'){
                alert('*Invalid Password');
            }
        })
    }
});

//add question
const createForm = document.querySelector('.question-adder');
const createButn = document.querySelector('#create-question-button');
createButn.addEventListener('click', (e) => {
    e.preventDefault();

    db.collection('questions').add({
        grade: createForm['q-grade'].value,
        subject: createForm['q-subject'].value,
        question: createForm['question-text'].value,
        choices: ['False', 'True'],
        answer: createForm['answer-choice'].value
    }).then(() => {
        $('.model').animate({ top: -($('.model').outerHeight()) - 50 });
        $('#mask').fadeOut(200);
        document.querySelector('.question-adder').reset();
    }).catch(err => {
        console.log(err.message);
    })
})
