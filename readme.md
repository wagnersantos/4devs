<style>
p{
 display: flex;
 justify-content: center;
}
a, p, ul, li{
  text-decoration:none;
}
a + a {
  margin-left: 10px;
}

#myBtn {
  display: none;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 99;
  font-size: 24px;
  border: none;
  outline: none;
  background-color: rgb(255, 82, 82);
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 50%;
}

#myBtn:hover {
opacity: 0.6
}
</style>
<script>
mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
</script>

<p>
<a href="https://coveralls.io/github/wagnersantos/4devs?branch=master"><img src="https://travis-ci.com/wagnersantos/4devs.svg?branch=master">
<a href='https://coveralls.io/github/wagnersantos/4devs?branch=master'><img src='https://coveralls.io/repos/github/wagnersantos/4devs/badge.svg?branch=master' alt='Coverage Status' /></a>
<a href="http://standardjs.com"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg"></a>
<a href="https://opensource.org/licenses/"><img src="https://img.shields.io/badge/License-GPL%20v3-yellow.svg" /></a>
<a href="https://opensource.org/"><img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103"></a>

</p>

<button onclick="topFunction()" id="myBtn" title="Voltar para o topo">^</button>

# **4Dev React**

> ## Menu

<ul>
  <li><a href="#PrincIpios">Princípios</a></li>
  <li><a href="#design-patterns">Design Patterns</a></li>
  <li><a href="#metodologias-e-designs">Metodologias e Designs</a></li>
  <li><a href="#bibliotecas-e-ferramentas">Bibliotecas e Ferramentas</a></li>
  <li><a href="#features-do-react">Features do React</a></li>
  <li><a href="#features-do-git">Features do Git</a></li>
  <li><a href="#features-do-typescript">Features do Typescript</a></li>
  <li><a href="#features-de-testes">Features de Testes</a></li>
</ul>

O objetivo do projeto é aprender a criar um sistema em ReactJs utilizando os novos Hooks, com uma arquitetura bem definida e desacoplada, utilizando TDD (programação orientada a testes) como metodologia de trabalho, Clean Architecture para fazer a distribuição de responsabilidades em camadas, sempre seguindo os princípios do SOLID, DRY, YAGNI, KISS e aplicando Design Patterns para resolver alguns problemas comuns.

> ## Princípios

- Single Responsibility Principle (SRP)
- Open Closed Principle (OCP)
- Liskov Substitution Principle (LSP)
- Interface Segregation Principle (ISP)
- Dependency Inversion Principle (DIP)
- Separation of Concerns (SOC)
- Don't Repeat Yourself (DRY)
- You Aren't Gonna Need It (YAGNI)
- Keep It Simple, Silly (KISS)
- Composition Over Inheritance
- Small Commits

> ## Design Patterns

- Factory
- Adapter
- Composite
- Decorator
- Dependency Injection
- Abstract Server
- Composition Root
- Builder
- Proxy

> ## Metodologias e Designs

- TDD
- Clean Architecture
- DDD
- Reactive Programming
- Responsive Layout
- Conventional Commits
- GitFlow
- Modular Design
- Dependency Diagrams
- Use Cases
- Continuous Integration
- Continuous Delivery
- Continuous Deployment

> ## Bibliotecas e Ferramentas

- Typescript
- React
- React Testing Library
- React Router DOM
- Cypress
- Jest
- Axios
- Git
- Webpack
- SASS + Animations
- NPM
- Travis CI
- Faker
- Coveralls
- Husky
- Lint Staged
- Eslint
- Standard Javascript Style
- React Flip Move

> ## Features do React

- Functional Components
- UseState
- UseContext
- UseEffect
- UseHistory
- UseRef
- UseParams
- Custom Hooks
- Router
- Memo

> ## Features do Git

- Alias
- Log Personalizado
- Branch
- Reset
- Amend
- Tag
- Tag Anotada
- Stash
- Rebase
- Merge
- Add
- Commit
- Push
- Pull
- Shortlog
- Status

> ## Features do Typescript

- POO Avançado
- Interface
- Type Alias
- Namespace
- Module
- Utility Types
- Modularização de Paths
- Build
- Deploy
- Generics

> ## Features de Testes

- Testes Unitários
- Testes de Integração
- Testes e2e
- Cobertura de Testes
- Test Doubles
- Mocks
- Stubs
- Spies
- Fakes
- Dummies
