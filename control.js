const courseHoles = [],
    testPlayer = [],
    courseName = [];

// THIS SECTION GETS THE API DATA FROM THE SOURCE XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//
//     https://golf-courses-api.herokuapp.com/courses
//       Fox Hollow id: 18300
//       Thanksgiving Point id: 11819
//       Spanish Oaks id: 19002
//
//     https://golf-courses-api.herokuapp.com/courses/${courseid}
//       This last URL contains all the information required for the selected course
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

function getGolfCourses() {
    let allGolfCourses;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            allGolfCourses = JSON.parse(this.responseText);
            drawGolfCourses(allGolfCourses);
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}

function drawGolfCourses(allGolfCourses) {
    $('.containerCourse').append(`<h1>Available Courses</h1>`);
    $('.containerCourse').append(`<select name="golfCourses" id="golfCourses"></select>`);
    $('.containerCourse').append(`<noscript><input type="submit" value="Submit"></noscript>`);
    $('.containerCourse').append(`<div id="courseImage"></div>`);
    $('.containerCourse').append(`<button id="courseSubmit" type="button"></button>`);

    for (let i = 0; i < allGolfCourses.courses.length; i++) {
        if (i === 0) {
            $('#golfCourses').append(`<option value="${allGolfCourses.courses[i].id}" id="${allGolfCourses.courses[i].id}">${allGolfCourses.courses[i].name}</option>`);
            $('#courseImage').append(`<img id="imageCourse" src="${allGolfCourses.courses[i].image}" alt="Image of the ${allGolfCourses.courses[i].name}">`);
            $('#courseSubmit').replaceWith(`<button id="courseSubmit" onclick="getGolfCourse(${allGolfCourses.courses[i].id})">Choose Your Course</button>`)
        } else {
            $('#golfCourses').append(`<option value="${allGolfCourses.courses[i].id}" id="${allGolfCourses.courses[i].id}">${allGolfCourses.courses[i].name}</option>`);
        }
    }
    // This is where the individual course is selected XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    $('#golfCourses').change(function () {
        for (let i = 0; i < allGolfCourses.courses.length; i++) {
            if ($(this).val() == allGolfCourses.courses[i].id) {
                $('#imageCourse').replaceWith(`<img id="imageCourse" src="${allGolfCourses.courses[i].image}" alt="Image of the ${allGolfCourses.courses[i].name}">`);
                $('#courseSubmit').replaceWith(`<button id="courseSubmit" onclick="getGolfCourse(${allGolfCourses.courses[i].id})">Choose Your Course</button>`);
            }
        }
    });
}

function getGolfCourse(id) {
    let selGolfCourse;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            selGolfCourse = JSON.parse(this.responseText);
            courseName.push(selGolfCourse.data.name);
            courseName.push(selGolfCourse.data.addr1);
            courseName.push(selGolfCourse.data.city);
            objHoleData(selGolfCourse);
            getPlayers();
            // todo insert modal function call here "select teebox"
            // todo turn off "Select Your Course" display
            // todo draw course card function call drawCard(); courseHoles is globally defined so I don't need to pass it.
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${id}`, true);
    xhttp.send();
}

// OBJECTIFICATION HAPPENS HERE XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

function objHoleData(selGolfCourse) {
    let holes;
    if (courseHoles.length > 0) {
        courseHoles = [];
    }
    for (let h = 0; h < selGolfCourse.data.holes.length; h++) {
        let teebox,
            allTeebox = [];
        for (let tb = 0; tb < selGolfCourse.data.holes[h].teeBoxes.length; tb++) {
            teebox = new Teebox(selGolfCourse.data.holes[h].teeBoxes[tb]);
            allTeebox.push(teebox);
        }
        holes = new Holes(h + 1, allTeebox);
        courseHoles.push(holes);
    }
}

function getPlayers() {
    let players = [],
        tee = [],
        tempNumPlay = 0;
    $('.containerCourse').empty();
    $('.playerSetup').append(`<h2>Enter Players</h2>`);
    let p = 0;
    $('.playerSetup').append(`<div id="player${p}"><input type="text" id="${p}" placeholder="Player ${p + 1}" onkeydown="checkName(this.id, this.value, event)"></div>`);
    $('.submit').append(`<button onclick="teeChoice()">submit</button>`);

}

function checkName(id, name, event) {
    let dupTest = false;
    switch (event.key) {
        case 'Tab':
            testPlayer.push(name);
            for (let i = 0; i < id; i++) {
                if (testPlayer[i] === name) {
                    myModal('Please select another name', './there-can-be-only-one-quote-2.jpg', name, 'playerSetup', 'submit');
                    dupTest = true
                    testPlayer.pop();
                    $(`#player${id}`).replaceWith(`<div id="player${id}"><input type="text" id="${id}" placeholder="Player ${Number(id) + 1}" onkeydown="checkName(this.id, this.value, event)"></div>`)
                }
            }
            if (!dupTest) {
                $(`#player${id}`).replaceWith(`<div id="player${id}">${testPlayer[id]}</div>`);
                if (id < 3) {
                    $('.playerSetup').append(`<div id="player${Number(id) + 1}"><input type="text" id="${Number(id) + 1}" placeholder="Player ${Number(id) + 2}" onkeydown="checkName(this.id, this.value, event)"></div>`);
                }
            }
            break;
        case 'Enter':
            testPlayer.push(name);
            for (let i = 0; i < id; i++) {
                if (testPlayer[i] === name) {
                    myModal('Please select another name', './there-can-be-only-one-quote-2.jpg', name, 'playerSetup', 'submit');
                    dupTest = true;
                    testPlayer.pop();
                    $(`#player${id}`).replaceWith(`<div id="player${id}"><input type="text" id="${id}" placeholder="Player ${Number(id) + 1}" onkeydown="checkName(this.id, this.value, event)"></div>`)
                }
            }
            if (!dupTest) {
                $(`#player${id}`).replaceWith(`<div id="player${id}">${testPlayer[id]}</div>`);
                if (id < 3) {
                    $('.playerSetup').append(`<div id="player${Number(id) + 1}"><input type="text" id="${Number(id) + 1}" placeholder="Player ${Number(id) + 2}" onkeydown="checkName(this.id, this.value, event)"></div>`);
                }
            }
            break;
    }
}

