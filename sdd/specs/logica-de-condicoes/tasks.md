# Tarefas: Lógica de Condições e Feedback

## Milestone: m2-core-logic

### T1: Implementação do Validador de Culturante
- [ ] Criar função `isCulturant(choices)` que valida linhas pares e cores distintas.
- [ ] Mapear linhas para suas respectivas cores conforme `regras.md`.

### T2: Sistema de Feedback Visual
- [ ] Criar componente de Toast/Mensagem para os jogadores (Condições A e C).
- [ ] Implementar sinal visual de "X" no painel do pesquisador (Condições A e B).
- [ ] Garantir que Condição D e não-culturantes em B não exibam mensagens.

### T3: Motor de Transição de Condição
- [ ] Implementar lógica de contagem de jogadas e culturantes por rodada.
- [ ] Implementar gatilho de 48/60 para A, B, C.
- [ ] Implementar gatilho de 100 jogadas para limite de rodada.

### T4: Lógica Especial da Condição D
- [ ] Implementar captura do histórico de culturantes (últimas 10) ao transicionar de condição.
- [ ] Implementar verificação condicional na jogada 25 da fase D.
- [ ] Garantir que a última condição D da sequência sempre chegue a 100 jogadas.

### T5: Testes Unitários da Lógica
- [ ] Testar múltiplos cenários de escolha de cores (mesma cor em linhas diferentes, cores diferentes).
- [ ] Testar transição antecipada de A/B/C.
- [ ] Testar transição antecipada de D (cenário pass e cenário fail).
- [ ] Testar se a última condição D ignora a regra de 1/3 e segue até 100.
