function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses são 0-indexados
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Função para contar usuários por mês
function contarUsuariosPorMes() {
    const usuariosRef = database.ref('users');

    usuariosRef.once('value', (snapshot) => {
        const usuariosPorMes = {};

        snapshot.forEach((usuarioSnapshot) => {
            const usuario = usuarioSnapshot.val();
            const mesCriacao = formatarData(new Date(usuario.dataCriacao));

            // Contar usuários por mês
            if (!usuariosPorMes[mesCriacao]) {
                usuariosPorMes[mesCriacao] = 0;
            }
            usuariosPorMes[mesCriacao]++;
        });

        // Exibir resultados de usuários no console
        console.log('Usuários por Mês:');
        for (const mes in usuariosPorMes) {
            console.log(`${mes}: ${usuariosPorMes[mes]} usuário(s)`);
        }
    });
}

// Função para contar peças por mês
function contarPecasPorMes() {
    const usuariosRef = database.ref('users');

    usuariosRef.once('value', (snapshot) => {
        const pecasPorMes = {};

        snapshot.forEach((usuarioSnapshot) => {
            const usuario = usuarioSnapshot.val();

            // Contar peças por mês
            if (usuario.peças) {
                for (const pecaId in usuario.peças) {
                    const peca = usuario.peças[pecaId];
                    const mesPeca = formatarData(new Date(peca.data));

                    if (!pecasPorMes[mesPeca]) {
                        pecasPorMes[mesPeca] = 0;
                    }
                    pecasPorMes[mesPeca] += parseInt(peca.qtd, 10); // Adiciona a quantidade da peça
                }
            }
        });

        // Exibir resultados de peças no console
        console.log('Peças por Mês:');
        for (const mes in pecasPorMes) {
            console.log(`${mes}: ${pecasPorMes[mes]} peça(s)`);
        }
    });
}

// Chamar as funções
contarUsuariosPorMes();
contarPecasPorMes();