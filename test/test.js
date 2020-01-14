var expect  = require('chai').expect;
var request = require('request');

/**
 * Service root page
 * @TO-DO: more test cases
 */
it('root page content', (done) => {
    request('http://localhost:3000/', (error, response, body) => {
        const res = {
            name: 'True to Size Calculation Service'
        }
        expect(JSON.parse(body)).to.deep.equal(res)
        expect(JSON.parse(body)).to.have.key('name')
        expect(JSON.parse(body).name).to.be.a('string')
        done();
    })
})

/**
 * /true-size page
 * @TO-DO: more test cases
 */
it('true-size response', (done) => {
    request('http://localhost:3000/true-size', (error, response, body) => {
        expect(JSON.parse(body)).to.have.keys(['status', 'data'])
        expect(JSON.parse(body).status).to.be.a('string')
        done()
    })
})

/**
 * /true-size/:shoe_id page
 * @TO-DO: more test cases
 */
it('true-size/:shoe_id response', (done) => {
    request('http://localhost:3000/true-size/1', (error, response, body) => {
        expect(JSON.parse(body)).to.have.keys(['status', 'data'])
        expect(JSON.parse(body).status).to.be.a('string')
        done()
    })
})