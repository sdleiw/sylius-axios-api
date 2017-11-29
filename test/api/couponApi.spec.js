import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import appConfig from '../../src/config'

import couponApi from '../../src/api/couponApi'

describe('api/couponApi', () => {
    let mock

    before(() => {
        mock = new MockAdapter(axios)
    })

    afterEach(() => {
        mock.reset()
    })

    after(() => {
        mock.restore()
    })

    const testCartId = 'testCart9876'
    const testCartResponse = {item: 'testCartItem'}

    it('adds a coupon', (done) => {
        const coupon = 'abc'
        mock.onPut(appConfig.apiUrl + '/carts/' + testCartId + '/coupon', {coupon}).reply(200, testCartResponse)

        couponApi.add(testCartId, coupon)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testCartResponse)
                done()
            })
    })

    it('removes a coupon', (done) => {
        mock.onDelete(appConfig.apiUrl + '/carts/' + testCartId + '/coupon').reply(200, testCartResponse)

        couponApi.remove(testCartId)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testCartResponse)
                done()
            })
    })
})
