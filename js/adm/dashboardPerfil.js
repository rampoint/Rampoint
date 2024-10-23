// Função para filtrar dados por mês
function filtrarPorMes(dados, mes) {
    const contagemPorMes = {
        doacoes: {},
        pecas: {}
    };

    // Filtra doações
    if (dados.doacoes) {
        for (const chave in dados.doacoes) {
            const data = new Date(dados.doacoes[chave].data);
            if (data.getMonth() + 1 === mes) { // getMonth() retorna 0-11
                const tipo = dados.doacoes[chave].tipo;
                contagemPorMes.doacoes[tipo] = (contagemPorMes.doacoes[tipo] || 0) + 1;
            }
        }
    }

    // Filtra peças dos usuários
    if (dados.users) {
        for (const usuarioId in dados.users) {
            const pecasUsuario = dados.users[usuarioId].peças;
            if (pecasUsuario) {
                for (const pecaId in pecasUsuario) {
                    const data = new Date(pecasUsuario[pecaId].data);
                    if (data.getMonth() + 1 === mes) { // getMonth() retorna 0-11
                        const tipo = pecasUsuario[pecaId].tipo;
                        contagemPorMes.pecas[tipo] = (contagemPorMes.pecas[tipo] || 0) + 1;
                    }
                }
            }
        }
    }

    return contagemPorMes;
}

function procurarMeses(i) {

        const resultado = '' 
        firebase.database().ref().get().then((snapshot) => {
            console.log(i)
            resultado = filtrarPorMes(snapshot.val(), i);
            console.log('Contagem por mês:', resultado);
        })
        console.log(resultado)
        return resultado
    }
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: '',
            align: 'left'
        },
        subtitle: {
            text:
                '' +
                '',
            align: 'left'
        },
        xAxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            crosshair: true,
            accessibility: {
                description: ''
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Doações',
                data: [30, 45, 12, 64, 54, 34]
            },
            {
                name: 'Vistorias',
                data: [45, 14, 10, 14, 19, 11]
            }
        ]
      });
      
    // Filtra dados para o mês de outubro (10)
