// ============================================
// WDD231 - Course Information
// Ronald Ongom
// ============================================

// Course Array
const courses = [
    {
        code: "WDD130",
        name: "Web Fundamentals",
        credits: 3,
        subject: "WDD",
        completed: true
    },
    {
        code: "WDD131",
        name: "Dynamic Web Fundamentals",
        credits: 3,
        subject: "WDD",
        completed: true
    },
    {
        code: "WDD231",
        name: "Web Frontend Development I",
        credits: 3,
        subject: "WDD",
        completed: false
    },
    {
        code: "CSE110",
        name: "Programming Building Blocks",
        credits: 2,
        subject: "CSE",
        completed: true
    },
    {
        code: "CSE111",
        name: "Programming with Functions",
        credits: 2,
        subject: "CSE",
        completed: true
    },
    {
        code: "CSE210",
        name: "Programming with Classes",
        credits: 2,
        subject: "CSE",
        completed: true
    },
    {
        code: "CSE212",
        name: "Programming with Data Structures",
        credits: 2,
        subject: "CSE",
        completed: true
    },
    {
        code: "CSE310",
        name: "Applied Programming",
        credits: 3,
        subject: "CSE",
        completed: false
    }
];

// Elements
const courseContainer = document.querySelector("#courses");
const creditDisplay = document.querySelector("#credits");

// Display Courses
function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>${course.credits} Credits</p>
        `;

        courseContainer.appendChild(card);

    });

    displayCredits(courseList);

}

// Display Credits using reduce()
function displayCredits(courseList) {

    const totalCredits = courseList.reduce((total, course) => {

        return total + course.credits;

    }, 0);

    creditDisplay.textContent =
        `Total Credits: ${totalCredits}`;

}

// Button Events

document.querySelector("#all").addEventListener("click", () => {

    displayCourses(courses);

});

document.querySelector("#wdd").addEventListener("click", () => {

    const filtered = courses.filter(course =>
        course.subject === "WDD"
    );

    displayCourses(filtered);

});

document.querySelector("#cse").addEventListener("click", () => {

    const filtered = courses.filter(course =>
        course.subject === "CSE"
    );

    displayCourses(filtered);

});

// Initial Page Load
displayCourses(courses);