function teeChoice() {
    if (testPlayer.length === 0) {
        // TODO modal wouldn't you like to have some players?
    } else {
        $('.teeBoxContainer').append(`<br>`);
        $('.teeBoxContainer').append(`<hr>`);
        $('.teeBoxContainer').append(`<h3>Select Tee</h3>`);
        for (let i = 0; i < courseHoles[0].teebox.length; i++) {
            $('.teeBoxContainer').append(`<div><input type="radio" name="tee" value="${i}">${courseHoles[0].teebox[i].teeType}</input></div>`);
        }
        $('.submit').empty();
        $('.submit').append(`<button onclick="objPlayerData(value)">submit</button>`);
    }
}

function objPlayerData() {
    let teeNumber = $(`input:radio[name='tee']:checked`).val();
    for (let i = 0; i < testPlayer.length; i++) {
        console.log(`Player ${i + 1}: ${testPlayer[i]} playing from the ${teeNumber}.`);
    }

    // console.log(`numPlayer ${numPlayer}, playerName ${playerName}, teeBox ${teeBox}`);


}

function myModal(theText, image, name, ...theClass) {
    let temp;
    for (let i = 0; i < theClass.length; i++) {
        if (i === 0) {
            temp = `'${theClass[i]}'`
        } else {
            temp = temp + `, '${theClass[i]}'`
        }
    }
    $('.modal').append(`<div class="inner"></div>`);
    $('.inner').append(`<div class="popup">${theText}</div>`);
    $('.popup').append(`<img src="${image}" width="200">`);
    $('.popup').append(`<div>${name}</div>`);

    $('.popup').append(`<div><button onclick="closeit(${temp})">Dismiss</button></div>`);
    for (let i = 0; i < theClass.length; i++) {
        $(`.${theClass[i]}`).hide();
    }
    $('.modal').fadeIn();
}

function closeit(...theClass) {
    $('.modal').hide();
    $('.modal').empty();
    for (i = 0; i < theClass.length; i++) {
        $(`.${theClass[i]}`).fadeIn();
    }
}

// THIS SECTION DRAWS AND SETS UP THE SCORECARD  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

function drawCard() {
    let numColumns = 22,
        playerNames = ['One', 'Two', 'Three', 'Four'];

// Working grid here
//Make columns
    for (let c = 0; c < numColumns; c++) {
        $('.theCard').append(`<div id="col${c}" class="column"></div>`);
    }

// Put blocks in the columns
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < numColumns; c++) {
            $('#col' + c).append(`<div id="r${r}c${c}" class="cells"></div>`);
        }
    }

// Put player label and holes numbers at the top of the columns
    $('#r0c0').replaceWith(`<div id="r0c0" class="cells playersColumn">Players:</div>`);
    for (let c = 1; c < 10; c++) {
        $(`#r0c${c}`).html(`${c}`);
    }
    $('#r0c10').html('Out');
    for (let c = 11; c < 20; c++) {
        $(`#r0c${c}`).html(`${c - 1}`);
    }
    $('#r0c20').html('In');
    $('#r0c21').html('Total');

// Put players in the first column
    for (r = 1; r < 6; r++) {
        $(`#r${r}c0`).replaceWith(`<div id="r${r}c0" class="cells playersColumn">${playerNames[r - 1]}</div>`);
    }
}

getGolfCourses();

