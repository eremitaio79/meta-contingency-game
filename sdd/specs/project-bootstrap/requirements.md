# Requirements

## Metadata
- Feature: project-bootstrap
- Owner: Red
- Status: Draft
- Priority: High

## Problem
Novos projetos iniciados com IA costumam começar com contexto incompleto, leitura desordenada e artefatos dispersos. Isso faz cada provider reconstruir entendimento do zero e aumenta o risco de specs fracas, contratos ausentes e execucao desalinhada.

## Objective
Garantir que todo novo projeto possa iniciar com um briefing estruturado, contexto minimo suficiente e ordem de leitura previsivel para qualquer provider de IA.

## Scope
- In scope:
  - definir bootstrap documental do projeto
  - registrar briefing inicial
  - orientar leitura progressiva por IA
  - estabelecer rastreabilidade minima entre artefatos
- Out of scope:
  - implementacao do sistema de negocio do projeto
  - automacao obrigatoria de CLI, wizard ou UI
  - integracao com provider especifico

## Business Rules
- Rule: Nenhuma execucao relevante deve iniciar sem briefing minimo em `PROJECT-INIT.md`.
- Rule: Toda feature relevante deve nascer em `specs/<feature-slug>/`.
- Rule: Toda decisao estrutural relevante deve ser registrada em `decisions/`.
- Rule: Todo teste relevante deve referenciar a SPEC de origem.

## Requirements (EARS)
- Quando um novo projeto for iniciado, o sistema documental deve fornecer um ponto de entrada canonico para leitura humana e por IA.
- Quando houver uma demanda relevante, o sistema documental deve exigir uma SPEC propria em `specs/<feature-slug>/`.
- Se o briefing inicial estiver incompleto em pontos criticos, o sistema documental deve sinalizar que o bootstrap ocorre com pendencias.
- Enquanto uma feature estiver em definicao, o sistema documental deve manter rastreabilidade entre contexto, SPEC, contratos, decisoes e testes.
- Onde houver contrato tecnico reutilizavel, o sistema documental deve registrá-lo em `contracts/`.
- O sistema documental deve permitir uso por qualquer provider de IA sem dependencia de ferramenta proprietaria.

## Acceptance Criteria
- Dado um novo projeto, quando a equipe abrir `sdd/README.md`, entao deve ficar claro por onde comecar.
- Dado uma nova feature, quando a equipe criar sua pasta em `specs/`, entao ela deve usar `requirements.md`, `design.md` e `tasks.md`.
- Dado uma decisao estrutural, quando ela for tomada, entao deve existir um ADR rastreavel.
- Dado um teste derivado, quando ele for escrito, entao deve apontar para a SPEC de origem.

## Risks
- Risk: Times podem continuar criando artefatos fora da estrutura canonica.
- Risk: Providers podem ignorar rastreabilidade se ela nao for mantida na rotina.

## Traceability
- Related context: `sdd/context/product/project-overview.md`
- Related contracts: `sdd/contracts/api/openapi.yaml`
- Related decisions: `sdd/decisions/ADR-001-universal-sdd-structure.md`
- Related tests: `sdd/tests/acceptance/project-bootstrap.md`
