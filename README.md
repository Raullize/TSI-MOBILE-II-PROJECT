# BasketLeague

Plataforma mobile de gestao de ligas de basquete amadoras e universitarias, desenvolvida com React Native e Expo.

## Integrantes

- **Miguel Leonardo Strapazon Lewandowski**
  - Responsavel pelo modulo de **Times e Partidas**
- **Raul Lize Teixeira**
  - Responsavel pelo modulo de **Jogadores e Estatisticas**

## Descricao Do Projeto

O **BasketLeague** e um aplicativo mobile voltado para a gestao de ligas de basquete amadoras e universitarias. A proposta do app e centralizar o cadastro de times, jogadores, partidas e estatisticas em uma unica plataforma, facilitando o acompanhamento de uma temporada por organizadores, equipes e participantes.

A aplicacao consumira uma **API REST** que ja esta em desenvolvimento pela dupla, reutilizando o backend existente para persistencia e consulta dos dados.

## Objetivo

O projeto tem como objetivo oferecer uma experiencia simples e organizada para:

- cadastrar e gerenciar times
- registrar e acompanhar partidas
- manter elencos atualizados
- registrar estatisticas individuais dos jogadores
- consultar informacoes filtradas ao longo da temporada

## Modulos Do Projeto

## Modulo 1 - Times e Partidas

**Responsavel:** Miguel Leonardo Strapazon Lewandowski

### Tela de listagem de times

- Exibe todos os times cadastrados
- Mostra nome, cidade e numero de jogadores
- Possui campo de busca por nome do time

### Tela de cadastro / edicao de time

- Formulario com:
  - nome
  - cidade
  - cor do uniforme
  - logo via URL
- Validacao de campos obrigatorios

### Tela de listagem de partidas

- Lista as partidas cadastradas
- Exibe times envolvidos, data, placar e status
- Status esperados:
  - agendada
  - finalizada
- Permite filtro por time ou data

### Tela de cadastro / edicao de partida

- Formulario para registro de partidas
- Permite selecionar:
  - dois times
  - data e hora
  - local
  - placar final

## Modulo 2 - Jogadores e Estatisticas

**Responsavel:** Raul Lize Teixeira

### Tela de listagem de jogadores

- Lista jogadores cadastrados
- Exibe nome, posicao, numero da camisa e time atual
- Permite filtro por nome ou time

### Tela de cadastro / edicao de jogador

- Formulario com:
  - nome
  - posicao (`PG`, `SG`, `SF`, `PF`, `C`)
  - numero
  - data de nascimento
  - time vinculado

### Tela de listagem de estatisticas

- Lista estatisticas por partida ou por jogador
- Exibe informacoes como:
  - pontos
  - rebotes
  - assistencias
  - faltas
- Permite filtro por jogador

### Tela de registro / edicao de estatisticas

- Formulario vinculado a uma partida e a um jogador
- Permite preencher os dados de desempenho do atleta na partida

## O Que Sera Implementado

Durante o desenvolvimento, o aplicativo deve contemplar:

- navegacao entre telas usando Expo Router
- integracao com API REST para consumo e persistencia dos dados
- listagens com filtros e busca
- formularios com validacao
- organizacao por modulos de dominio
- exibicao de estatisticas esportivas
- estrutura preparada para Android e iOS

## Tecnologias Utilizadas

- **React Native**
- **Expo**
- **Expo Router**
- **TypeScript**
- **PNPM**

## Justificativa Do Framework Hibrido

A escolha do **React Native** se deve a sua ampla adocao no mercado, ao ecossistema maduro de componentes e a possibilidade de compartilhamento de codigo entre **Android** e **iOS**.

Alem disso, a equipe ja possui familiaridade com **JavaScript** e **TypeScript**, o que reduz a curva de aprendizado e acelera o desenvolvimento da aplicacao.

## Wireframe

Link do wireframe no Figma:

[BasketLeague no Figma](https://www.figma.com/make/64G1bJmp6NL4WbJHIiO6OE/BasketLeague-Mobile-App-Screens?t=hZR7WpPSlUoKePT4-0)

> Observacao: o wireframe pode apresentar diferencas em relacao a versao final do aplicativo.

## Como Rodar O Projeto

### Requisitos

- **Node.js** instalado
- **PNPM** instalado globalmente
- **Expo Go** instalado no celular

Caso nao tenha o PNPM instalado:

```bash
npm install -g pnpm
```

### Instalar dependencias

Na raiz do projeto, execute:

```bash
pnpm install
```

### Iniciar o projeto

Para rodar localmente:

```bash
pnpm start
```

Se quiser abrir no celular com menos chance de problema de rede:

```bash
npx expo start --tunnel
```

Se for necessario limpar cache:

```bash
npx expo start --tunnel --clear
```

### Abrir no celular

- Abra o aplicativo **Expo Go**
- Escaneie o QR Code exibido no terminal
- Aguarde o carregamento do app

## Estrutura Inicial

Atualmente o projeto esta configurado como uma aplicacao Expo com roteamento baseado em arquivos, usando `src/app` como raiz das telas.

## Observacoes

- O projeto ainda esta em fase de desenvolvimento
- A API REST sera integrada conforme a evolucao dos modulos
- Alguns detalhes visuais e funcionais podem mudar ao longo da implementacao
