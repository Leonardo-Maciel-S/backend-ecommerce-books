# Ecommerce Book API

Api de um ecommerce que desenvolvi para servir de base para o desafio frontend do [@cafeepixel](https://github.com/cafeepixel/desafio-cp-front).

Inicialmente era apenas um CRUD simples que manipulava os livros que aparecia porem eu decidir criar o fluxo completo do ecommerce, desde criar conta, criar anuncio dos livros no seu perfil, carrinho e etc.

## Funcionalidades já criadas

### Books

Acessando a rota /books temos essas funcionalidades:

1. Criar livro
1. Buscar todos os livros cadastrados (com paginação e busca por termo)
1. Buscar livro específico pelo id
1. Buscar livros pelo id do usuário vinculado
1. Editar livros (apenas os que vc criou)
1. Deletar livros (apenas os que vc criou)

### User

Acessando a rota /user temos essas funcionalidades:

1. Criar usuário (registro de conta)
1. Logar no sistema
1. Deslogar do sistema
1. Verificar se usuário está logado

### Endereço do Usuário

Acessando a rota /user/address temos essas funcionalidades:

1. Criar novo endereço
1. Listar todos os endereços do usuário autenticado
1. Buscar endereço específico pelo id
1. Editar endereço (apenas o seu próprio)
1. Deletar endereço (apenas o seu próprio)

### Carrinho

Acessando a rota /cart temos essas funcionalidades:

1. Obter carrinho do usuário autenticado (cria automaticamente se não existir)
1. Listar todos os itens do carrinho com detalhes do livro
1. Adicionar livro ao carrinho
1. Aumentar quantidade de um item no carrinho
1. Diminuir quantidade de um item no carrinho
1. Remover item do carrinho
1. Definir endereço padrão para o carrinho

### Comentários

Acessando a rota /comment temos essas funcionalidades:

1. Criar comentário em um livro (com avaliação)
1. Listar comentários de um livro (com paginação)
1. Editar comentário próprio
1. Deletar comentário próprio

## Próximas Funcionalidades

1. Separar livros por categoria
1. Implementar sistema de pedidos (orders)
1. Adicionar imagem de perfil do usuário
1. Adicionar wishlist/favoritos

## Regras de negócio

### Autenticação

- Senhas são armazenadas com hash bcrypt (salt: 10)
- Autenticação via JWT em cookie HTTPOnly
- Token tem validade de 1 hora
- Rotas protegidas: criar/editar/deletar livros, comentários, carrinho, endereços

### Usuário

- Pode cadastrar vários livros.
- Pode ter vários endereços com informações completas (rua, número, CEP, telefone, CPF/CNPJ, etc).
- Usuários deslogados apenas podem listar os livros e comentários.
- O usuário só pode editar/deletar os livros que ele cadastrou
- O usuário só pode gerenciar (ver, editar, deletar) seus próprios endereços

### Livro

- Pode ter apenas um usuário vinculado (criador).
- Pode ter nenhum ou vários comentários
- Preço armazenado em centavos (priceInCents)
- Suporta busca por título e autor com paginação

### Comentários

- Pode ter apenas um usuário vinculado (autor)
- Pode ter apenas um livro vinculado
- Somente usuários logados podem comentar.
- Inclui avaliação numérica e texto
- O usuário que criou o comentário pode edita-lo ou deleta-lo.
- Comentários listados com paginação

### Endereço do Usuário

- Um usuário pode ter múltiplos endereços
- Campos obrigatórios: rua, bairro, cidade, estado, CEP, telefone, nome do destinatário, CPF/CNPJ
- Campos opcionais: número, complemento
- O usuário só pode editar/deletar seus próprios endereços

### Carrinho

- Um usuário pode ter apenas um carrinho (criado automaticamente no primeiro acesso)
- É possível adicionar quantos itens quiser
- É possível aumentar/diminuir quantidade ou remover itens
- Quantidade mínima: 1 (não permite deletar sem atingir 0, mas bloqueia decremento quando quantidade = 1)
- O carrinho pode ter um endereço padrão vinculado
- Cálculo de subtotal: soma(quantidade × priceInCents) para cada item

### Validações

- **Livro**: título >= 4 caracteres, autor >= 2 caracteres, preço obrigatório, capa obrigatória
- **Usuário**: email válido, senha >= 8 caracteres, nome obrigatório
- **UUID**: todos os parâmetros de ID são validados como UUID válido
- **Paginação**: padrão de 10 itens por página, suporta customização via query params
