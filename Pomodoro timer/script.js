var isClockRunning = false;
var final_min =  13;
var final_sec = 37;

let $ = name => document.querySelector(name);

let trigger = $('#trigger');
let display_min = $('.clock__time-minutes');
let display_sec = $('.clock__time-seconds');
let startBtn = $('.clock__controls-start');
let stopBtn = $('.clock__controls-stop');
let clk_setting = $('.clock__settings');

// displaying initial time
display_min.innerText = final_min;
display_sec.innerText = final_sec;

// start / stop clock
trigger.addEventListener('change', e => {
    isClockRunning = e.target.checked;
    toggle_gear();
    if (isClockRunning) {
        if (final_min == 0 && final_sec == 0) {
            isClockRunning = false;
            alert('please set a time first!');
        }
        else {
            switchBtns(isClockRunning);
            backClock(final_min, final_sec);
        }
    }
});

let toggle_gear = () => {
    if (isClockRunning)
        clk_setting.style.visibility = "hidden";
    else
        clk_setting.style.visibility = "visible";
}

// fancy UI display of time
const fancy_clock = (min, sec) => {
    if (sec/10 == 0 || min/10 == 0) {
        if (sec/10 == 0 || sec == 0) {
            display_min.innerText = min;
            display_sec.innerText = `0${sec}`;
        } 
        if (min/10 == 0 || min == 0) {
            display_min.innerText = `0${min}`;
            display_sec.innerText = sec;
        }
        if (min == 0 && sec == 0) {
            display_min.innerText = `0${min}`;
            display_sec.innerText = `0${sec}`;
        }
    } else {
        display_min.innerText = min;
        display_sec.innerText = sec;
    }
}

//  going back to 0
let backClock = (min, sec) => {
    let timer = setInterval(() => {
        if (!isClockRunning) {
            switchBtns(isClockRunning);
            clearInterval(timer);
            final_min = min;
            final_sec = sec;
        }

        sec = sec - 1;

        // fancy UI display
        fancy_clock(min, sec);

        // decrementing time
        if (sec == 0) {
            if (min == 0 && sec == 0) {
                isClockRunning = false;
                switchBtns(isClockRunning);
                toggle_gear();
                clearInterval(timer);
                final_min = min;
                final_sec = sec;
            } else {
                min = min - 1;
                sec = 59;
            }
        }
    }, 1000);
}

//  switch buttons [ start / stop ]
const switchBtns = (isClockRunning) => {
    if (isClockRunning) {
        startBtn.style.display = "none";
        stopBtn.style.display = "block";
    } else {
        startBtn.style.display = "block";
        stopBtn.style.display = "none";
    }
}

// set time in clock
let form = document.forms.set_clock
form.addEventListener('submit', e => {
    e.preventDefault();
    // check if clock is already running
    if (isClockRunning) {
        alert('please stop the clock first!');
    }
    // check input
    else if (e.target.get_min.value < 0 || e.target.get_sec.value < 0) {
        alert('someone once said, "Time can\'t be negative"');
    } else {
        // set inputted time in global JS variables
        final_min = e.target.get_min.value;
        final_sec = e.target.get_sec.value;
        //  show inputted time in UI
        fancy_clock(final_min, final_sec);
        // seret form
        e.target.reset();
        // hide this form
        e.target.style.display = "none";
    }
});


clk_setting.addEventListener('click', e => {
    form.style.display = "grid";
});
