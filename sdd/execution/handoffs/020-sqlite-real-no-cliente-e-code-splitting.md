# Handoff 020: SQLite Real no Cliente e Code Splitting

## Data:
Fri May 01 2026

## Escopo desta execução:
- Introduzir SQLite real no cliente para persistência local.
- Reduzir o peso do bundle inicial com carregamento sob demanda.

## Entregas realizadas:
- Dependência `sql.js` integrada ao projeto.
- Repositório SQLite cliente adicionado com:
  - schema para `sessions`
  - schema para `plays`
  - persistência do arquivo SQLite em `IndexedDB`
- Fluxo de gravação ajustado para espelhar snapshots e jogadas também em SQLite.
- Recuperação de sessão ajustada para priorizar o snapshot vindo do SQLite.
- Exportação ajustada para priorizar leituras das jogadas persistidas em SQLite.
- App convertido para `lazy routes` com `Suspense`.
- `exceljs` passou a ser carregado via `dynamic import`, deixando de pesar no bootstrap inicial.
- Ajustados atributos de formulário para remover warnings de acessibilidade/qualidade no navegador.

## Validação executada:
- `npm run test`: ok
- `npm run build`: ok
- Teste manual em navegador local:
  - tela inicial carregando sem warnings de console: ok
  - sessão persistida ainda visível e retomável: ok

## Leitura técnica do estado atual:
- A aplicação agora possui SQLite real em execução no cliente via WASM, persistido localmente.
- O bundle inicial ficou muito mais saudável:
  - páginas principais divididas em chunks
  - exportação pesada isolada em chunk próprio
- Ainda existe peso relevante em:
  - `exceljs`
  - `sql-wasm.wasm`
  mas ambos deixaram de bloquear totalmente a carga inicial.

## Estado do projeto:
- **Persistência SQLite real**: Ativa no cliente
- **Code splitting básico**: Ativo
- **Fluxo jogável**: Preservado

## Pendências relevantes:
- Avaliar extração de outras dependências pesadas para reduzir ainda mais o bootstrap.
- Cobrir com testes automatizados a integração entre SQLite, restauração e exportação.
- Validar exportação real de arquivo em cenário multi-sessão no navegador.

## Handoffs Absorvidos:
- Continua a partir do `Handoff 019`.
