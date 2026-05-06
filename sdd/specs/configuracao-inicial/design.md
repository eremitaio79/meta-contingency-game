# Design Técnico: Configuração e Início do Jogo

## 1. Arquitetura de Sincronização

A sincronização entre as janelas (Pesquisador e Jogadores) será baseada em **LocalStorage Broadcast**.

### Mecanismo de Comunicação
- **Escrita**: A janela que altera o estado (ex: Pesquisador inicia o jogo ou Jogador faz uma jogada) atualiza uma chave específica no `localStorage` (ex: `mcg_game_state`).
- **Leitura**: Todas as janelas escutam o evento global `storage`. Quando uma alteração ocorre, o listener dispara e atualiza o estado local do React.
- **Vantagem**: Simplicidade técnica para o MVP, sem necessidade de servidores de WebSocket ou complexidade de SharedWorkers.

```javascript
// Exemplo de Listener de Sincronização
window.addEventListener('storage', (event) => {
  if (event.key === 'mcg_game_state') {
    const newState = JSON.parse(event.newValue);
    updateLocalAppState(newState);
  }
});
```

## 2. Estratégia de Persistência (SQLite)

O SQLite será utilizado para garantir a integridade dos dados e permitir a continuidade de experimentos.

### Uso do Banco de Dados
- **Log de Eventos**: Cada ação (clique, mudança de condição, atribuição de pontos) será registrada com timestamp.
- **Snapshots de Estado**: A cada jogada concluída, o estado completo do jogo (quem é o próximo jogador, rodada atual, acumulado de pontos, progresso da condição) será salvo em uma tabela `game_sessions`.
- **Pausa e Retorno**: Ao iniciar o app, o sistema verificará se existe uma sessão pendente no SQLite. Se houver, oferecerá a opção de "Retomar Experimento".

## 3. Estrutura de Dados (Draft)

### Chave LocalStorage: `mcg_game_state`
```json
{
  "status": "configuring | in_progress | paused | finished",
  "config": {
    "players": ["Nome 1", "Nome 2", "Nome 3"],
    "sequence": "ADBDCD"
  },
  "currentSession": {
    "conditionIndex": 0,
    "playCount": 0,
    "culturantCount": 0,
    "scores": [0, 0, 0]
  }
}
```

## 4. Interface e Layout

### Janela de Configuração (Modal ou Rota Inicial)
- Formulário simples com 3 inputs de texto.
- Select/Dropdown para as sequências de condições.
- Botão "Iniciar" que valida e abre a nova janela dos jogadores.

### Hero Card com Arte de Fundo
- A tela inicial deverá usar uma imagem fixa de fundo, de proporção horizontal ampla, posicionada atrás do card principal do título.
- O card principal deverá ter:
  - fundo escuro translúcido
  - borda sutil
  - blur leve
  - contraste alto para título e texto
- A imagem deve permanecer parcialmente visível por trás do card, sem competir com a legibilidade do conteúdo.

### Botão de Instruções e Modal
- O card principal deverá incluir um botão adicional: `Instruções do Jogo`.
- O clique abrirá um modal central com:
  - cabeçalho forte
  - blocos curtos por tema
  - fechamento explícito
  - overlay semitransparente
- O modal deve servir como onboarding rápido do pesquisador antes da configuração.

### Diretriz de Densidade Vertical
- A tela inicial deve priorizar leitura e ação com o menor deslocamento vertical razoável.
- Conteúdos secundários ou explicativos podem migrar para modal, accordion ou drawer lateral quando isso reduzir altura total sem prejudicar compreensão.
- A composição final deve privilegiar "first screen usability", deixando o bloco principal utilizável já no primeiro enquadramento em monitores comuns.

### Abertura de Janelas
O pesquisador inicia o app. Após configurar:
1. A janela atual se transforma no **Painel do Pesquisador**.
2. O sistema executa `window.open('/players', 'PlayerView', 'width=1000,height=800')` para abrir a tela do tabuleiro.

## 5. Riscos e Mitigações
- **Concorrência**: Como as janelas são síncronas em relação ao LocalStorage, o risco de "race conditions" é baixo para 3 jogadores em uma mesma máquina física.
- **Limitação de Espaço**: LocalStorage tem limite (~5MB), mas para o estado do jogo (texto simples), é mais que suficiente. O log pesado ficará no SQLite.
- **Ruído Visual**: A imagem de fundo não deve poluir a leitura; usar máscara escura, blur e contraste controlado.
