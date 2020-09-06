# CRM GraphQL - NextJS

## Requirements

- Yarn
- NodeJS
- MongoDB or Docker

## Stack

```yml
Language: Typescript
Backend:
  - TypeGraphQL
  - Apollo
  - JWT
  - Argon2
  - Typegoose
  - MongoDB
Frontend:
  - NextJS
  - React
  - Tailwind
  - Recharts
  - Urql
  - GraphQL-Codegen
  - Formik & Yup
```

## Getting Started

### Download Repo

```bash
git clone https://github.com/Fedeya/crm-react-graphql
cd crm-react-graphql
yarn
```

### Install Dependencies for Packages

```bash
yarn lerna bootstrap
```

### Run Development Server

```bash
docker-compose up -d # only if you don't have mongodb
yarn dev
```
