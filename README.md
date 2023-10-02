README disponível em [Português (PT-BR)](#pt-br-requisitacin) e em [Inglês (EN)](#en-requisitacin)

# [PT-BR] RequisitaCIn

Projeto desenvolvido por Ricardo Bizerra como parte da 2ª Fase da Seleção Simplificada Nº 04/2023 CIn-UFPE.

Está sendo utilizada a versão 18.16 do Node.js.

## Índice

- [Modelo Entidade-Relacionamento](#modelo-entidade-relacionamento)
- [Como rodar](#como-rodar)
- [Tecnologias e frameworks utilizados](#tecnologias-e-frameworks-utilizados)
    - [Back-End](#back-end)
    - [Front-End](#front-end)

## Modelo Entidade-Relacionamento

Você pode conferir o Modelo Entidade-Relacionamento de 2 formas:

- [Por este link, para acessar a imagem](https://drive.google.com/file/d/18W20oareTPbzAXGiwcM_gQ6nsKJvGIor/view?usp=sharing), ou
- Acessando a pasta `/api/prisma/dbml`, copie o conteúdo do arquivo `schema.dbml` e cole no site [dbdiagram.io](https://dbdiagram.io/d).

## Como rodar

1. Vá até a pasta `/api`;
1. Em um terminal, execute `yarn install` para instalar as dependências;
1. Crie um arquivo `.env` e preencha assim:
    ```dotenv
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    DATABASE_USER="johndoe"
    DATABASE_PASSWORD="randompassword"

    DATABASE_TEST_URL="postgresql://johndoetest:randompasswordtest@localhost:5433/test?schema=public"
    DATABASE_TEST_USER="johndoetest"
    DATABASE_TEST_PASSWORD="randompasswordtest"
    ```
1. Execute `docker compose up -d --build` para dar build no banco de dados;
1. Execute `docker compose up` para iniciar o banco de dados. O passo anterior não precisa ser repetido das próximas vezes;
1. Em outro terminal, execute `yarn migration` para aplicar as migrations no banco de dados;
1. Execute `yarn seed:db` para adicionar os seguintes dados:
    - 2 setores: Gerência de Sistemas, Secretaria de Graduação
    - 5 serviços:
        - Gerência de Sistemas: Reportar Problema, Reserva de Laboratório, Reserva de Auditório
        - Secretaria de Graduação: Solicitação de Histórico, Solicitação de Matrícula
    - 3 usuários: 1 aluno, 1 servidor da Secretaria de Graduação, 1 servidor da Gerência de Sistemas
1. Execute `yarn dev` e acesse [http://localhost:3333](http://localhost:3333) ou o local indicado no terminal;
1. O Back-End está rodando!
    - Para realizar os testes, abra outro terminal e execute `yarn test`.
    - Para ver a documentação da API, acesse [http://localhost:3333/docs](http://localhost:3333/docs).
1. Agora, para rodar o Front-End, em outro terminal, vá até a pasta `/web`;
1. Execute `yarn install` para instalar as dependências;
1. Execute `yarn dev` e acesse [http://localhost:3000](http://localhost:3000) ou o local indicado no terminal;
1. O Front-End está rodando!

## Tecnologias e frameworks utilizados

- TypeScript
### Back-End

- API: Node.js, com framework Fastify
- Validação de Dados: Zod
- Banco de Dados: Prisma (ORM), Docker, PostgreSQL
- Testes: Jest, Supertest

### Front-End

- Next.js versão 13
- React
- TailwindCSS
- Componentes: ShadcnUI
- Formulário: React Hook Form

# [EN] RequisitaCIn

Project developed by Ricardo Bizerra as part of the 2nd Phase of the Simplified Selection No. 04/2023 CIn-UFPE.

Node.js version 18.16 is being used.

## Index

- [Entity-Relationship Model](#entity-relationship-model)
- [How to run](#how-to-run)
- [Technologies and frameworks used](#technologies-and-frameworks-used)
    - [Back-End](#back-end-1)
    - [Front-End](#front-end-1)

## Entity-Relationship Model

You can check the Entity-Relationship Model in 2 ways:

- [By this link, to access the image](https://drive.google.com/file/d/18W20oareTPbzAXGiwcM_gQ6nsKJvGIor/view?usp=sharing), or
- Accessing the `/api/prisma/dbml` folder, copy the contents of the `schema.dbml` file and paste it into the [dbdiagram.io](https://dbdiagram.io/d) website.

## How to run

1. Go to the `/api` folder;
1. In a terminal, run `yarn install` to install the dependencies;
1. Create a `.env` file and fill it like this:
    ```dotenv
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    DATABASE_USER="johndoe"
    DATABASE_PASSWORD="randompassword"

    DATABASE_TEST_URL="postgresql://johndoetest:randompasswordtest@localhost:5433/test?schema=public"
    DATABASE_TEST_USER="johndoetest"
    DATABASE_TEST_PASSWORD="randompasswordtest"
    ```
1. Run `docker compose up -d --build` to build the database;
1. Run `docker compose up` to start the database. The previous step does not need to be repeated the next time;
1. In another terminal, run `yarn migration` to apply the migrations to the database;
1. Run `yarn seed:db` to insert the following data:
    - 2 sectors: Systems Management, Undergraduate Secretary
    - 5 services:
        - Systems Management: Report Problem, Laboratory Reservation, Auditorium Reservation
        - Undergraduate Secretary: Transcript Request, Enrollment Request
    - 3 users: 1 student, 1 Undergraduate Secretary server, 1 Systems Management server
1. Run `yarn dev` and access [http://localhost:3333](http://localhost:3333) or the location indicated in the terminal;
1. The Back-End is running!
    - To perform the tests, open another terminal and run `yarn test`.
    - To see the API documentation, access [http://localhost:3333/docs](http://localhost:3333/docs).
1. Now, to run the Front-End, in another terminal, go to the `/web` folder;
1. Run `yarn install` to install the dependencies;
1. Run `yarn dev` and access [http://localhost:3000](http://localhost:3000) or the location indicated in the terminal;
1. The Front-End is running!

## Technologies and frameworks used

- TypeScript

### Back-End

- API: Node.js, with Fastify framework
- Data Validation: Zod
- Database: Prisma (ORM), Docker, PostgreSQL
- Tests: Jest, Supertest

### Front-End

- Next.js version 13
- React
- TailwindCSS
- Components: ShadcnUI
- Form: React Hook Form
