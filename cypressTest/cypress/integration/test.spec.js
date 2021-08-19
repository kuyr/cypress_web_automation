/// <reference types="cypress" />

describe('Event landing page test', () => {
    it('Navigate to the event site', () => {
        cy.visit('https://www.morressier.com/event/5e733c5acde2b641284a7e27')
    })

    it('Renders the event landing page correctly', () => {
        cy.title().should('eq', 'ACS Spring 2020 National Meeting & Expo | Morressier')
        cy.get('.style__EventTitle-sc-1fffutc-4').should('have.text', 'ACS Spring 2020 National Meeting & Expo')
    })

    it('Valid search for submissions', () => {
        const validSearch = 'Magnetic iron oxide'

        cy.get('.sc-pVTma').type(`${validSearch}{enter}`)
        cy.get('.sc-TBWwm')
            .contains(validSearch)
        cy.get('.sc-pVTma').clear()
    })

    it('Invalid search for submissions', () => {
        const invalidSearch = 'dtydtykfuygugdtyi'

        cy.get('.sc-pVTma').type(`${invalidSearch}{enter}`)
        cy.get('.sc-TBWwm')
            .should('not.exist')
        cy.get('.sc-pVTma').clear()
    })

    it('Adds filter to the submission list and asserts', () => {
        cy.get('.style__SearchAndFiltersContainer-sc-1fffutc-9 > .sc-bqiQRQ').click()

        cy.get('.jss3 > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiExpansionPanelDetails-root > :nth-child(3) > .style__Ddd-sc-1x1tqvy-0').click({
            force: true
        })
        cy.get('.jss3 > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiExpansionPanelDetails-root > :nth-child(3) > .style__Ddd-sc-1x1tqvy-0').then(($filter) => {
            const filterTxt = $filter.text()
            cy.get('[style="padding: 1rem; margin-bottom: 1rem;"] > div > .sc-bqiQRQ').click()
            cy.get('.sc-TBWwm')
                .contains(filterTxt)
        })
    })
})