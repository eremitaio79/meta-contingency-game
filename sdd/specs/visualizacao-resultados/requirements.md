# Requisitos da Feature: Visualização de Resultados em Tela

## 1. Visão Geral
Esta funcionalidade permite que o pesquisador visualize os dados coletados imediatamente após o término do experimento em uma interface web rica, sem a necessidade de abrir o Excel.

## 2. Requisitos Funcionais
- **FR1: Tabela Dinâmica**: Exibir todas as jogadas em uma tabela organizada por blocos de participantes.
- **FR2: Destaque Visual**:
    - Usar as cores oficiais das linhas na coluna de "Cor".
    - Destacar linhas de "Culturante" com um fundo verde suave ou ícone de sucesso.
    - Exibir valores monetários com formatação BRL.
- **FR3: Responsividade**: A tabela deve ser fácil de navegar mesmo com centenas de registros (scroll infinito ou fixo).

## 3. Design Visual
- **Estética**: Seguir o Design System (Glassmorphism).
- **Cores**:
    - Linhas de Culturante: Background `#065f46` (Esmeralda escuro) com borda.
    - Linhas Normais: Background padrão do dashboard.
- **Cabeçalho Fixo**: Para facilitar a leitura de grandes volumes de dados.

## 4. Integração
- O botão para acessar esta página deve aparecer na tela de "Experimento Concluído" do Pesquisador.
- A página deve ler os dados diretamente do `GameState` (via LocalStorage).
