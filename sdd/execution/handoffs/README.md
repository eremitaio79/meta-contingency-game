# HANDOFFS

`handoffs/` guarda a memoria operacional numerada entre execucoes e chats.

## Objetivo
- permitir retomada limpa em chat novo
- registrar o que foi feito
- registrar o que ficou pendente
- reduzir perda de contexto entre sessoes

## Regra
- toda execucao relevante concluida gera um handoff `.md`
- todo novo chat operacional deve ler o handoff mais recente antes de continuar
- o handoff deve ser curto, objetivo e rastreavel

## Padrao de nome
- `001-briefing-bootstrap.md`
- `002-auth-foundation.md`
- `003-project-sharing.md`

## Conteudo minimo
- data
- chat de origem
- contexto da execucao
- artefatos criados ou alterados
- decisoes tomadas
- handoffs absorvidas nesta execucao, quando aplicavel
- slice funcional concluida, quando aplicavel
- pendencias
- riscos
- proximo passo recomendado
- proxima handoff de entrada recomendada
- proxima slice funcional recomendada, quando aplicavel

## Regra de clareza
- `handoff` numerada representa continuidade operacional registrada em arquivo
- `slice` representa frente funcional de produto ou execucao
- uma mesma execucao pode absorver mais de uma handoff sem significar que varias slices ainda estejam pendentes
- quando isso acontecer, o fechamento deve declarar explicitamente quais handoffs foram absorvidas

## Quando houver recomendacao de novo chat

Se a execucao indicar que o proximo passo deve ocorrer em outro chat, o handoff deve incluir:
- titulo sugerido do novo chat
- instrucao inicial pronta para colar
