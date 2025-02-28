# Acompanhamento de Entregas

## Tecnologias

- **Ionic**: Framework para criar apps híbridos usando tecnologias web.
- **Angular**: Framework para construir aplicações web dinâmicas de página única (SPA).

## Instalação

### Pré-requisitos

- **Node.js** e **npm**
- **Ionic CLI** e **Angular CLI**

### Passos

1. **Clone o repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>

2. **Entre no diretório do projeto**:
   ```bash
   cd <DIRETORIO_DO_PROJETO>

3. **Instale as dependências**:
   ```bash
   npm install

4. **Instale o Ionic CLI (caso necessário)**:
   ```bash
   npm install -g @ionic/cli

5. **Inicie a aplicação**:
   ```bash
   ionic serve

## Descrição

Aplicação desenvolvida com **Ionic** e **Angular** para o acompanhamento de entregas de uma transportadora. Ela é composta por duas telas:

1. **Dashboard**: Mostra informações sobre motoristas, contagem de status das entregas, bairros de origem e destino, e o status das entregas.

- **1.1 - Amostragem por motorista**: Mostra todas as entregas organizadas pelos motoristas. Contendo status, bairro de saída e bairro de destino.
- **1.2 - Amostragem por bairro**: Mostra todas as entregas organizadas pelos bairros de origem. Contendo status, motorista e bairro de destino.

2. **Lista de Entregas**: Exibe entregas paginadas, podendo ser filtradas por status, motorista, bairro de origem e bairro de entrega.
