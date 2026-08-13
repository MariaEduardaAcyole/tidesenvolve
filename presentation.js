document.addEventListener("DOMContentLoaded", () => {
  let formatos = [];
  let formatoAtual = null;
  let sorteando = false;

  const track = document.getElementById("format-slot");

  const btnSortear = document.getElementById("btn-sortear-formato");

  const btnNovamente = document.getElementById("btn-sortear-novamente-formato");

  const resultCard = document.getElementById("formato-result-card");

  const resultNome = document.getElementById("formato-result-nome");

  const resultDesc = document.getElementById("formato-result-desc");

  const resultDicas = document.getElementById("formato-result-dicas");

  // ==========================================
  // CARREGAR JSON
  // ==========================================

  async function carregarFormatos() {
    try {
      const resposta = await fetch("./data/formats.json");

      if (!resposta.ok) {
        throw new Error("Erro ao carregar formats.json");
      }

      const dados = await resposta.json();

      if (Array.isArray(dados)) {
        formatos = dados;
      } else if (Array.isArray(dados.formatos)) {
        formatos = dados.formatos;
      } else if (Array.isArray(dados.formats)) {
        formatos = dados.formats;
      } else {
        throw new Error("Formato do JSON inválido");
      }

      console.log("Formatos carregados:", formatos);

      criarSlot();
    } catch (erro) {
      console.error("Erro:", erro);
    }
  }

  // ==========================================
  // CRIAR SLOT
  // ==========================================

  function criarSlot() {
    track.innerHTML = "";

    // Repetições para dar sensação
    // de roleta infinita

    const repeticoes = 12;

    for (let r = 0; r < repeticoes; r++) {
      formatos.forEach((formato) => {
        const item = document.createElement("div");

        item.className = "format-slot-item";

        item.textContent =
          formato.nome || formato.name || formato.titulo || "Formato";

        track.appendChild(item);
      });
    }
  }

  // ==========================================
  // SORTEAR
  // ==========================================

  function sortearFormato() {
    if (sorteando) return;

    if (!formatos.length) {
      console.warn("Nenhum formato carregado.");

      return;
    }

    sorteando = true;

    btnSortear.disabled = true;

    // Esconde resultado anterior

    resultCard.classList.add("hidden");

    // ======================================
    // ESCOLHER FORMATO
    // ======================================

    const indice = Math.floor(Math.random() * formatos.length);

    formatoAtual = formatos[indice];

    // ======================================
    // CONFIGURAÇÃO
    // ======================================

    const itemHeight = 90;

    const windowHeight = 230;

    const centroOffset = windowHeight / 2 - itemHeight / 2;

    // ======================================
    // VOLTAS
    // ======================================

    const voltas = formatos.length * 7;

    const indiceFinal = voltas + indice;

    const posicaoFinal = indiceFinal * itemHeight - centroOffset;

    // ======================================
    // ANIMAÇÃO
    // ======================================

    track.classList.add("spinning");

    track.style.transition = "transform 5s cubic-bezier(.12,.8,.18,1)";

    track.style.transform = `translateY(-${posicaoFinal}px)`;

    // ======================================
    // FINAL
    // ======================================

    setTimeout(() => {
      track.classList.remove("spinning");

      mostrarResultado(formatoAtual);

      sorteando = false;

      btnSortear.disabled = false;
    }, 5000);
  }

  // ==========================================
  // MOSTRAR RESULTADO
  // ==========================================

  function mostrarResultado(formato) {
    const nome = formato.nome || formato.name || formato.titulo || "Formato";

    const descricao =
      formato.descricao || formato.description || formato.desc || "";

    resultNome.textContent = nome;

    resultDesc.textContent = descricao;

    // ======================================
    // DICAS
    // ======================================

    resultDicas.innerHTML = "";

    const dicas = formato.dicas || formato.tips || [];

    if (Array.isArray(dicas)) {
      dicas.forEach((dica) => {
        const li = document.createElement("li");

        li.textContent = dica;

        resultDicas.appendChild(li);
      });
    }

    resultCard.classList.remove("hidden");

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // ==========================================
  // EVENTOS
  // ==========================================

  if (btnSortear) {
    btnSortear.addEventListener("click", sortearFormato);
  }

  if (btnNovamente) {
    btnNovamente.addEventListener("click", sortearFormato);
  }

  // ==========================================
  // INICIAR
  // ==========================================

  carregarFormatos();
});
document.addEventListener("DOMContentLoaded", () => {
  let formatos = [];
  let formatoAtual = null;
  let sorteando = false;

  const track = document.getElementById("format-slot");

  const btnSortear = document.getElementById("btn-sortear-formato");

  const btnNovamente = document.getElementById("btn-sortear-novamente-formato");

  const resultCard = document.getElementById("formato-result-card");

  const resultNome = document.getElementById("formato-result-nome");

  const resultDesc = document.getElementById("formato-result-desc");

  const resultDicas = document.getElementById("formato-result-dicas");

  // ==========================================
  // CARREGAR JSON
  // ==========================================

  async function carregarFormatos() {
    try {
      const resposta = await fetch("./data/formats.json");

      if (!resposta.ok) {
        throw new Error("Erro ao carregar formats.json");
      }

      const dados = await resposta.json();

      if (Array.isArray(dados)) {
        formatos = dados;
      } else if (Array.isArray(dados.formatos)) {
        formatos = dados.formatos;
      } else if (Array.isArray(dados.formats)) {
        formatos = dados.formats;
      } else {
        throw new Error("Formato do JSON inválido");
      }

      console.log("Formatos carregados:", formatos);

      criarSlot();
    } catch (erro) {
      console.error("Erro:", erro);
    }
  }

  // ==========================================
  // CRIAR SLOT
  // ==========================================

  function criarSlot() {
    track.innerHTML = "";

    // Repetições para dar sensação
    // de roleta infinita

    const repeticoes = 12;

    for (let r = 0; r < repeticoes; r++) {
      formatos.forEach((formato) => {
        const item = document.createElement("div");

        item.className = "format-slot-item";

        item.textContent =
          formato.nome || formato.name || formato.titulo || "Formato";

        track.appendChild(item);
      });
    }
  }

  // ==========================================
  // SORTEAR
  // ==========================================

  function sortearFormato() {
    if (sorteando) return;

    if (!formatos.length) {
      console.warn("Nenhum formato carregado.");

      return;
    }

    sorteando = true;

    btnSortear.disabled = true;

    // Esconde resultado anterior

    resultCard.classList.add("hidden");

    // ======================================
    // ESCOLHER FORMATO
    // ======================================

    const indice = Math.floor(Math.random() * formatos.length);

    formatoAtual = formatos[indice];

    // ======================================
    // CONFIGURAÇÃO
    // ======================================

    const itemHeight = 90;

    const windowHeight = 230;

    const centroOffset = windowHeight / 2 - itemHeight / 2;

    // ======================================
    // VOLTAS
    // ======================================

    const voltas = formatos.length * 7;

    const indiceFinal = voltas + indice;

    const posicaoFinal = indiceFinal * itemHeight - centroOffset;

    // ======================================
    // ANIMAÇÃO
    // ======================================

    track.classList.add("spinning");

    track.style.transition = "transform 5s cubic-bezier(.12,.8,.18,1)";

    track.style.transform = `translateY(-${posicaoFinal}px)`;

    // ======================================
    // FINAL
    // ======================================

    setTimeout(() => {
      track.classList.remove("spinning");

      mostrarResultado(formatoAtual);

      sorteando = false;

      btnSortear.disabled = false;
    }, 5000);
  }

  // ==========================================
  // MOSTRAR RESULTADO
  // ==========================================

  function mostrarResultado(formato) {
    const nome = formato.nome || formato.name || formato.titulo || "Formato";

    const descricao =
      formato.descricao || formato.description || formato.desc || "";

    resultNome.textContent = nome;

    resultDesc.textContent = descricao;

    // ======================================
    // DICAS
    // ======================================

    resultDicas.innerHTML = "";

    const dicas = formato.dicas || formato.tips || [];

    if (Array.isArray(dicas)) {
      dicas.forEach((dica) => {
        const li = document.createElement("li");

        li.textContent = dica;

        resultDicas.appendChild(li);
      });
    }

    resultCard.classList.remove("hidden");

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // ==========================================
  // EVENTOS
  // ==========================================

  if (btnSortear) {
    btnSortear.addEventListener("click", sortearFormato);
  }

  if (btnNovamente) {
    btnNovamente.addEventListener("click", sortearFormato);
  }

  // ==========================================
  // INICIAR
  // ==========================================

  carregarFormatos();
});

document.addEventListener("DOMContentLoaded", () => {
  const btnIrApresentar = document.getElementById("btn-ir-apresentar");

  if (!btnIrApresentar) {
    console.warn("Botão #btn-ir-apresentar não encontrado.");
    return;
  }

  btnIrApresentar.addEventListener("click", () => {
    // ==========================================
    // PEGAR FORMATO SORTEADO
    // ==========================================

    const formatoNome = document.getElementById("formato-result-nome");

    const formato = formatoNome?.textContent?.trim();

    if (!formato || formato === "—") {
      console.warn("Nenhum formato foi sorteado.");
      return;
    }

    // ==========================================
    // COLOCAR FORMATO NA TELA DE APRESENTAÇÃO
    // ==========================================

    const apresentacaoFormato = document.getElementById(
      "apresentacao-formato-atual",
    );

    if (apresentacaoFormato) {
      apresentacaoFormato.textContent = formato;
    }

    // ==========================================
    // IR PARA APRESENTAÇÃO
    // ==========================================

    if (typeof trocarTela === "function") {
      trocarTela("apresentacao");
    } else {
      console.error("A função trocarTela() não foi encontrada.");
    }
  });
});
btnIrApresentar.addEventListener("click", () => {
  const formato = document
    .getElementById("formato-result-nome")
    ?.textContent?.trim();

  if (!formato || formato === "—") return;

  const destino = document.getElementById("apresentacao-formato-atual");

  if (destino) {
    destino.textContent = formato;
  }

  trocarTela("apresentacao");

  // Pequeno efeito visual
  const tela = document.getElementById("screen-apresentacao");

  if (tela) {
    tela.classList.remove("screen-enter");

    void tela.offsetWidth;

    tela.classList.add("screen-enter");
  }
});