# Star Wars
Uma aplicação para praticar o uso de filtros complexos, contextAPI e hooks.

Esse projeto foi desenvolvido inicialmente como um projeto do curso Trybe em 2022, e agora estou refatorando o projeto aplicando tudo que aprendi até agora.

## todos:
[ ] - Fazer o deploy do projeto
[ ] - Implementar o CSS
[ ] - Criar customHooks (useFetch) ou implementar React Query
[ ] - Implementar React Hook Forms
[ ] - Criar componente de botão genérico
[ ] - Impĺementar react-router
[ ] - Criar rota de planetDetails
[ ] - Migrar o projeto para Typescript

## deploy:
todo: adicionar o deploy do projeto aqui
>[Clique aqui para acessar o deploy do projeto no navegador](https://star-wars-ncn6.vercel.app/)


## Dependências
* **Dependencias**: React.

* **Dependencias de desenvolvimento**: ESLint, Prettier, Vitest, Istambul.  
</br>

## Aplicação
Desenvolvida uma SPA(Single Page Application) consumindo a [SWAPI](https://swapi.dev/). 

O projeto consiste uma uma única página, onde é possível consumir os dados da SWAPI (Star Wars API), popular uma tabela e a partir daí gerar filtros complexos.

Estado global utilizando contextAPI.

Aplicação é testada com testes de integração usando React Testing Library.

## Instalação da aplicação

### Pré Requisitos:
* Node 16^
* npm 8.5.0^

### Rodando a aplicação localmente
<br>

1. Abra o terminal e clone o repositório:

```
git clone git@github.com:ThiagoBarbosaDev/star-wars.git
```

<br>

2. Entre na pasta do repositório referente ao projeto

```
cd star-wars
```

<br>

3. Instale as dependência

```
npm install
```

<br>

4. Rode a aplicação

```
npm start
```

<br>

5. Acesse a página no navegador pelo endereço padrão do vite:

```
http://localhost:5173
```

<br>

### Rodando testes de integração

1. Abra o terminal na raíz do projeto
   
2. Digite o comando para rodar os testes de integração:

```
npm test
```

<br>

### Rodando cobertura dos testes

1. Abra o terminal na raíz do projeto
   
2. Digite o comando para rodar os testes de integração:
```
npm run coverage
```
