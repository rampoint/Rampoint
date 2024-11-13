// Inicializa o Firebase (substitua as credenciais pelo seu projeto)

// Função para buscar e listar doações por mês com quantidade e tipo da peça
function listarQuantidadeTipoPorMes() {
    database.ref('doacoes').once('value').then(snapshot => {
        const doacoes = snapshot.val();
        const doacoesPorMes = {};

        // Agrupa as doações por mês
        for (const key in doacoes) {
            const doacao = doacoes[key];
            const dataDoacao = new Date(doacao.data);
            const mes = dataDoacao.getMonth() + 1; // Mês em formato 1-12
            
            // Inicializa o mês se não existir
            if (!doacoesPorMes[mes]) {
                doacoesPorMes[mes] = [];
            }

            // Adiciona a quantidade e tipo da peça ao mês correspondente
            doacoesPorMes[mes].push({
                qtd: doacao.qtd,
                tipo: doacao.tipo
            });
        }

        // Exibe as quantidades e tipos agrupados por mês
        for (let mes = 1; mes <= 12; mes++) {
            console.log(`\nMês ${mes}:`);
            if (doacoesPorMes[mes]) {
                doacoesPorMes[mes].forEach(doacao => {
                    console.log(`- Quantidade: ${doacao.qtd}, Tipo: ${doacao.tipo}`);
                });
            } else {
                console.log("Nenhuma doação registrada.");
            }
        }
    }).catch(error => {
        console.error("Erro ao buscar doações:", error);
    });
}

// Chama a função para listar as quantidades e tipos por mês
listarQuantidadeTipoPorMes();