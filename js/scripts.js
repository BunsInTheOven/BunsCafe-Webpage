const loadScreen = document.getElementsByClassName('sec-screen')[0];
var loading = false;

const dimmer = document.getElementById('dimmer');
var zoomTarget = null;

const home = document.getElementById('sec-home');
const bards = document.getElementById('sec-bards');
const events = document.getElementById('sec-events');

const nav_home = document.getElementById('nav-home');
const nav_bards = document.getElementById('nav-bards');
const nav_events = document.getElementById('nav-events');
var prevNav = nav_home;

const scrollOffsets = [
    {top: 0, height: home.offsetHeight},
    {top: bards.offsetTop, height: bards.offsetHeight}, 
    {top: events.offsetTop, height: events.offsetHeight},
];

const children = document.getElementById('nav').children;

// Event Callbacks
nav_home.addEventListener('click', () => {loadSection(nav_home, '#')});
nav_bards.addEventListener('click', () => {loadSection(nav_bards, '#bards')});
nav_events.addEventListener('click', () => {loadSection(nav_events, '#events')});

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('scroll', () => {
        onScroll(scrollOffsets);
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
function onScroll(offsets) {
    var scroll = this.scrollY;
    for (let i = 0; i < scrollOffsets.length; i++) {
        if (scroll >= offsets[i].top && scroll < offsets[i].top + offsets[i].height) {
            if (!children[i].classList.contains('active'))
                children[i].classList.add('active');
            continue;
        }

        children[i].classList.remove('active');
    };
}