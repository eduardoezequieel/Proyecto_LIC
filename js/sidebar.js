document.addEventListener("readystatechange", () => {
  if (
    document.readyState === "loading" ||
    document.readyState === "interactive"
  ) {
    const currentPage = window.location.pathname.split("/").pop();

    const navbar = `
      <aside class="sidebar">
      <div class="d-flex flex-column align-items-start gap-4">
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
            <span class="active-user-label">Username</span>
          </div>
        </div>
        <nav class="sidebar-nav">
          <span class="heading-section-span">Módulos disponibles</span>
          <ul class="d-flex pt-2 flex-column gap-2">
            <li><a class="nav-item ${
              currentPage === "index.html" ? "active" : ""
            }" href="../index.html">Inicio</a></li>
            <li>
              <a class="nav-item" href="../pokedex/index.html">Pokédex</a>
            </li>
            <li><a class="nav-item" href="../team/index.html">Equipo</a></li>
            <li><a class="nav-item" href="../battle/index.html">Batalla</a></li>
            <li>
              <a class="nav-item" href="../trading/index.html">Intercambio</a>
            </li>
            <li>
              <a class="nav-item" href="../settings/index.html"
                >Configuración</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </aside>
    `;

    document.body.appendChild(
      document.createRange().createContextualFragment(navbar)
    );
  }
});
