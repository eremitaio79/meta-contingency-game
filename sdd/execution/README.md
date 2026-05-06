# EXECUTION

`execution/` concentra plano consolidado, dependencia e status macro.

## Arquivos canonicos
- `plan.yaml`
- `implementation-order.md`
- `dependency-map.md`
- `handoffs/`

## Regra
- nao usar subpastas de backlog, in-progress e done
- status deve viver em arquivo consolidado e rastreavel
- toda execucao relevante concluida deve gerar um handoff numerado em `handoffs/`
- todo novo chat operacional deve ler o handoff mais recente antes de continuar
- se o proximo passo exigir novo chat, o handoff deve registrar titulo sugerido e instrucao inicial
- cada fechamento deve informar handoffs absorvidas quando a execucao consolidar mais de uma continuidade anterior
- cada fechamento deve distinguir handoff operacional de slice funcional
