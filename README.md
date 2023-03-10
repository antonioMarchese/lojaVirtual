# Antonio Marchese

<p>Antes de tudo, vale ressaltar que utilizei o Postregesql para realizar o projeto, portanto é importante que já o tenha instalado  e configurado em sua máquina.</p>
<hr/>
<h2>Começando</h2>
<ol>
  <li>Após baixar os arquivos, entre na pasta e instale as dependências com 'npm i' ou 'yarn add'. Como no meu caso utilizei npm, os próximos passos serão levando em conta esse gerenciador de pacotes.</li>
  <li>Para que seja possível criar o banco de dados, é preciso criar o usuário 'lojavirtual' no psql (configurado na pasta src/database/index) ou utilizar algum usuário que você já possui. Para criar o presente usuário, entre na linha de comando do postgres ('psql') e digite: <strong>"CREATE USER lojavirtual CREATEDB ENCRYPTED PASSWORD 'lojavirtual';"</strong>
  </li>
  <li>O próximo passo é criar o banco de dados com a sequelize-cli. Para isso, digite o comando <strong>"npx sequelize-cli db:create"</strong>
  </li>
  <li>Agora que o banco de dados já existe, é preciso fazer as migrations. Para isso, digite o comando <strong>"npx sequelize-cli db:migrate"</strong>
  </li>
  <li>Depois de fazer as migrations, é preciso criar um usuário administrador para que seja possível utilizar o painel administrativo (AdminJS) e as funcionalidades de criar, atualizar e deletar produtos/categorias. Para fazer isso, basta digitar o comando <strong>"npx sequelize-cli db:seed --seed .\src\database\seeders\20230113195736-create-admin-user.js"</strong>.
  </li>
  <li>Agora, digitando o comando <strong>npm run dev</strong> a aplicação será lançada na porta 3001 e você poderá acessar o painel administrativo em <a href="http://localhost:3001/admin/login">http://localhost:3001/admin/login</a> (logando com email = admin@email.com e senha =123456). Caso você queira popular o banco de dados basta digitar o comando <strong>"npx sequelize-cli db:seed:all"</strong> e, ao entrar no painel do AdminJS, já será possível ver alguns produtos e categorias.</li>
</ol>
<hr/>

<h2>Criando, listando, apagando e atualizando produtos</h2>
<p>Para utilizar as rotas de criação, atualização e exclusão é preciso que você utilize alguma ferramenta como o Postman e, na rota "localhost:3001/auth/login", faça login com o usuário administrador, informando "email" e "password" no body no formato JSON, com uma requisição do tipo POST. Isso irá retornar um objeto com a propriedade "token". Selecione essa propriedade e passe-a como parâmetro de autenticação (Bearer token) nas rotas. Com isso, será possível criar, atualizar e deletar produtos/categorias.</p> 
<ol>
  <li>
    <h3>Criação de categorias</h3> 
    <p>Antes de começar a criar produtos é preciso criar as categorias. Na rota "/categories/register" é possível criar uma categoria de produtos com o método POST, informando apenas o atributo "name" no body da requisição no formato JSON (contanto que o token de admin seja fornecido).
    </p>
  </li>

  <li>
    <h3>Criação de produtos</h3>
    <p>Na rota "/products/register" é possível criar um produto de uma determinada categoria com o método POST, informando "name", "quantity" e "categoryId" no body da requisição no formato JSON (contanto que o token de admin seja fornecido). A propriedade status recebe o valor "ACTIVE" automaticamente na criação dos produtos (isso pode ser facilmente alterado).
    </p>
  </li>

  <li>
    <h3>Listagem de produtos de uma determinada categoria</h3>
    <p> Na rota "/categories/:id" é possível listar todos os produtos, que não foram deletados, de uma certa categoria, informando o id da categoria desejada na requisição com o método GET.</p>
  </li>

  <li>
    <h3>Listagem de produtos</h3>
    <p> Na rota "/products" é possível listar todos os produtos, independente das categorias, já cadastrados; inclusive aqueles que já foram deletados, para que seja possível recuperá-los se preciso, com o método GET.</p>
  </li>

  <li>
    <h3>Informações de um produto específico</h3>
    <p> Na rota "/products/:id" é possível obter todas as informações de um determinado produto, informando seu id na requisição, com o método GET.</p>
  </li>

  <li>
    <h3>Atualização de produtos</h3>
    <p> Na rota "/products/:id" é possível atualizar as propriedades de determinado produto, como "name", "quantity" e "status", informando todos esses campos e o "categoryId" no body da requisição no formato JSON, com o método PUT.</p>
  </li>

  <li>
    <h3>Apagando produtos</h3>
    <p> Na rota "/products/:id" é possível deletar determinado produto, informando apenas seu id na requisição com o método DELETE. Isso irá alterar a propriedade "deletedAt" desse produto, mas não o apagará completamente do banco de dados.</p>
  </li>

  <li>
    <h3>Apagando categorias</h3>
    <p> Na rota "/categories/:id" é possível deletar determinada categoria, informando apenas seu id na requisição com o método DELETE. Isso irá apagar completamente todos os produtos que estão vinculados a essa categoria (o que não é muito bom e pode ser melhorado, talvez).</p>
  </li>

</ol>
<hr/>
<h2>Por fim</h2>
<p>O arquivo "Loja Virtual.postman_collection.json" pode ser importado no Postman, isso fará com que você não precise criar todas essas rotas :) </p>
<p>Talvez você precise atualizar o token de admin. Para isso, basta ir no espaço "variables" da pasta Loja Virtual e colar o token obtido ao fazer login com a conta admin.</p>
