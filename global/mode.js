document.addEventListener("DOMContentLoaded", () => {
    document.body.setAttribute("data-bs-theme", localStorage.theme || "dark");

    document.querySelector("#btn-toggle-theme").addEventListener("click", () => {
        document.body.setAttribute("data-bs-theme",
            document.body.getAttribute("data-bs-theme") === "dark" ? "light" : "dark"
        );
        localStorage.theme = document.body.getAttribute("data-bs-theme");
    });
})