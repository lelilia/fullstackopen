function is_decreasing(num) {
  if(num.length === 1){
    return true
  }
  for (let i = 0; i < num.length - 1; i++) {
    if (num[i+1] > num[i]){
      return false
    }
  }
  return true
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'someone',
      username: 'dummy',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('5.17 Login form is shown', function () {
    cy.contains('login')
  })

  describe('5.18 Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('dummy')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('someone logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.red').contains('wrong username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({  username: 'dummy', password: 'password' })
    })

    it('5.19 A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#inputTitle').type('new blog was created')
      cy.get('#inputAuthor').type('somebody wrote that')
      cy.get('#inputUrl').type('www.click.me')
      cy.get('#newBlog').click()
      cy.contains('new blog was created')
      cy.contains('somebody wrote that')
    })

    describe('and some blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: '1st entry',
          author: 'some author',
          likes: 6
        })
        cy.createBlog({
          title: '2nd entry',
          author: 'some author'
        })
        cy.createBlog({
          title: '3rd entry',
          author: 'some author',
          likes: 45
        })
        cy.createBlog({
          title: '4th entry',
          author: 'some author',
          likes: 4
        })
      })
      it('5.20 blog can be liked', function() {
        cy.contains('2nd entry').as('theBlog')
        cy.get('@theBlog').find('.hideButton').click()
        cy.get('@theBlog').find('.likeButton').click()
        cy.get('@theBlog').should('contain', 'likes 1')
      })

      it('5.22 blogs are ordered by likes', function() {
        cy.get('.likes').then(b => {
          console.log(b)
          let arr = []
          for (let i = 0; i < b.length; i++) {
            arr.push(parseInt(b[i].innerText))
          }
          cy.wrap(is_decreasing(arr)).should('to.be.true')
        })
      })
    })
  })

  describe('5.21 when there are blogs by other user already', function() {
    beforeEach(function() {
      const user = {
        name: 'other user',
        username: 'other',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.login({  username: 'other', password: 'password' })
      cy.createBlog({
        title: '1st entry',
        author: 'some author'
      })
      cy.createBlog({
        title: '2nd entry',
        author: 'some author'
      })
      cy.createBlog({
        title: '3rd entry',
        author: 'some author'
      })
      cy.contains('logout').click()
      cy.login({  username: 'dummy', password: 'password' })
      cy.createBlog({
        title: 'own entry',
        author: 'some author'
      })
    })

    it('possible to remove own etry', function(){
      cy.contains('own entry').as('entry')
      cy.get('@entry').find('.hideButton').click()
      cy.get('@entry').find('.deleteButton').click()

      cy.contains('own entry').should('not.exist')
    })
    it('cant delete etries by other user', function() {
      cy.contains('1st entry').as('entry')
      cy.get('@entry').find('.hideButton').click()
      cy.get('@entry').find('.deleteButton').should('not.be.visible')
    })
  })
})