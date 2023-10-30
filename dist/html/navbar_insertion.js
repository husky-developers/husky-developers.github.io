function insertNavbar() {
  const navbar = `
        <!-- Source Code Pro font -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@600&display=swap" rel="stylesheet">

        <!-- Icon -->
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css" rel="stylesheet">

        <nav class="navbar navbar-expand-lg fixed-bottom" style="background-color: #000000;" id="navbar-page">
            <div class="container px-4">
                <a href="../" style="display: block;">
                    <img src="../assets/images/logos/title.jpg" style="height: 35px; padding-right: 20px;">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span
                        class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" style="color: lightgrey; font-family: 'Source Code Pro', monospace;"
                                href="https://discord.gg/f8bgHjehb7">
                                Discord
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: lightgrey; font-family: 'Source Code Pro', monospace;"
                                href="https://www.instagram.com/huskydevelopers/">
                                Instagram
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: lightgrey; font-family: 'Source Code Pro', monospace;"
                                href="https://uconntact.uconn.edu/organization/huskydevelopers">
                                UConntact
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="color: lightgrey; font-family: 'Source Code Pro', monospace;"
                                href="../html/documentation.html">
                                Documentation
                            </a>
                        </li>
                        <li class="nav-item">&nbsp;&nbsp;
                            <button class="btn btn-outline-secondary" onclick="toggleDarkMode()">
                                <i class="ri-sun-line"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
  document.body.insertAdjacentHTML("beforeend", navbar);
}

insertNavbar();

let darkmode = false;
function toggleDarkMode() {
  if (darkmode) {
    document.getElementById("html-doc").setAttribute("data-bs-theme", "dark");
    document.getElementById("body").style.backgroundColor = "#000000";
    document.getElementById("body").style.color = "#efefef";
  } else {
    document.getElementById("html-doc").setAttribute("data-bs-theme", "light");
    document.getElementById("body").style.backgroundColor = "#efefef";
    document.getElementById("body").style.color = "#000000";
  }
  darkmode = !darkmode;
}
