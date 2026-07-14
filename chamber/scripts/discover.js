const visitMessage = document.querySelector("#visitMessage");

const lastVisit = Number(localStorage.getItem("lastVisit"));
const now = Date.now();

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions about Lira City.";

} else {

    const days = Math.floor((now - lastVisit) / 86400000);

    if (days === 0) {

        visitMessage.textContent =
            "Welcome back! You visited earlier today.";

    } else if (days === 1) {

        visitMessage.textContent =
            "Welcome back! Your last visit was 1 day ago.";

    } else {

        visitMessage.textContent =
            `Welcome back! Your last visit was ${days} days ago.`;

    }

}

localStorage.setItem("lastVisit", now);