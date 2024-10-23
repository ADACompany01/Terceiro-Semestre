< span  id = " topo " >

< h1  align = " center " >Sprint 1: 27/09 /2024 a 05/10 /2024</ h1 >

< p  align = " centro " >
    <a href="#objetivos">Objetivos de sprint</a>   |   
	@@ -15,15 +15,12 @@ O desenvolvimento do site visa facilitar o trabalho do funcionário responsável
## : dart : Objetivos da Sprint

Os requisitos abrangidos por esse sprint são:
-  ** 01: ** Consultas Básicas
-  ** 02: ** Consultas Geoespaciais
-  ** 03: ** Atualizar o MER (Modelo Entidade-Relacionamento)
-  ** 04: ** Desenvolver API RESTful CRUD
-  ** 05: ** Hospedar uma API no Vercel e Subir no GitHub
-  ** 06: ** Junções

< span  id = " entregas " >

	@@ -41,16 +38,37 @@ Para extrair e entender os desejos do cliente, foi construído um protótipo ini

Este protótipo é válido para a entrega dos requisitos confirmados para o sprint, onde seus regulamentos podem ser verificados a seguir:

### 01 e 02: Consultar bases e consultas geoespaciais

Realizar pelo menos 5 consultas utilizando os operadores do checklist.

Ex: encontrar todos os produtos com preço maior que X, listar todos os pedidos de um determinado usuário, etc.

Armazenamento: Armazene dados geográficos ( por exemplo, a localização de lojas ou clientes) utilizando o tipo GeoJSON .

Consultas: Realize pelo menos 2 consultas geoespaciais para encontrar documentos dentro de um raio específico de um ponto ou dentro de um polígono. Por exemplo, encontre todas as lojas em um raio de 5km de um endereço específico, ou liste todos os clientes dentro de uma determinada cidade.

### 03: Atualizar o MER (Modelo Entidade-Relacionamento)

Este requisito se trata da atualização do MER, realizando todos os ajustes necessários.

### 04 e 05: Desenvolver API RESTful CRUD e hospedar a API no Vercel e Subir no GitHub

Desenvolvimento de uma API RESTful completa que permite a realização das operações básicas: GET, POST, PUT e DELETE. Cada operação deve ser mapeada para as rotas atribuídas no seu servidor.

Utilização da arquitetura MVC para desenvolvimento da aplicação.

Deverá conter obrigatoriamente um microsserviço.

API documentada utilizando uma das ferramentas de documentação apresentadas em aula. Exemplo Postman ou Swagger.

A aplicação deverá ser hospedada no GitHub e ter sua documentação descrita no arquivo READMe. Não esqueça de incluir o nome dos membros do grupo.

Aplicação hospedada em nuvem, através do vercel

### 05: Junções

Utilização do operador $lookup em pelo menos 2 consultas para realizar junções entre coleções e obter informações relacionadas. Por exemplo, encontre os detalhes dos produtos de um pedido específico.

< detalhes >
   < resumo >Diagrama de classes</ resumo >
   < h4 >Diagrama de classes mapeado do frontend</ h4 >
    
   ![ imagem ] ( https://github.com/paulovictorio/Documentacao_projetoCompras/assets/78160698/16ba36aa-3361-4ae2-bb36-3c48d4ffdd10 )
    
</ detalhes >
→ [ Voltar ao topo ] ( #topo )
    
< span  id = " links " >
## : link : Links úteis
- Repositório do projeto: [ Projeto de compras ] ( https://github.com/thiago-diegoli/Projeto-MVC-RESTful )
- Site do projeto: [ https://projeto-mvc-restful-frontend.vercel.app ] ( https://projeto-mvc-restful-frontend.vercel.app ) (usuário exemplo - email: ` usuario@email. com ` , senha: ` senha123 ` )
- Voltar ao [ documento principal ] ( https://github.com/paulovictorio/Documentacao_projetoCompras/blob/main/README.md )
