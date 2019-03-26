// https://golf-courses-api.herokuapp.com/courses
// Fox Hollow id: 18300
// Thanksgiving Point id: 11819
// Spanish Oaks id: 19002

// https://golf-courses-api.herokuapp.com/courses/${courseid}


let selectedGolf;

function getGolf() {
    let allGolf;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            allGolf = JSON.parse(this.responseText);
            // set up DOM interaction here for selection of course
            for (let i = 0; i < allGolf.courses.length; i++) {
                if (i === 0) {
                    $('#golfCourses').append(`<option value="${allGolf.courses[i].id}" id="${allGolf.courses[i].id}">${allGolf.courses[i].name}</option>`);
                    $('#courseImage').append(`<img id="imageCourse" src="${allGolf.courses[i].image}" alt="Image of the ${allGolf.courses[i].name}">`);
                    $('#courseSubmit').replaceWith(`<button id="courseSubmit" onclick="getGolfCourse(${allGolf.courses[i].id})">Submit</button>`)
                } else {
                    $('#golfCourses').append(`<option value="${allGolf.courses[i].id}" id="${allGolf.courses[i].id}">${allGolf.courses[i].name}</option>`);
                }
            }
            // set up golf selection here
            $('#golfCourses').change(function () {
                for (let i = 0; i < allGolf.courses.length; i++) {
                    if ($(this).val() == allGolf.courses[i].id) {
                        $('#imageCourse').replaceWith(`<img id="imageCourse" src="${allGolf.courses[i].image}" alt="Image of the ${allGolf.courses[i].name}">`);
                        $('#courseSubmit').replaceWith(`<button id="courseSubmit" onclick="getGolfCourse(${allGolf.courses[i].id})">Submit</button>`);
                    }
                }
                // alert($(this).val());
            });

        }

    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}



function getGolfCourse(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            selectedGolf = JSON.parse(this.responseText);
            // set up DOM interaction here for selection of course
        }
        // set up golf selection here
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${id}`, true);
    xhttp.send();

}


getGolf();

// getGolfCourse(11819); // Thanksgiving Point
// getGolfCourse(19002); // Spanish Oaks
// getGolfCourse(18300); // Fox Hollow


/*console.log(allGolf);
            for (let i = 0; i < allGolf.courses.length; i++) {
                console.log('Am I getting here?');
                $('.container').append(`<select id = "id${allGolf.courses[i].id}">Course Name: ${allGolf.courses[i].name}</select>`)
            }
        }

        */