README disponível em [Português (PT-BR)](#pt-br-requisitacin) e em [Inglês (EN)](#en-requisitacin)

# [PT-BR] RequisitaCIn

Projeto desenvolvido por Ricardo Bizerra como parte da 2ª Fase da Seleção Simplificada Nº 04/2023 CIn-UFPE.

Está sendo utilizada a versão 18.16 do Node.js.

## Índice

- [Back-End](#back-end)
    - [Como rodar](#como-rodar)
- [Front-End](#front-end)
    - [Como rodar](#como-rodar-1)

## Back-End

### Como rodar

1. Vá até a pasta `/api`;
1. Em outro terminal, execute `yarn install` para instalar as dependências;
1. Crie um arquivo `.env` e preencha assim:
    ```dotenv
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    DATABASE_USER="johndoe"
    DATABASE_PASSWORD="randompassword"

    DATABASE_TEST_URL="postgresql://johndoetest:randompasswordtest@localhost:5433/test?schema=public"
    DATABASE_TEST_USER="johndoetest"
    DATABASE_TEST_PASSWORD="randompasswordtest"
    ```
1. Execute `yarn migration` para aplicar migrations no banco de dados;
1. Execute `yarn seed:db` para aplicar os seguintes dados:
    - 2 setores: Gerência de Sistemas, Secretaria de Graduação
    - 5 serviços:
        - Gerência de Sistemas: Reportar Problema, Reserva de Laboratório, Reserva de Auditório
        - Secretaria de Graduação: Solicitação de Histórico, Solicitação de Matrícula
1. Execute `yarn dev` e acesse [http://localhost:3333](http://localhost:3333) ou o local indicado no terminal;
1. O Back-End está rodando!

## Front-End

### Como rodar

1. Vá até a pasta `/web`;
1. Execute `yarn install` para instalar as dependências;
1. Execute `yarn dev` e acesse [http://localhost:3000](http://localhost:3000) ou o local indicado no terminal;
1. O Front-End está rodando!

# [EN] RequisitaCIn

This is a project developed by Ricardo Bizerra as part of the 2nd Phase of the Simplified Selection Nº 04/2023 CIn-UFPE.

It's being used Node.js version 18.16.

## Índice

- [Back-End](#back-end-1)
    - [How to run](#how-to-run)
- [Front-End](#front-end-1)
    - [How to run](#how-to-run-1)

## Back-End

### How to run

1. Go to directory `/api`;
1. In another terminal, run `yarn install` to install dependencies;
1. Create a `.env` file and insert:
    ```dotenv
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    DATABASE_USER="johndoe"
    DATABASE_PASSWORD="randompassword"

    DATABASE_TEST_URL="postgresql://johndoetest:randompasswordtest@localhost:5433/test?schema=public"
    DATABASE_TEST_USER="johndoetest"
    DATABASE_TEST_PASSWORD="randompasswordtest"
    ```
1. Run `yarn migration` to apply migrations to database;
1. Run `yarn seed:db` to insert the following data:
    - 2 sectors: "Gerência de Sistemas", "Secretaria de Graduação"
    - 5 services:
        - "Gerência de Sistemas": "Reportar Problema", "Reserva de Laboratório", "Reserva de Auditório"
        - "Secretaria de Graduação": "Solicitação de Histórico", "Solicitação de Matrícula"
1. Run `yarn dev` and access [http://localhost:3333](http://localhost:3333) or the link indicated in the terminal;
1. Back-End is running!

## Front-End

### How to run

1. Go to directory `/web`;
1. Run `yarn install` to install dependencies;
1. Run `yarn dev` and access [http://localhost:3000](http://localhost:3000) or the link indicated in the terminal;
1. Front-End is running!
