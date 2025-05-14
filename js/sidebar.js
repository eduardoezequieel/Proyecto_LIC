const username = "Ash Ketchum";
const accountNumber = "0987654321";

document.addEventListener("DOMContentLoaded", () => {
  updateBalanceCounter();
});

document.addEventListener("readystatechange", () => {
  if (
    document.readyState === "loading" ||
    document.readyState === "interactive"
  ) {
    // Obtiene la ruta actual de la página
    const currentPage = window.location.pathname;

    // Diccionario para identificar la página activa
    const pagesDictionary = {
      indexPage: currentPage === "/dashboard/index.html",
      transferOrPayPage:
        currentPage === "/dashboard/options/index.html" ||
        currentPage === "/dashboard/options/transfer.html" ||
        currentPage === "/dashboard/options/pay.html" ||
        currentPage === "/dashboard/options/deposit.html" ||
        currentPage === "/dashboard/options/withdraw.html",
      transactionsPage: currentPage === "/dashboard/transactions.html",
    };

    // Encuentra la clave de la página activa
    const activePage = Object.keys(pagesDictionary).find(
      (key) => pagesDictionary[key] === true
    );

    // HTML de la barra lateral
    const sidebarHTML = `
    <div class="mobile-menu closed">
      <div class="d-flex p-4 justify-content-between">
        <div class="logo-container" style="width: fit-content;">
          <img
            src="/resources/images/pokemon_bank_logo.png"
            alt="Pokémon Bank Logo"
            class="logo"
          />
        </div>
        <button type="button" class="mobile-menu-close-button" id="mobile-menu-close-button">
          <img src="/resources/icons/close.svg" alt="close-icon" />
        </button>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center gap-2">
        <span class="heading-section-span">Información del usuario</span>
        <div class="d-flex align-items-center gap-2">
          <div class="profile-picture-container">
            <img src="/resources/icons/user.svg" alt="user-icon" />
          </div>
          <div class="d-flex flex-column">
            <span class="active-user-label">${username}</span>
            <span class="account-number-label">
              #${accountNumber}
            </span>
          </div>
        </div>
      </div>
       <nav class="sidebar-nav d-flex flex-column align-items-center pt-4">
        <span class="heading-section-span">Módulos disponibles</span>
        <ul class="d-flex pt-2 flex-column gap-2">
          <li><a class="nav-item ${
            activePage === "indexPage" ? "active" : ""
          }" href="/dashboard/index.html">Inicio</a></li>
          <li>
            <a class="nav-item ${
              activePage === "transferOrPayPage" ? "active" : ""
            }" href="/dashboard/options/index.html">Transferir o pagar</a>
          </li>
          <li><a class="nav-item ${
            activePage === "transactionsPage" ? "active" : ""
          }" href="/dashboard/transactions.html">Transacciones</a></li>
        </ul>
      </nav>
      <div class="d-flex flex-column align-items-center gap-4 mt-4" style="width: fit-content; margin: auto;">
        <button class="primary-button small w-100 log-out-button" type="button">Cerrar sesión</button>
      </div> 
    </div>
    <div class="mobile-navbar">
      <button type="button" class="mobile-navbar-button" id="mobile-navbar-button">
        <img src="/resources/icons/menu.svg" alt="menu-icon" />
      </button>
    </div>
    <aside class="sidebar">
      <div class="d-flex h-100 w-100 flex-column align-items-start justify-content-between gap-4">
        <div class="d-flex w-100 flex-column align-items-start gap-4">
          <div class="logo-container">
          <img
            src="/resources/images/pokemon_bank_logo.png"
            alt="Pokémon Bank Logo"
            class="logo"
          />
        </div>
        <div class="d-flex flex-column align-items-start gap-2">
          <span class="heading-section-span">Información del usuario</span>
          <div class="d-flex align-items-center gap-2">
            <div class="profile-picture-container">
              <img src="/resources/icons/user.svg" alt="user-icon" />
            </div>
            <div class="d-flex flex-column">
              <span class="active-user-label">${username}</span>
              <span class="account-number-label">
                #${accountNumber}
              </span>
            </div>
          </div>
        </div>
        <nav class="sidebar-nav">
          <span class="heading-section-span">Módulos disponibles</span>
          <ul class="d-flex pt-2 flex-column gap-2">
            <li><a class="nav-item ${
              activePage === "indexPage" ? "active" : ""
            }" href="/dashboard/index.html">Inicio</a></li>
            <li>
              <a class="nav-item ${
                activePage === "transferOrPayPage" ? "active" : ""
              }" href="/dashboard/options/index.html">Transferir o pagar</a>
            </li>
            <li><a class="nav-item ${
              activePage === "transactionsPage" ? "active" : ""
            }" href="/dashboard/transactions.html">Transacciones</a></li>
          </ul>
        </nav>
        </div>
        <button class="primary-button small w-100 log-out-button" type="button">Cerrar sesión</button>
      </div>
    </aside>
    `;

    // Crea un fragmento de documento a partir del HTML de la barra lateral
    const fragment = document
      .createRange()
      .createContextualFragment(sidebarHTML);

    // Inserta la barra lateral al inicio del cuerpo del documento
    document.body.insertBefore(fragment, document.body.firstChild);

    // Ajusta el contenido principal para que tenga en cuenta la barra lateral
    const mainContent =
      document.querySelector(".main-content") || document.createElement("div");
    if (!mainContent.classList.contains("main-content")) {
      // Envuelve el contenido existente que no es la barra lateral
      const contentElements = Array.from(document.body.children).filter(
        (el) => !el.classList.contains("sidebar")
      );
      mainContent.classList.add("main-content");
      contentElements.forEach((el) => mainContent.appendChild(el));
      document.body.appendChild(mainContent);
    }

    document.querySelectorAll(".log-out-button").forEach((item) => {
      item.addEventListener("click", () => {
        Swal.fire({
          title: "Cerrar sesión",
          text: "¿Estás seguro de que quieres cerrar sesión?",
          icon: "warning",
          theme: "dark",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, cerrar sesión",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/index.html";
          }
        });
      });
    });

    document
      .querySelector("#mobile-navbar-button")
      .addEventListener("click", (e) => {
        const mobileMenu = document.querySelector(".mobile-menu");

        mobileMenu.classList.toggle("closed");
        e.stopPropagation();
      });

    document
      .querySelector("#mobile-menu-close-button")
      .addEventListener("click", (e) => {
        const mobileMenu = document.querySelector(".mobile-menu");

        mobileMenu.classList.toggle("closed");
        e.stopPropagation();
      });
  }
});
