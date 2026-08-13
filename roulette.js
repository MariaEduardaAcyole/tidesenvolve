document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
       ESTADO
    ========================================== */

  let temas = [];
  let temaAtual = null;
  let girando = false;

  let tickInterval = null;

  /* ==========================================
       ELEMENTOS
    ========================================== */

  const track = document.getElementById("slot-track");

  const btnGirar = document.getElementById("btn-girar");

  const lever = document.getElementById("slot-lever");

  const btnAceitarTema = document.getElementById("btn-aceitar-tema");

  /* ==========================================
       SONS
    ========================================== */

  const soundLever = document.getElementById("sound-lever");

  const soundTick = document.getElementById("sound-tick");

  const soundWin = document.getElementById("sound-win");

  /* ==========================================
       CONFIGURAÇÕES
    ========================================== */

  const itemHeight = 60;
  const windowHeight = 180;

  const duracaoGiro = 5000;

  /* ==========================================
       CARREGAR TEMAS
    ========================================== */

  async function carregarTemas() {
    try {
      const response = await fetch("./data/themes.json");

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const data = await response.json();

      console.log("JSON carregado:", data);

      /* ------------------------------
               Detecta formato do JSON
            ------------------------------ */

      if (Array.isArray(data)) {
        temas = data;
      } else if (Array.isArray(data.temas)) {
        temas = data.temas;
      } else if (Array.isArray(data.themes)) {
        temas = data.themes;
      } else {
        throw new Error("Formato do themes.json não reconhecido.");
      }

      if (temas.length === 0) {
        throw new Error("Nenhum tema encontrado.");
      }

      console.log("Quantidade de temas:", temas.length);

      criarTrack();
    } catch (error) {
      console.error("Erro ao carregar temas:", error);

      if (track) {
        track.innerHTML = `
                    <div class="slot-item">
                        Erro ao carregar temas
                    </div>
                `;
      }
    }
  }

  /* ==========================================
       CRIAR TRILHO
    ========================================== */

  function criarTrack() {
    if (!track) return;

    track.innerHTML = "";

    /*
     * Repetimos os temas várias vezes.
     * Isso cria o efeito de máquina infinita.
     */

    const repeticoes = 12;

    for (let repeticao = 0; repeticao < repeticoes; repeticao++) {
      temas.forEach((tema) => {
        const item = document.createElement("div");

        item.className = "slot-item";

        item.textContent = obterNomeTema(tema);

        track.appendChild(item);
      });
    }
  }

  /* ==========================================
       PEGAR NOME
    ========================================== */

  function obterNomeTema(tema) {
    return tema.nome || tema.name || tema.titulo || "Tema";
  }

  /* ==========================================
       PEGAR CATEGORIA
    ========================================== */

  function obterCategoria(tema) {
    return tema.categoria || tema.category || tema.tipo || "Tecnologia";
  }

  /* ==========================================
       SOM
    ========================================== */

  function tocarSom(audio) {
    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch(() => {
      /*
       * O navegador pode bloquear áudio
       * até existir interação do usuário.
       */
    });
  }

  /* ==========================================
       MANIVELA
    ========================================== */

  function puxarManivela() {
    if (girando) return;

    if (lever) {
      lever.classList.remove("pulling");

      /*
       * Força o navegador a reiniciar
       * a animação CSS.
       */

      void lever.offsetWidth;

      lever.classList.add("pulling");
    }

    tocarSom(soundLever);

    girarRoleta();
  }

  /* ==========================================
       GIRAR ROLETA
    ========================================== */

  function girarRoleta() {
    if (girando) return;

    if (!temas.length) {
      console.warn("Nenhum tema disponível.");

      return;
    }

    girando = true;

    if (btnGirar) {
      btnGirar.disabled = true;
    }

    if (btnAceitarTema) {
      btnAceitarTema.disabled = true;
    }

    /* --------------------------------------
           ESCOLHER TEMA
        -------------------------------------- */

    const indice = Math.floor(Math.random() * temas.length);

    temaAtual = temas[indice];

    console.log("Tema sorteado:", temaAtual);

    /* --------------------------------------
           VOLTAS
        -------------------------------------- */

    const voltas = temas.length * 7;

    const indiceFinal = voltas + indice;

    /* --------------------------------------
           CENTRALIZAR ITEM
        -------------------------------------- */

    const centroOffset = windowHeight / 2 - itemHeight / 2;

    const posicaoFinal = indiceFinal * itemHeight - centroOffset;

    /* --------------------------------------
           ANIMAÇÃO
        -------------------------------------- */

    track.style.transition = `transform ${duracaoGiro}ms cubic-bezier(.12,.8,.18,1)`;

    track.style.transform = `translateY(-${posicaoFinal}px)`;

    /* --------------------------------------
           SOM
        -------------------------------------- */

    iniciarTicks();

    /* --------------------------------------
           FINAL
        -------------------------------------- */

    setTimeout(() => {
      pararTicks();

      tocarSom(soundWin);

      mostrarResultado(temaAtual);

      girando = false;

      if (btnGirar) {
        btnGirar.disabled = false;
      }

      if (btnAceitarTema) {
        btnAceitarTema.disabled = false;
      }
    }, duracaoGiro);
  }

  /* ==========================================
       TICK DA ROLETA
    ========================================== */

  function iniciarTicks() {
    pararTicks();

    let intervalo = 80;

    function tick() {
      if (!girando) return;

      tocarSom(soundTick);

      intervalo *= 1.08;

      if (intervalo < 350) {
        tickInterval = setTimeout(tick, intervalo);
      }
    }

    tick();
  }

  /* ==========================================
       PARAR TICKS
    ========================================== */

  function pararTicks() {
    if (tickInterval) {
      clearTimeout(tickInterval);

      tickInterval = null;
    }
  }

  /* ==========================================
       MOSTRAR RESULTADO
    ========================================== */

  function mostrarResultado(tema) {
    if (!tema) return;

    const nome = obterNomeTema(tema);

    const categoria = obterCategoria(tema);

    const nomeElement = document.getElementById("tema-result-nome");

    const categoriaElement = document.getElementById("tema-result-categoria");

    const card = document.getElementById("tema-result-card");

    if (nomeElement) {
      nomeElement.textContent = nome;
    }

    if (categoriaElement) {
      categoriaElement.textContent = categoria;
    }

    if (card) {
      card.classList.remove("hidden");
    }
  }

  /* ==========================================
       ACEITAR TEMA
    ========================================== */

  function aceitarTema() {
    if (!temaAtual) {
      console.warn("Nenhum tema foi sorteado.");

      return;
    }

    const nome = obterNomeTema(temaAtual);

    console.log("Tema aceito:", temaAtual);

    /* --------------------------------------
           PASSAR TEMA PARA A TELA DE FONTES
        -------------------------------------- */

    const fontesTema = document.getElementById("fontes-tema-atual");

    if (fontesTema) {
      fontesTema.textContent = nome;
    }

    /* --------------------------------------
           TROCAR TELA
        -------------------------------------- */

    trocarTela("fontes");
  }

  /* ==========================================
       EVENTOS
    ========================================== */

  if (lever) {
    lever.addEventListener("click", puxarManivela);
  }

  if (btnGirar) {
    btnGirar.addEventListener("click", puxarManivela);
  }

  if (btnAceitarTema) {
    btnAceitarTema.addEventListener("click", aceitarTema);
  }

  /* ==========================================
       INICIAR
    ========================================== */

  carregarTemas();
});
