<br/>

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
<br/>
<br/>

# 🏥 Go Healthy
O projeto Go-Healthy, interpretada como "Escolha a Saúde" ou "Promova a Saúde", visa desenvolver uma plataforma inovadora para simplificar o processo de marcação de consultas médicas para pacientes e aprimorar a gestão de agendas para profissionais de saúde em clínicas hospitalares. Inicialmente, estamos concentrados na criação de um MVP (Produto Mínimo Viável) que se concentra na gestão da clínica e na marcação de consultas. Este MVP será uma versão funcional do software que nos permitirá lançar rapidamente uma solução valiosa, com as seguintes funcionalidades iniciais:

Gestão de pacientes e clínica com marcação de consultas multicanal: Os pacientes podem marcar consultas por telefone, WhatsApp ou presencialmente na clínica, proporcionando flexibilidade na escolha do método de agendamento. Na visão da clínica ela gerencia seu atendimento do dia, horas vagas, agenda do dia, histórico de patologias dos pacientes e sincronia das informações open health(será explicado posteriormente).

<br/>

# 🖌️ Front-end (gohealthy-web)
<br/>

WIP

<br/>

# ⚙️ Back-end (gohealthy-api)
<br/>

## 📚 Resources

A api apresenta 2 dominios expostos em recursos de uma api, usuários(user) que representa o paciente da clinica e eventos de saúde(health event) que determina o histórico patologias apresentadas por aquele individuo.

<br/>

## ✔️ User

<kbd>/users</kbd>

Recurso que representa um paciente qualquer como um **entidade**

| METHOD     | ENDPOINT         | DESCRIPTION                               | ESCOPE             |
|------------|------------------|-------------------------------------------|--------------------|
| **POST**   | `/`              | Cadastra um novo usuário                  | <kbd>REQUEST</kbd> |
| **DELETE** | `/{id}`          | Remove o cadastro específico pelo Id      | <kbd>REQUEST</kbd> |
| **PUT**    | `/{id}`          | Atualiza o cadastro específico pelo Id    | <kbd>REQUEST</kbd> |
| **GET**    | `/{id}`          | Lista um paciente específico pelo Id      | <kbd>REQUEST</kbd> |

<kbd>/health-events</kbd>

Recurso que representa o histório patologico daquele paciente como uma **entidade**

| METHOD     | ENDPOINT         | DESCRIPTION                               | ESCOPE             |
|------------|------------------|-------------------------------------------|--------------------|
| **GET**    | `?userId={id}`      | Lista um paciente específico pelo Id      | <kbd>REQUEST</kbd> |

<br/>

## 📐 Arquitetura

Essa api foi estruturada usando uma arquitetura simples pensada no MVC

seguindo a estrutura de pastas abaixo

```
  /src
    /rest
      /model
    /config
    /exceptions
    /model
    /services
    /repositories
```

<br/>

## ⌛️ Serviços

- ### 🌐 **HTTP**
  Esse microsserviço faz proxy com uma API pública de histórico de patologias

- ### 🍃 **MongoDB**
  Esse microsserviço usa armazenamento com banco de dados não relacional com [MongoDB](https://www.mongodb.com/).
<br/>

## ⚡ Getting started dependencies

Executa o docker compose para subir as imagens necessárias em container docker (compose.yaml)

```sh
cd docker-compose && docker-compose up -d
```

<br/>

## ☕ Executar o Back-end

### Compilar o projeto

```sh
mvn clean install
```

### Executando **local**

```sh
mvn spring-boot:run 

or

java -jar target/gohealthyapi-0.0.1-SNAPSHOT.jar
```

### Executando os **testes**
```sh
mvn test
```

### **Swagger**

```
http://localhost:{you-port}/v1/api-docs
```

<br/>

