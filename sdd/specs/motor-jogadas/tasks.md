# Tarefas: Motor de Jogadas

## Milestone: m2-core-logic

### T1: Estrutura Lógica do Tabuleiro
- [ ] Criar constante de mapeamento de cores para as 10 linhas.
- [ ] Implementar gerador de matriz 10x10 com tipos de bola (Cheia/Vazia) alternados.

### T2: Algoritmo da Máquina
- [ ] Implementar função de sorteio de jogador inicial (aleatório).
- [ ] Implementar função `getMachineResponse(line)` que retorna coluna e valor.
- [ ] Validar se o sorteio respeita as colunas candidatas (A, C, E, G, I).

### T3: Ciclo de Turnos
- [ ] Implementar controle de "Vez do Jogador" (alternância entre os 3 participantes).
- [ ] Criar lógica de "Fim de Jogada" (quando os 3 terminam) para resetar o tabuleiro.
- [ ] Integrar com o somador de pontos individual e total.

### T4: Interface do Tabuleiro (Jogadores)
- [ ] Desenvolver o grid 10x10 visual.
- [ ] Implementar botões clicáveis para as linhas (apenas para o jogador ativo).
- [ ] Adicionar animação simples ou destaque visual para a escolha da máquina.

### T5: Sincronização e Logs
- [ ] Emitir evento de "Jogada Concluída" para o log do SQLite.
- [ ] Sincronizar o estado da vez do jogador via LocalStorage para todas as janelas.
