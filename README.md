<h1 align="center"> BasketLeague Mobile </h1>

<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
</p>

## Descrição
O BasketLeague Mobile é o aplicativo em React Native e Expo para a gestão de ligas de basquete amadoras e universitárias. Ele consome a API REST do projeto para organizar times, partidas, jogadores e estatísticas em uma interface mobile.

## Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- PNPM

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- PNPM instalado
- Expo Go instalado no celular ou emulador configurado

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd TSI-MOBILE-II-PROJECT
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Inicie a aplicação**
   ```bash
   pnpm start
   ```

4. **Abra no celular ou emulador**
   - Use o Expo Go para escanear o QR Code
   - Ou rode no emulador Android/iOS conforme a configuração local

## Rodando com a API (Backend) no Expo Go

O app consome a API REST do projeto [`TSI-WEB-SERVICES-PROJECT`](../TSI-WEB-SERVICES-PROJECT) (NestJS + PostgreSQL). Como o Expo Go roda no celular físico, ele **não** acessa `localhost` — precisa do **IP local da máquina** que roda o backend, e ambos (PC e celular) devem estar na **mesma rede Wi-Fi**.

### 1. Suba o backend (NestJS + PostgreSQL)

No diretório `TSI-WEB-SERVICES-PROJECT`:

```bash
# 1. Suba o banco PostgreSQL (Docker)
docker compose up -d

# 2. Aplique as migrations (cria as tabelas)
npx prisma migrate deploy

# 3. Inicie a API em modo desenvolvimento
pnpm start:dev
```

A API sobe em `http://localhost:3000` com prefixo global `/api`. O CORS já está habilitado no `main.ts`.

### 2. Libere a porta 3000 no Firewall do Windows

Sem isso o celular não alcança o PC. Em um **PowerShell como Administrador**:

```powershell
netsh advfirewall firewall add rule name="NestJS 3000" dir=in action=allow protocol=TCP localport=3000
```

> Em macOS/Linux, libere a porta 3000 no firewall correspondente (ufw, firewalld, etc.).

### 3. Descubra o IP local do PC

```powershell
# Windows
ipconfig
```

Procure o **IPv4** da interface Wi-Fi (ex: `192.168.0.104`). Em macOS/Linux use `ifconfig` ou `ip addr`.

### 4. Configure a URL da API no app

Edite `src/services/api.ts` e ajuste o `BASE_URL` com o IP do passo anterior:

```ts
const BASE_URL = 'http://SEU_IP_LOCAL:3000/api';
// exemplo: 'http://192.168.0.104:3000/api'
```

### 5. Verifique a conexão

No **navegador do celular**, acesse:

```
http://SEU_IP_LOCAL:3000/api/teams
```

Se retornar `[]` (ou a lista de times), a conexão está OK. Se ficar carregando, revise os passos 1, 2 e 3 (backend no ar, firewall liberado, mesma rede Wi-Fi).

### 6. Rode o app

```bash
pnpm start
```

Escaneie o QR Code com o **Expo Go**. O app carrega os dados direto da API.

> **Resumo do que precisa estar rodando ao mesmo tempo:** PostgreSQL (Docker) → API NestJS (`pnpm start:dev`) → Metro/Expo do app (`pnpm start`).

## Documentação
- [Documentação da API](../TSI-WEB-SERVICES-PROJECT/README.md)
- [Wireframe no Figma](https://www.figma.com/make/64G1bJmp6NL4WbJHIiO6OE/BasketLeague-Mobile-App-Screens?t=hZR7WpPSlUoKePT4-0)

## Contribuindo

Se você deseja contribuir para este projeto, siga estas etapas:

1. Crie um branch: `git checkout -b <nome_branch>`
2. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
3. Envie para o repositório remoto: `git push origin <branch>`
4. Crie a solicitação de pull

## Contribuidores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Raullize" title="Perfil no GitHub">
        <img src="https://github.com/Raullize.png" width="100px;" alt="Foto do Raul Lize Teixeira no GitHub"/><br>
        <sub>
          <b>Raul Lize Teixeira</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/MiguelLewandowski" title="Perfil no GitHub">
        <img src="https://github.com/MiguelLewandowski.png" width="100px;" alt="Foto do Miguel Leonardo Strapazon Lewandowski no GitHub"/><br>
        <sub>
          <b>Miguel Leonardo Strapazon Lewandowski</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
