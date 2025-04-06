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
              <span class="active-user-label">Username</span>
              <span class="account-number-label">
                #1234567890
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
        <button class="primary-button small w-100" type="button">Cerrar sesión</button>
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
  }
});
