# Cadastro de Usuários - Teste Técnico

Este projeto foi desenvolvido como parte de um teste técnico de frontend. Trata-se de uma aplicação simples de cadastro de usuários com nome completo, CPF, telefone e email, permitindo criar, listar, editar e excluir usuários com persistência em `localStorage`.

## Tecnologias utilizadas

- [Next.js 15 (App Router)](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zod](https://zod.dev/) — para validação de formulários
- [Jest + Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — para testes unitários
- [Sonner](https://sonner.emilkowal.ski/) — para notificações

## Funcionalidades

- ✅ Cadastro de usuários com validação de dados
- ✅ Listagem de usuários cadastrados
- ✅ Edição inline dos dados via modal
- ✅ Exclusão de usuários com confirmação
- ✅ Feedback visual com notificações (sucesso/erro)
- ✅ Validação com Zod e mensagens de erro customizadas
- ✅ Dados persistidos no `localStorage`
- ✅ Testes unitários cobrindo as funcionalidades principais

## Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/FelippeAlves/test-front-tinnova.git
```

```bash
cd test-front-tinnova
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador:

---> http://localhost:3000

5. Rode os testes unitários pelo terminal:

```bash
npm run test
```

## Observações

O projeto não utiliza backend — os dados são armazenados no localStorage.

A validação dos campos segue regras básicas para CPF, telefone e email.

O layout foi feito seguindo alguns critérios de aceite.

## Pensamento de Melhorias

Adicionar paginação e busca na listagem

Criar autenticação simples

### Agradeço a oportunidade
