# Antonio Marchese

<p>Antes de tudo, vale ressaltar que utilizei o Postregesql para realizar o projeto, portanto é importante que já o tenha instalado  e configurado em sua máquina.</p>
<hr/>
<h2>Começando</h2>
<ol>
  <li>Após baixar os arquivos, entre na pasta e instale as dependências com 'npm i' ou 'yarn add'. Como no meu caso utilizei npm, os próximos passos serão levando em conta esse gerenciador de pacotes.</li>
  <li>Para que seja possível criar o banco de dados, é preciso criar o usuário 'lojavirtual' (configurado na pasta src/database/index) ou utilizar algum usuário que você já possui. Para criar o presente usuário, entre na linha de comando do postgres ('psql') e digite: <span>CREATE USER lojavirtual CREATEDB ENCRYPTED PASSWORD 'lojavirtual'</span>
  </li>
  <li>O próximo passo é criar o banco de dados com a sequelize-cli. Para isso, digite o comando <span>npx sequelize-cli db:create</span>
  </li>
  <li>Agora que o banco de dados já existe, é preciso fazer as migrations. Para isso, digite o comando <span>npx sequelize-cli db:migrate</span>
  </li>
  <li>Depois de fazer as migrations, é preciso criar um usuário administrador para que seja possível utilizar o painel administrativo (AdminJS) e as funcionalidades de criar, atualizar e deletar produtos/categorias. Para fazer isso, basta digitar o comando <span>npx sequelize-cli db:seed --seed .\src\database\seeders\20230113195736-create-admin-user.js</span>.
  </li>
  <li>Agora, digitando o comando <span>npm run dev</span> a aplicação será lançada na porta 3001 e você poderá acessar o painel administrativo em <a href="http://localhost:3001/admin/login">http://localhost:3001/admin/login</a> (logando com email = admin@email.com e senha =123456). Caso você queira popular o banco de dados basta digitar o comando <span>npx sequelize-cli db:seed:all</span> e, ao entrar no painel do AdminJS, já será possível ver alguns produtos e categorias.</li>
</ol>
<hr/>

<h2>Criando, listando, apagando e atualizando produtos</h2>
<p>Para utilizar as rotas de criação, atualização e exclusão é preciso que você utilize alguma ferramenta como o Postman e faça login com o usuário administrador na rota "localhost:3001/auth/login", informando "email" e "password" no body no formato JSON. Isso irá retornar um objeto com a propriedade "token". Selecione essa propriedade e passe-a como parâmetro de autenticação nas rotas. Com isso, será possível criar, atualizar e deletar produtos/categorias.</p> 
<ol>
  <li>Criação de categorias: antes de começar a criar produtos é preciso criar as categorias. Na rota "/categories/register" é possível criar uma categoria de produtos com o método POST, informando apenas o atributo "name" no body da requisição no formato JSON (contanto que o token de admin seja fornecido).
  </li>

  <li>Criação de produtos: na rota "/products/register" é possível criar um produto de uma determinada categoria com o método POST, informando "name", "quantity" e "categoryId" no body da requisição no formato JSON (contanto que o token de admin seja fornecido). A propriedade status recebe o valor "ACTIVE" automaticamente na criação dos produtos (isso pode ser facilmente alterado).
  </li>

  <li>Listagem de produtos de uma determinada categoria: na rota "/categories/:id" é possível listar todos os produtos, que não foram deletados, de uma certa categoria, informando o id da categoria desejada na requisição com o método GET.
  </li>

  <li>Listagem de produtos: na rota "/products" é possível listar todos os produtos, independente das categorias, já cadastrados; inclusive aqueles que já foram deletados, para que seja possível recuperá-los se preciso, com o método GET.
  </li>

  <li>Informações de um produto específico: na rota "/products/:id" é possível obter todas as informações de um determinado produto, informando seu id na requisição, com o método GET.
  </li>

  <li>Atualização de produtos: na rota "/products/:id" é possível atualizar as propriedades de determinado produto, como "name", "quantity" e "status", informando todos esses campos e o "categoryId" no body da requisição no formato JSON, com o método PUT.
  </li>

  <li>Apagando produtos: na rota "/products/:id" é possível deletar determinado produto, informando apenas seu id na requisição com o método DELETE. Isso irá alterar a propriedade "deletedAt" desse produto, mas não o apagará completamente do banco de dados.
  </li>

  <li>Apagando categorias: na rota "/categories/:id" é possível deletar determinada categoria, informando apenas seu id na requisição com o método DELETE. Isso irá apagar completamente todos os produtos que estão vinculados a essa categoria (o que não é muito bom e pode ser melhorado, talvez).
  </li>

</ol>
