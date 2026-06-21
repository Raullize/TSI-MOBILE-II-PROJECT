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

## Conectando com a API (Backend)

O app consome a API REST do projeto [`TSI-WEB-SERVICES-PROJECT`](../TSI-WEB-SERVICES-PROJECT) (NestJS + PostgreSQL). 

Como o Expo Go roda no celular físico, ele **não** consegue acessar `localhost` (já que o localhost do celular é ele mesmo). É necessário usar o **IP local da sua máquina** na rede Wi-Fi.

### 1. Suba a API no seu Computador
Siga as instruções completas no **[README do Backend](../TSI-WEB-SERVICES-PROJECT/README.md)** para subir o banco de dados via Docker, aplicar as migrations e iniciar o servidor NestJS (`pnpm start:dev`).

### 2. Libere a porta 3000 no Firewall

Sem isso, o celular não alcança o computador. Escolha o seu sistema operacional:

<details>
<summary><b>No Windows</b></summary>
<br>

Abra o **PowerShell como Administrador** e rode:
```powershell
netsh advfirewall firewall add rule name="NestJS 3000" dir=in action=allow protocol=TCP localport=3000
```
</details>

<details>
<summary><b>No Linux</b></summary>
<br>

Dependendo do gerenciador de firewall da sua distribuição, rode um dos comandos abaixo no terminal. 
> **Aviso importante (Linux):** Comandos de iptables costumam "resetar" quando o computador é reiniciado. Se você reiniciar o computador, precisará rodar o comando novamente para abrir a porta.

```bash
# Se usar iptables direto (mais comum em Arch/CachyOS)
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT

# Se usar UFW (Ubuntu/Debian/Mint)
sudo ufw allow 3000/tcp

# Se usar Firewalld (Fedora/CentOS/RHEL)
sudo firewall-cmd --zone=public --add-port=3000/tcp --permanent
sudo firewall-cmd --reload
```
</details>

### 3. Descubra o IP local do PC

<details>
<summary><b>No Windows</b></summary>
<br>

No PowerShell ou CMD, rode:
```powershell
ipconfig
```
Procure pelo **Endereço IPv4** da sua rede Wi-Fi (ex: `192.168.0.100`).
</details>

<details>
<summary><b>No Linux</b></summary>
<br>

No terminal, rode:
```bash
ip addr
# ou
ifconfig
```
Procure pelo IP (`inet`) no bloco da interface Wi-Fi (geralmente `wlan0` ou `wlp...`) ou da rede cabeada (`eth0` ou `enp...`).
</details>

### 4. Configure o arquivo .env

Crie um arquivo `.env` na raiz do projeto (mesmo nível do `package.json`) e configure a variável `EXPO_PUBLIC_API_URL` com o IP do passo anterior:

```env
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000/api
# exemplo: EXPO_PUBLIC_API_URL=http://192.168.0.104:3000/api
```

> **Atenção (Mudança de Rede):** Toda vez que você mudar de rede Wi-Fi (ex: for de casa para a faculdade), o seu IP vai mudar. Você precisa descobrir o novo IP (Passo 3), atualizar este arquivo `.env` com o novo IP, **E** rodar o comando do Firewall (Passo 2) novamente. Lembre-se também de sempre iniciar o app limpando o cache para ele ler o novo IP.

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
