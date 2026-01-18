# Ecommerce Book API

Api de um ecommerce que desenvolvi para servir de base para o desafio frontend do [@cafeepixel](https://github.com/cafeepixel/desafio-cp-front).

Inicialmente era apenas um CRUD simples que manipulava os livros que aparecia porem eu decidir criar o fluxo completo do ecommerce, desde criar conta, criar anuncio dos livros no seu perfil, carrinho e etc.

## Funcionalidades já criadas

### Books

Acessando a rota /books temos algumas funcionalidades:

1. Criar livro
1. Buscar todos os livros cadastrados
1. Editar livros (apenas os que vc criou)
1. Deletar livros (apenas os que vc criou)
1. Buscar livros pelo id do usuário vinculado.

### User

Acessando a rota /user temos algumas funcionalidades:

1. Criar usuário (registro de conta)
1. Logar no sistema
1. Deslogar do sistema

## Próximas Funcionalidades

1. Separar livros por categoria
1. Criar o tabela de carrinho
1. Criar tabela para endereços &#x2705;
1. Criar tabela de pedido
1. Criar funcionalidades dos comentários

## Regras de negócio

### Usuário

- Pode cadastrar vários livros.
- Pode ter vários endereços.
- Usuários deslogados apenas podem listar os livros.
- O usuário só pode editar/deletar os livros que ele cadastrou

### Livro

- Pode ter apenas um usuário vinculado.
- Pode ter nenhum ou vários comentários

### Comentários

- Pode ter apenas um usuário vinculado
- Pode ter apenas um livro cadastrado

### Carrinho

- Um carrinho pode ter vários livros.

### Pedido

- Um pedido vai ter apenas um carrinho vinculado e possuir o total do valor.
