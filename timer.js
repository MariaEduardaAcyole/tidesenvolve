document.addEventListener("DOMContentLoaded", () => {
  console.log("Timer.js carregado");

  // ==========================================
  // TIMERS
  // ==========================================

  const timers = {
    pesquisa: {
      total: 15 * 60,
      segundos: 15 * 60,
      intervalo: null,
      rodando: false,
    },

    apresentacao: {
      total: 5 * 60,
      segundos: 5 * 60,
      intervalo: null,
      rodando: false,
    },
  };

  // ==========================================
  // ELEMENTOS - PESQUISA
  // ==========================================

  const pesquisaDisplay = document.getElementById("pesquisa-display");

  const pesquisaStatus = document.getElementById("pesquisa-status");

  const pesquisaRing = document.getElementById("pesquisa-ring");

  const pesquisaPlay = document.getElementById("pesquisa-btn-play");

  const pesquisaRestart = document.getElementById("pesquisa-btn-reiniciar");

  const pesquisaSkip = document.getElementById("pesquisa-btn-skip");

  // ==========================================
  // ELEMENTOS - APRESENTAÇÃO
  // ==========================================

  const apresentacaoDisplay = document.getElementById("apresentacao-display");

  const apresentacaoStatus = document.getElementById("apresentacao-status");

  const apresentacaoRing = document.getElementById("apresentacao-ring");

  const apresentacaoPlay = document.getElementById("apresentacao-btn-play");

  const apresentacaoRestart = document.getElementById(
    "apresentacao-btn-reiniciar",
  );

  const apresentacaoSkip = document.getElementById("apresentacao-btn-skip");

  // ==========================================
  // FORMATAR TEMPO
  // ==========================================

  function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);

    const segundosRestantes = segundos % 60;

    return (
      String(minutos).padStart(2, "0") +
      ":" +
      String(segundosRestantes).padStart(2, "0")
    );
  }

  // ==========================================
  // ATUALIZAR DISPLAY
  // ==========================================

  function atualizarTimer(tipo) {
    const timer = timers[tipo];

    if (!timer) return;

    let display;
    let ring;

    if (tipo === "pesquisa") {
      display = pesquisaDisplay;
      ring = pesquisaRing;
    } else {
      display = apresentacaoDisplay;
      ring = apresentacaoRing;
    }

    // Display

    if (display) {
      display.textContent = formatarTempo(timer.segundos);
    }

    // Anel

    if (ring) {
      const circunferencia = 2 * Math.PI * 100;

      const progresso = timer.segundos / timer.total;

      ring.style.strokeDasharray = circunferencia;

      ring.style.strokeDashoffset = circunferencia * (1 - progresso);
    }
  }

  // ==========================================
  // INICIAR
  // ==========================================

  function iniciarTimer(tipo) {
    const timer = timers[tipo];

    if (!timer) return;

    if (timer.rodando) return;

    console.log("Iniciando timer:", tipo);

    timer.rodando = true;

    const status = tipo === "pesquisa" ? pesquisaStatus : apresentacaoStatus;

    const button = tipo === "pesquisa" ? pesquisaPlay : apresentacaoPlay;

    if (status) {
      status.textContent = "em andamento";
    }

    if (button) {
      button.innerHTML = `
                <i data-lucide="pause"></i>
                Pausar
            `;

      if (window.lucide) {
        lucide.createIcons();
      }
    }

    timer.intervalo = setInterval(() => {
      timer.segundos--;

      atualizarTimer(tipo);

      if (timer.segundos <= 0) {
        finalizarTimer(tipo);
      }
    }, 1000);
  }

  // ==========================================
  // PAUSAR
  // ==========================================

  function pausarTimer(tipo) {
    const timer = timers[tipo];

    if (!timer) return;

    timer.rodando = false;

    clearInterval(timer.intervalo);

    const status = tipo === "pesquisa" ? pesquisaStatus : apresentacaoStatus;

    const button = tipo === "pesquisa" ? pesquisaPlay : apresentacaoPlay;

    if (status) {
      status.textContent = "pausado";
    }

    if (button) {
      button.innerHTML = `
                <i data-lucide="play"></i>
                Continuar
            `;

      if (window.lucide) {
        lucide.createIcons();
      }
    }
  }

  // ==========================================
  // FINALIZAR
  // ==========================================

  function finalizarTimer(tipo) {
    const timer = timers[tipo];

    clearInterval(timer.intervalo);

    timer.rodando = false;
    timer.segundos = 0;

    atualizarTimer(tipo);

    const status = tipo === "pesquisa" ? pesquisaStatus : apresentacaoStatus;

    if (status) {
      status.textContent = "tempo encerrado!";
    }

    // Pesquisa → Formato

    if (tipo === "pesquisa") {
      const resumo = document.getElementById("resumo-pesquisa");

      if (resumo) {
        resumo.textContent = `${timer.total / 60} min`;
      }

      setTimeout(() => {
        trocarTela("formato");
      }, 1000);
    }

    // Apresentação → Resultado

    if (tipo === "apresentacao") {
      const resumo = document.getElementById("resumo-apresentacao");

      if (resumo) {
        resumo.textContent = `${timer.total / 60} min`;
      }

      setTimeout(() => {
        if (typeof window.atualizarResultado === "function") {
          window.atualizarResultado();
        }

        trocarTela("resultado");
      }, 1000);
    }
  }

  // ==========================================
  // REINICIAR
  // ==========================================

  function reiniciarTimer(tipo) {
    const timer = timers[tipo];

    if (!timer) return;

    clearInterval(timer.intervalo);

    timer.segundos = timer.total;

    timer.rodando = false;

    const status = tipo === "pesquisa" ? pesquisaStatus : apresentacaoStatus;

    const button = tipo === "pesquisa" ? pesquisaPlay : apresentacaoPlay;

    if (status) {
      status.textContent = "pronto";
    }

    if (button) {
      button.innerHTML = `
                <i data-lucide="play"></i>
                Iniciar
            `;

      if (window.lucide) {
        lucide.createIcons();
      }
    }

    atualizarTimer(tipo);
  }

  // ==========================================
  // BOTÃO PLAY - PESQUISA
  // ==========================================

  if (pesquisaPlay) {
    pesquisaPlay.addEventListener("click", () => {
      console.log("Botão pesquisa clicado");

      if (timers.pesquisa.rodando) {
        pausarTimer("pesquisa");
      } else {
        iniciarTimer("pesquisa");
      }
    });
  } else {
    console.error("ERRO: #pesquisa-btn-play não encontrado");
  }

  // ==========================================
  // BOTÃO PLAY - APRESENTAÇÃO
  // ==========================================

  if (apresentacaoPlay) {
    apresentacaoPlay.addEventListener("click", () => {
      if (timers.apresentacao.rodando) {
        pausarTimer("apresentacao");
      } else {
        iniciarTimer("apresentacao");
      }
    });
  }

  // ==========================================
  // REINICIAR PESQUISA
  // ==========================================

  if (pesquisaRestart) {
    pesquisaRestart.addEventListener("click", () => {
      reiniciarTimer("pesquisa");
    });
  }

  // ==========================================
  // REINICIAR APRESENTAÇÃO
  // ==========================================

  if (apresentacaoRestart) {
    apresentacaoRestart.addEventListener("click", () => {
      reiniciarTimer("apresentacao");
    });
  }

  // ==========================================
  // PULAR PESQUISA
  // ==========================================

  if (pesquisaSkip) {
    pesquisaSkip.addEventListener("click", () => {
      console.log("Pulando pesquisa...");

      const timer = timers.pesquisa;

      clearInterval(timer.intervalo);

      timer.rodando = false;

      const resumo = document.getElementById("resumo-pesquisa");

      if (resumo) {
        resumo.textContent = `${timer.total / 60} min`;
      }

      trocarTela("formato");
    });
  }

  // ==========================================
  // PULAR APRESENTAÇÃO
  // ==========================================

  if (apresentacaoSkip) {
    apresentacaoSkip.addEventListener("click", () => {
      console.log("Pulando apresentação...");

      const timer = timers.apresentacao;

      clearInterval(timer.intervalo);

      timer.rodando = false;

      const resumo = document.getElementById("resumo-apresentacao");

      if (resumo) {
        resumo.textContent = `${timer.total / 60} min`;
      }

      if (typeof window.atualizarResultado === "function") {
        window.atualizarResultado();
      }

      trocarTela("resultado");
    });
  }

  // ==========================================
  // INICIALIZAR
  // ==========================================

  atualizarTimer("pesquisa");
  atualizarTimer("apresentacao");
});
