// ======================================
// Course List Array
// WDD231 Course Home Page
// ======================================

const courses = [
    {
        code: "CSE110",
        name: "Introduction to Programming",
        credits: 2,
        subject: "CSE",
        completed: true
    },
    {
        code: "WDD130",
        name: "Web Fundamentals",
        credits: 3,
        subject: "WDD",
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
    }
];

// Elements
const courseContainer = document.querySelector("#courses");
const creditDisplay = document.querySelector("#credits");

// Display Courses
function displayCourses(courseList) {
    if (!courseContainer) return;

    courseContainer.innerHTML = "";

    courseList.forEach((course) => {
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
    if (!creditDisplay) return;

    const totalCredits = courseList.reduce((total, course) => total + course.credits, 0);
    creditDisplay.textContent = `Total Credits: ${totalCredits}`;
}

// Button Events
if (document.querySelector("#all")) {
    document.querySelector("#all").addEventListener("click", () => {
        displayCourses(courses);
    });
}

if (document.querySelector("#wdd")) {
    document.querySelector("#wdd").addEventListener("click", () => {
        const filtered = courses.filter((course) => course.subject === "WDD");
        displayCourses(filtered);
    });
}

if (document.querySelector("#cse")) {
    document.querySelector("#cse").addEventListener("click", () => {
        const filtered = courses.filter((course) => course.subject === "CSE");
        displayCourses(filtered);
    });
}

// Initial Page Load
displayCourses(courses);
