document.addEventListener("DOMContentLoaded", () => {

    const btnNovaRodada =
        document.getElementById("btn-nova-rodada");


    // ==========================================
    // ATUALIZAR RESULTADO
    // ==========================================

    function atualizarResultado() {

        const tema =
            window.temaAtual;

        const formato =
            window.formatoAtual;


        // ------------------------------
        // TEMA
        // ------------------------------

        const resumoTema =
            document.getElementById("resumo-tema");

        if (resumoTema && tema) {

            resumoTema.textContent =
                tema.nome ||
                tema.name ||
                tema.titulo ||
                "Tema";

        }


        // ------------------------------
        // FORMATO
        // ------------------------------

        const resumoFormato =
            document.getElementById("resumo-formato");

        if (resumoFormato && formato) {

            resumoFormato.textContent =
                formato.nome ||
                formato.titulo ||
                formato.name ||
                formato;

        }

    }


    // ==========================================
    // NOVA RODADA
    // ==========================================

    if (btnNovaRodada) {

        btnNovaRodada.addEventListener(
            "click",
            novaRodada
        );

    }


    function novaRodada() {

        // Volta para o início
        trocarTela("inicio");


        // Limpa informações anteriores
        limparResultado();

    }


    // ==========================================
    // LIMPAR RESULTADO
    // ==========================================

    function limparResultado() {

        const elementos = [
            "resumo-tema",
            "resumo-pesquisa",
            "resumo-apresentacao",
            "resumo-formato"
        ];


        elementos.forEach(id => {

            const elemento =
                document.getElementById(id);

            if (elemento) {

                elemento.textContent = "—";

            }

        });

    }


    // Disponibiliza globalmente
    window.atualizarResultado =
        atualizarResultado;

});