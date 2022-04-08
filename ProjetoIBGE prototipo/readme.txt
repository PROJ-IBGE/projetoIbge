Alterações até o dia 08/04/2022:

No arquivo HTML linhas:
1 - Adicionado:

    1.1 - divs que retornam as malhas dos estados e cidades nas respectivas linhas: 89~138.
    1.2 - Para que as inputs checkbox sejam exibidas uma em baixo da outra, foram cada uma dentro de uma label. Linhas: 61~78.
    
2 - Alterações:
    2.1 - As variáveis municípios/M foram alteradas para cidade/C

No arquivo javascript
1 - Adicionado:
    
    1.1 - Malhas Geográficas para estado e cidade nas respectivas linhas: 144 e 181.

2 - Alterações:

    2.1 - Quando um município é escolhido e depois é clicado no botão de consultar não é mais 
    exibido as informações do estado junto com a do município nas respectivas linhas: 62, 90, 119.
    OBS: Quando um município não é escolhido aparecerá as informações do estado após o botão consultar ser clicado e
    permanecerá na tela mesmo se um município for escolhido após esse processo.

    2.2 - As variáveis municípios/M foram alteradas para cidade/C

    2.3 - A função que retorna o gráfico de população de uma cidade foi movida para a função: $("#slctPopulacao").change(function(){}) da linha: 245

    2.4 - O select para comparar a população de ano com um outro agora só aparece quando o checkbox relacionado a 
    população é selecionado. Linha: 260.
    OBS: A alteração é apenas para a população da cidade.

    2.5 - Correção para o erro: "Canvas is already in use. Chart with ID '0' must be destroyed before the canvas can be reused."
    OBS: Ainda é necessário fazer mais testes.
    OBS1: O erro está concertado enquanto a cidade ainda é a mesma.
    OBS2: O erro volta a ser gerado quando uma outra cidade é selecionada sem atualizar a página.