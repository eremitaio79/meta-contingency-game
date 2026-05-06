# Tarefas: Configuração e Início do Jogo

## Milestone: m1-bootstrap

### T1: Estrutura Base do Projeto
- [ ] Inicializar projeto React (Vite)
- [ ] Configurar roteamento básico (`/` para config/pesquisador, `/players` para tabuleiro)
- [ ] Configurar suporte a SQLite (instalação de dependências e script de inicialização do banco)

### T2: Interface de Configuração
- [ ] Criar componente de formulário para nomes dos 3 jogadores
- [ ] Implementar dropdown com as sequências de condições pré-definidas
- [ ] Adicionar validações (nomes não vazios, sequência selecionada)

### T3: Lógica de Inicialização e Sincronização
- [ ] Implementar função de "Iniciar Jogo" que:
    - Salva configuração inicial no SQLite.
    - Atualiza `localStorage` com o estado `in_progress`.
    - Abre a janela `/players`.
- [ ] Criar hook ou provider de contexto para escutar mudanças no `localStorage` e sincronizar o estado entre as janelas.

### T4: Persistência (SQLite)
- [ ] Criar esquema de banco para sessões de jogo e logs.
- [ ] Implementar função para salvar o snapshot inicial da configuração.
- [ ] Implementar verificação de "Sessão Pendente" ao carregar a tela inicial.

### T5: Testes de Integração Inicial
- [ ] Validar se a abertura da janela de jogadores reflete o estado configurado.
- [ ] Testar persistência básica (fechar e abrir o app e ver se a config permanece no SQLite).
