document.addEventListener("DOMContentLoaded", () => {
  let categorias = [];
  let categoriaAtual = "todos";

  const tabs = document.getElementById("fontes-tabs");

  const sourcesGrid = document.getElementById("sources-grid");

  /* ==========================================
       CARREGAR SOURCES.JSON
    ========================================== */

  async function carregarFontes() {
    try {
      const response = await fetch("./data/sources.json");

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const data = await response.json();

      console.log("Fontes carregadas:", data);

      if (!Array.isArray(data.categorias)) {
        throw new Error("O sources.json não possui um array 'categorias'.");
      }

      categorias = data.categorias;

      criarTabs();

      mostrarFontes("todos");
    } catch (error) {
      console.error("Erro ao carregar fontes:", error);

      sourcesGrid.innerHTML = `
                <div class="sources-error">
                    <i data-lucide="alert-circle"></i>

                    <h3>
                        Não foi possível carregar as fontes
                    </h3>

                    <p>
                        Verifique se o arquivo
                        <strong>data/sources.json</strong>
                        está no local correto.
                    </p>
                </div>
            `;

      if (window.lucide) {
        lucide.createIcons();
      }
    }
  }

  /* ==========================================
       CRIAR ABAS
    ========================================== */

  function criarTabs() {
    tabs.innerHTML = "";

    // Aba TODAS

    const tabTodos = criarTab("todos", "Todas", "layers");

    tabs.appendChild(tabTodos);

    // Abas das categorias

    categorias.forEach((categoria) => {
      const tab = criarTab(categoria.id, categoria.nome, categoria.icone);

      tabs.appendChild(tab);
    });
  }

  /* ==========================================
       CRIAR TAB
    ========================================== */

  function criarTab(id, nome, icone) {
    const button = document.createElement("button");

    button.className = "source-tab";

    if (id === "todos") {
      button.classList.add("active");
    }

    button.dataset.category = id;

    button.innerHTML = `
            <i data-lucide="${icone}"></i>
            <span>${nome}</span>
        `;

    button.addEventListener("click", () => {
      selecionarCategoria(id);
    });

    return button;
  }

  /* ==========================================
       SELECIONAR CATEGORIA
    ========================================== */

  function selecionarCategoria(id) {
    categoriaAtual = id;

    document.querySelectorAll(".source-tab").forEach((tab) => {
      tab.classList.remove("active");

      if (tab.dataset.category === id) {
        tab.classList.add("active");
      }
    });

    mostrarFontes(id);
  }

  /* ==========================================
       MOSTRAR FONTES
    ========================================== */

  function mostrarFontes(categoriaId) {
    sourcesGrid.innerHTML = "";

    let fontes = [];

    /* --------------------------------------
           TODAS
        -------------------------------------- */

    if (categoriaId === "todos") {
      categorias.forEach((categoria) => {
        categoria.fontes.forEach((fonte) => {
          fontes.push({
            ...fonte,

            categoria: categoria.nome,

            categoriaId: categoria.id,
          });
        });
      });
    } else {

    /* --------------------------------------
           CATEGORIA ESPECÍFICA
        -------------------------------------- */
      const categoria = categorias.find((item) => item.id === categoriaId);

      if (categoria) {
        fontes = categoria.fontes.map((fonte) => ({
          ...fonte,

          categoria: categoria.nome,

          categoriaId: categoria.id,
        }));
      }
    }

    /* --------------------------------------
           SEM RESULTADOS
        -------------------------------------- */

    if (fontes.length === 0) {
      sourcesGrid.innerHTML = `
                <div class="sources-empty">

                    <i data-lucide="search-x"></i>

                    <h3>
                        Nenhuma fonte encontrada
                    </h3>

                </div>
            `;

      lucide.createIcons();

      return;
    }

    /* --------------------------------------
           CRIAR CARDS
        -------------------------------------- */

    fontes.forEach((fonte) => {
      const card = criarCardFonte(fonte);

      sourcesGrid.appendChild(card);
    });

    // Ativa os ícones Lucide

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /* ==========================================
       CRIAR CARD
    ========================================== */

  function criarCardFonte(fonte) {
    const card = document.createElement("article");

    card.className = "source-card";

    card.innerHTML = `

            <div class="source-card-top">

                <div class="source-icon">

                    <i
                        data-lucide="${fonte.icone || "book-open"}"
                    ></i>

                </div>

                <span class="source-category">
                    ${fonte.categoria}
                </span>

            </div>


            <div class="source-card-content">

                <h3>
                    ${fonte.nome}
                </h3>

                <p>
                    ${fonte.descricao}
                </p>

            </div>


            <a
                href="${fonte.link}"
                target="_blank"
                rel="noopener noreferrer"
                class="source-link"
            >

                Acessar fonte

                <i data-lucide="external-link"></i>

            </a>

        `;

    return card;
  }

  /* ==========================================
       INICIALIZAR
    ========================================== */

  carregarFontes();
});
