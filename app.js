document.addEventListener("DOMContentLoaded", () => {
  console.log("TIDESENVOLVE iniciado");

  // ==========================================
  // BOTÃO INICIAR SESSÃO
  // ==========================================

  const btnIniciar = document.getElementById("btn-iniciar");

  if (btnIniciar) {
    btnIniciar.addEventListener("click", () => {
      console.log("Iniciando sessão...");

      trocarTela("tema");
    });
  } else {
    console.error("ERRO: botão #btn-iniciar não encontrado.");
  }
  // ==========================================
  // INICIAR PESQUISA
  // ==========================================

  const btnIniciarPesquisa = document.getElementById("btn-iniciar-pesquisa");

  if (btnIniciarPesquisa) {
    btnIniciarPesquisa.addEventListener("click", () => {
      console.log("Abrindo cronômetro de pesquisa...");

      // Atualiza o tema na tela de pesquisa
      const pesquisaTema = document.getElementById("pesquisa-tema-atual");

      const fontesTema = document.getElementById("fontes-tema-atual");

      if (pesquisaTema && fontesTema) {
        pesquisaTema.textContent = fontesTema.textContent;
      }

      // Vai para a tela de pesquisa
      trocarTela("pesquisa");
    });
  }

  // ==========================================
  // NOVA RODADA
  // ==========================================

  const btnNovaRodada = document.getElementById("btn-nova-rodada");

  if (btnNovaRodada) {
    btnNovaRodada.addEventListener("click", () => {
      console.log("Iniciando nova rodada...");

      limparSessao();

      trocarTela("inicio");
    });
  }

  // ==========================================
  // INICIALIZAÇÃO DOS ÍCONES
  // ==========================================

  if (window.lucide) {
    lucide.createIcons();
  }
});

// ==========================================
// TROCAR DE TELA
// ==========================================

function trocarTela(nomeTela) {
  console.log("Trocando para tela:", nomeTela);

  // Esconde todas as telas

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  // Procura a tela

  const tela = document.getElementById(`screen-${nomeTela}`);

  if (!tela) {
    console.error(`Tela screen-${nomeTela} não encontrada.`);

    return;
  }

  // Mostra a tela

  tela.classList.add("active");

  // Atualiza barra

  atualizarStage(nomeTela);
}

// ==========================================
// ATUALIZAR ETAPAS
// ==========================================

function atualizarStage(stageAtual) {
  const stages = document.querySelectorAll(".stage-tracker li");

  let encontrouAtual = false;

  stages.forEach((stage) => {
    stage.classList.remove("active");
    stage.classList.remove("completed");

    const nome = stage.dataset.stage;

    if (nome === stageAtual) {
      stage.classList.add("active");

      encontrouAtual = true;
    } else if (!encontrouAtual) {
      stage.classList.add("completed");
    }
  });
}

// ==========================================
// LIMPAR SESSÃO
// ==========================================

function limparSessao() {
  // Tema

  window.temaAtual = null;

  // Formato

  window.formatoAtual = null;

  // Limpa informações visuais

  const elementos = [
    "fontes-tema-atual",
    "pesquisa-tema-atual",
    "formato-tema-atual",
    "apresentacao-formato-atual",

    "resumo-tema",
    "resumo-pesquisa",
    "resumo-apresentacao",
    "resumo-formato",
  ];

  elementos.forEach((id) => {
    const elemento = document.getElementById(id);

    if (elemento) {
      elemento.textContent = "—";
    }
  });
  // ==========================================
// INICIAR PESQUISA
// ==========================================

const btnIniciarPesquisa =
    document.getElementById("btn-iniciar-pesquisa");

if (btnIniciarPesquisa) {

    btnIniciarPesquisa.addEventListener("click", () => {

        console.log("Abrindo cronômetro de pesquisa...");

        // Atualiza o tema na tela de pesquisa
        const pesquisaTema =
            document.getElementById("pesquisa-tema-atual");

        const fontesTema =
            document.getElementById("fontes-tema-atual");

        if (pesquisaTema && fontesTema) {
            pesquisaTema.textContent =
                fontesTema.textContent;
        }

        // Vai para a tela de pesquisa
        trocarTela("pesquisa");

    });

}
}
