window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  // Navbar style
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll(".nav-link");

  let top = window.scrollY;

  sections.forEach((section) => {
    let offset = section.offsetTop - 120;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => link.classList.remove("active"));

      let activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });

  //  Fix for last section (Contact)
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
    navLinks.forEach((link) => link.classList.remove("active"));
    document
      .querySelector('.nav-link[href="#contact"]')
      .classList.add("active");
  }
});

function showContactForm() {
  Swal.fire({
    title: "Contact Us to get Demo",
    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      confirmButton: "custom-confirm-btn",
      cancelButton: "custom-cancel-btn",
    },
    html: `
            <input type="text" id="name" class="swal2-input custom-input" placeholder="Your Name">
            <input type="email" id="email" class="swal2-input custom-input" placeholder="Your Email">
            <textarea id="query" class="swal2-textarea custom-input" placeholder="Your Query"></textarea>
        `,
    background: "#e9f5ff",
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Submit",

    preConfirm: () => {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const query = document.getElementById("query").value.trim();

      if (!email) {
        Swal.showValidationMessage("Email is required");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.showValidationMessage("Enter a valid email");
        return false;
      }

      return { name, email, query };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "We Will Contact You soon...",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        background: "#ecfdf5",
        color: "#065f46",
      });

      // console.log(result.value);
    }
  });
}

const tabs = document.querySelectorAll(".solution-tab");
const carousel = document.querySelector("#solutionCarousel");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

carousel.addEventListener("slid.bs.carousel", function (e) {
  tabs.forEach(tab => tab.classList.remove("active"));
  tabs[e.to].classList.add("active");
});
