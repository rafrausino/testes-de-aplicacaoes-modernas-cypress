/// <reference types="cypress" />

describe("Helpers...", () => {
  it("Wrap", () => {
    const obj = { nome: "User", idade: 20 };
    expect(obj).to.have.property("nome");
    cy.wrap(obj).should("have.property", "nome");

    cy.visit("https://wcaquino.me/cypress/componentes.html");
    // // cy.get('#formNome').type('funciona?')
    // cy.get('#formNome').then($el => {
    //     cy.wrap($el).type('funciona via cypress')
    //     // $el.val('funciona via jquery')
    //     // $el.type('funciona???')
    // })

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10);
      }, 500);
    });

    cy.get("#buttonSimple").then(() =>
      console.log("Encontrei o primeiro botão")
    );
    // promise.then(num => console.log(num))
    cy.wrap(promise).then((ret) => console.log(ret));
    cy.get("#buttonList").then(() => console.log("Encontrei o segundo botão"));

    // cy.wrap(1).then(num => {
    //     return 2
    // }).should('be.equal', 2)

    cy.wrap(1)
      .should((num) => {
        return 2;
      })
      .should("be.equal", 1);
  });

  //Its
  it("Its... ", () => {
    const obj = { nome: "User", idade: 18 };
    cy.wrap(obj).should("have.property", "nome", "User");
    cy.wrap(obj).its("nome").should("be.equal", "User");

    const obj2 = {
      nome: "User",
      idade: 18,
      endereco: { rua: "Rua Manoel Bandeira" },
    };
    cy.wrap(obj2).its("endereco").should("have.property", "rua");
    cy.wrap(obj2).its("endereco").its("rua").should("contain", "Bandeira");
    cy.wrap(obj2).its("endereco.rua").should("contain", "Manoel");

    cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.title().its("length").should("be.equal", 20);
  });

  // Inoke
  it("Inoke...", () => {
    const getValue = () => 1;
    const soma = (a, b) => a + b;

    cy.wrap({ fn: getValue }).invoke("fn").should("be.equal", 1);
    cy.wrap({ fn: soma }).invoke("fn", 3, 9).should("be.equal", 12);

    cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.get("#formNome").invoke("val", "Texto via invoke");
    cy.window().invoke("alert", "Dá pra ver?");
    cy.get("#resultado").invoke(
      "html",
      '<input type="button", value="Hached">'
    );
  });

  // Reutilizando o título
  it("Should visit a page and assert title", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");

    cy.title().should("be.equal", "Campo de Treinamento");
    cy.title().should("contain", "Campo").debug();

    cy.title()
      .should("be.equal", "Campo de Treinamento")
      .should("contain", "Campo");

    let syncTitle;

    cy.title().then((title) => {
      console.log(title);

      cy.get("#formNome").type(title);

      syncTitle = title;
    });

    //cy.get('[data-cy="dataSobrenome"]').then(syncTitle)
    cy.get('[data-cy="dataSobrenome"]').then(($el) => {
      $el.val(syncTitle);
    });

    cy.get("#elementosForm\\:sugestoes").then(($el) => {
      cy.wrap($el).type(syncTitle);
    });
  });

  // Dívida: Combos
  it("Combo", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.get("[data-test=dataEscolaridade]")
      .select("2o grau completo")
      .should("have.value", "2graucomp");

    cy.get("[data-test=dataEscolaridade]")
      .select("1o grau completo")
      .should("have.value", "1graucomp");

    cy.get("[data-test=dataEscolaridade] option").should("have.length", 8);
    cy.get("[data-test=dataEscolaridade] option").then(($arr) => {
      const values = [];
      $arr.each(function () {
        values.push(this.innerHTML);
      });
      expect(values).to.include.members(["Superior", "Mestrado"]);
    });
  });

  it.only("Combo Multiplo", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");

    cy.get("[data-testid=dataEsportes]")
        .select(["natacao", "Corrida", "nada"]);

    // cy.get('[data-testid=dataEsportes]').should('have.value', ['natacao', 'Corrida', 'nada'])
    cy.get("[data-testid=dataEsportes]").then(($el) => {
      expect($el.val()).to.be.deep.equal(["natacao", "Corrida", "nada"]);
      expect($el.val()).to.have.length(3);
    });

    cy.get("[data-testid=dataEsportes]")
      .invoke("val")
      .should("eql", ["natacao", "Corrida", "nada"]);
  });
});
