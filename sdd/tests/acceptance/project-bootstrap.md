# Acceptance Tests - project-bootstrap

## Source Spec
- `sdd/specs/project-bootstrap/requirements.md`

## Acceptance Coverage
- AC1: leitura inicial encontra ponto de entrada claro
- AC2: nova feature usa estrutura padrao em `specs/<feature-slug>/`
- AC3: ADR existe para decisao estrutural
- AC4: teste aponta para SPEC de origem

## Scenarios
- Dado um novo projeto sem contexto previo, quando a equipe ler `sdd/README.md`, entao deve conseguir iniciar o bootstrap.
- Dado uma nova feature, quando a pasta for criada em `specs/`, entao ela deve conter `requirements.md`, `design.md` e `tasks.md`.
- Dado uma mudanca estrutural, quando ela for aprovada, entao deve existir um ADR correspondente em `decisions/`.
- Dado um teste derivado, quando ele for revisado, entao deve haver referencia para a SPEC de origem.
