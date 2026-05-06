# Design System & Identidade Visual (MCG)

## 1. Conceito Visual
O Meta Contingency Game (MCG) deve transmitir uma estética **profissional, científica e moderna**. O objetivo é evitar o aspecto de "jogo amador" e passar a credibilidade de uma ferramenta de pesquisa acadêmica.

### Atributos da Marca
- **Precisão**: Layouts alinhados ao grid, tipografia limpa.
- **Clareza**: Hierarquia visual bem definida para que o pesquisador não se perca em dados.
- **Foco**: Interface dos jogadores livre de distrações, com animações suaves.

## 2. Tipografia
- **Principal**: `Inter` ou `Roboto` (Sans-serif modernas e altamente legíveis).
- **Títulos**: Semibold com maior espaçamento entre letras (tracking).
- **Dados Numéricos**: Fontes monospaçadas (ex: `JetBrains Mono` ou `Roboto Mono`) para os logs e pontuações, garantindo que os números não "pulem" ao mudar de valor.

## 3. Paleta de Cores

### 3.1. Cores Institucionais (Dashboard)
- **Fundo**: `Dark Mode` (Slate 900/950) ou `Light Mode` (Gray 50).
- **Superfícies**: Glassmorphism (efeito fosco transparente) para cards e modais.
- **Destaques**: Azul Cobalto ou Indigo para botões de ação primária.

### 3.2. Cores do Tabuleiro (Conforme Regras)
Utilizaremos versões vibrantes porém equilibradas das cores solicitadas:
- **Amarelo**: `#FACC15` (Amber 400)
- **Verde**: `#22C55E` (Green 500)
- **Vermelho**: `#EF4444` (Red 500)
- **Azul**: `#3B82F6` (Blue 500)
- **Rosa**: `#EC4899` (Pink 500)

## 4. Estética e UI
- **Bordas**: Arredondamento suave (`border-radius: 8px` ou `12px`).
- **Sombras**: Subtle shadows para dar profundidade aos cards do pesquisador.
- **Micro-animações**:
    - **Hover**: Efeito de escala leve (1.02x) nos botões de linha.
    - **Transição de Condição**: Fade suave (300ms) para as mudanças de tela.
    - **Feedback de Culturante**: O sinal "X" deve ter uma animação de "pulse" ou "bounce".

## 5. UI do Pesquisador (Dashboard)
- Estilo "SaaS Moderno".
- Uso de **Ícones** (Lucide React ou Heroicons) para representar Condição, Jogadores e Exportação.
- Dashboards com gráficos simples (se necessário no futuro) ou tabelas bem espaçadas.

## 6. UI dos Jogadores (Foco)
- Fundo neutro (cinza muito escuro ou branco puro) para destacar as cores das linhas.
- O tabuleiro deve ter um aspecto tátil, com botões que pareçam ser "apertáveis".
- O indicador de "Vez de..." deve ser a única coisa animada além do tabuleiro.
