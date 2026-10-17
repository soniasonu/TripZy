let searchBtn = document.querySelector("#search-btn");
let searchBar = document.querySelector(".search-bar-container");
let formBtn = document.querySelector("#login-btn");
let loginForm = document.querySelector(".login-form-container");
let  formClose= document.querySelector("#form-close");
let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");
const videoBtn = document.querySelectorAll('.vid-btn');
const videoSlider = document.querySelector('#video-slider');

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

menu.addEventListener('click', ()=>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', ()=>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});



videoBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const current = document.querySelector('.controls .active');
        if (current) current.classList.remove('active');

        btn.classList.add('active');
        videoSlider.src = btn.getAttribute('data-src');
        videoSlider.play();
    });
});



var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay:{
        delay:2500,
        disableOnInteraction: false,
    },
    breakpoints:{
        640: {
            slidesPerView: 1,
        },
        768:{
            slidesPerView: 2,
        },
        1024:{
            slidesPerView: 3,
        },
    },  
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay:{
        delay:2500,
        disableOnInteraction: false,
    },
    breakpoints:{
        450: {
            slidesPerView: 2,
        },
        768:{
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
        1200:{
            slidesPerView: 5,
        },
    },  
});



// open and close the login popup
formBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () => {
    loginForm.classList.remove('active');
});

// switch between login and register
function showRegister() {
    document.querySelector("#loginFormContent").style.display = "none";
    document.querySelector("#registerForm").style.display = "block";
}

function showLogin() {
    document.querySelector("#registerForm").style.display = "none";
    document.querySelector("#loginFormContent").style.display = "block";
}

// register
function handleRegister(event) {
    event.preventDefault();

    const name = document.querySelector("#regName").value;
    const email = document.querySelector("#regEmail").value.toLowerCase();
    const password = document.querySelector("#regPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        alert("This email is already registered.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created! Please login.");
    event.target.reset();
    showLogin();
}

// login
function handleLogin(event) {
    event.preventDefault();

    const email = document.querySelector("#loginEmail").value.toLowerCase();
    const password = document.querySelector("#loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Wrong email or password.");
        return;
    }

    alert("Welcome back, " + user.name + "!");
    event.target.reset();
    loginForm.classList.remove('active');
}

const today = new Date().toISOString().split("T")[0];
document.querySelector('#bookArrival').min = today;
document.querySelector('#bookLeaving').min = today;

function handleBooking(event){
    event.preventDefault();
    const place = document.querySelector('#bookPlace').value;
    const guests = document.querySelector('#bookGuests').value;
    const arrival = document.querySelector('#bookArrival').value;
    const leaving = document.querySelector('#bookLeaving').value;

    if(leaving <= arrival){
        alert("leaving date must be after the arrival date.");
        return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push({ place, guests, arrival, leaving });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("booking confirmed for " + place + "! " + guests + "guests(s), " + arrival + " to " + leaving + ".");
    event.target.reset();
}

// contact form
function handleContact(event) {
    event.preventDefault();

    const name = document.querySelector("#conName").value;
    const email = document.querySelector("#conEmail").value;
    const phone = document.querySelector("#conPhone").value;
    const subject = document.querySelector("#conSubject").value;
    const message = document.querySelector("#conMessage").value;

    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push({ name, email, phone, subject, message });
    localStorage.setItem("messages", JSON.stringify(messages));

    alert("Thank you, " + name + "! Your message has been sent.");
    event.target.reset();
}

function handleHeroSearch(event) {
    event.preventDefault();

    const place = document.querySelector("#heroPlace").value.trim().toLowerCase();
    const cards = document.querySelectorAll(".packages .box");

    let found = 0;
    cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const match = name.includes(place);
        card.style.display = match ? "" : "none";
        if (match) found++;
    });

    if (found === 0) {
        alert("No package found for that place.");
        cards.forEach(card => card.style.display = "");
        return;
    }

    document.querySelector("#packages").scrollIntoView();
}