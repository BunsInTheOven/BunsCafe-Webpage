const loadScreen = document.getElementsByClassName('sec-screen')[0];
var loading = false;

const dimmer = document.getElementById('dimmer');
var zoomTarget = null;

const el_event = document.getElementById('sec-home');
const el_bards = document.getElementById('sec-bards');
const el_details = document.getElementById('sec-events');
const el_menu = document.getElementById('sec-menu');

const nav_icon = document.getElementById('nav-mobile-icon')
const nav_event = document.getElementById('nav-event');
const nav_bards = document.getElementById('nav-bards');
const nav_details = document.getElementById('nav-details');
const nav_menu = document.getElementById('nav-menu');
var prevNav = nav_event;

const navbarOffset = el_event.offsetTop;
const scrollOffsets = [
    {top: 0, height: el_event.offsetHeight + el_event.offsetTop},
    {top: el_bards.offsetTop, height: el_bards.offsetHeight}, 
    {top: el_details.offsetTop, height: el_details.offsetHeight},
    {top: el_menu.offsetTop, height: el_menu.offsetHeight}
];

const children = document.getElementById('nav').children;

// Event Callbacks
nav_event.addEventListener('click', () => {loadSection(nav_event, '#')});
nav_bards.addEventListener('click', () => {loadSection(nav_bards, '#bards')});
nav_details.addEventListener('click', () => {loadSection(nav_details, '#details')});
nav_menu.addEventListener('click', () => {loadSection(nav_menu, '#menu')});

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('scroll', () => {
        onScroll();
    })
});

function zoomImage(el) {
    dimmer.classList.toggle('dimmer-hidden');
    if (el == null)
    {    
        zoomTarget.classList.remove('zoom');
        zoomTarget = null;
        return;
    }
    
    el.classList.toggle('zoom');
    zoomTarget = el;
}

// Section Transition
function loadSection(nav, section) {
    if (loading) return;

    loading = true;
    loadScreen.classList.add('play-anim');
    setTimeout(gotoSection, 1500, nav, section);
    setTimeout(completeLoad, 3000);
}

function gotoSection(nav, section) {
    window.location = section;
    prevNav.classList.remove('active');
    nav.classList.add('active');
}

function completeLoad() {
    loadScreen.classList.remove('play-anim')
    loading = false;
}

// Section Updating
function onScroll() {
    var scroll = this.scrollY;
    for (let i = 0; i < scrollOffsets.length; i++) {
        if (scroll >= scrollOffsets[i].top - navbarOffset && scroll < scrollOffsets[i].top + scrollOffsets[i].height - navbarOffset) {
            if (!children[i].classList.contains('active'))
                children[i].classList.add('active');
            continue;
        }

        children[i].classList.remove('active');
    };
}