describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users',{
      username: 'testMan', password:'1234'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#usernameField').type('testMan')
      cy.get('#passwordField').type('1234')
      cy.get('#loginButton').click()
      cy.contains('logged in as')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameField').type('testMan')
      cy.get('#passwordField').type('wrongPassword')
      cy.get('#loginButton').click()
      cy.contains('incorrect credentials')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login',{
        username: 'testMan', password:'1234'
      }).then(async response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
        await cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          headers:{ authorization: `bearer ${token}` },
          body: {
            title: 'test1',
            author: 'tester2',
            url: '1234',
            likes: 1
          }
        })
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.get('.toggleButton').click()
      cy.get('.title').type('TitleByTestMan')
      cy.get('.author').type('TestMan')
      cy.get('.url').type('123456789')
      cy.get('.addBlogButton').click()
      cy.contains('TitleByTestMan')
    })
    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.get('.likeButton').click()
      cy.contains('likes: 2')
    })
    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.get('.removeButton').click()
      cy.contains('"test1" removed')
    })
    it('Blogs are in order of likes', async function() {
      const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
      await cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        headers:{ authorization: `bearer ${token}` },
        body: {
          title: 'test2',
          author: 'tester2',
          url: '1234'
        }
      })
      await cy.get('.hidden').eq(1).contains('view').click()
      await cy.get('.likeButton').click()
      await cy.get('.likeButton').click()
      await cy.get('.expanded').contains('hide').click()
      await cy.get('.hidden').eq(0).contains('test2')
      await cy.get('.hidden').eq(1).contains('test1')
    })
  })

})
