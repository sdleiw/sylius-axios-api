import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import appConfig from '../../src/config'

import cartApi from '../../src/api/cartApi'

describe('api/cart', () => {
    // @todo need a better way to deal with mock for all the api tests
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

    it('picks up a cart', () => {
        const data = {
            channel: appConfig.apiChannel
        }
        mock.onPost(appConfig.apiUrl + '/carts/' + testCartId, data).reply(201)

        return cartApi.pickUp(testCartId)
            .then(response => {
                expect(response.status).to.equal(201)
            })
    })

    it('adds products to the cart', () => {
        const productCode = 'testProduct1234'
        const quantity = 2
        const variantCode = 'testVariant5678'
        const data = {
            productCode,
            quantity,
            variantCode
        }
        mock.onPost(appConfig.apiUrl + '/carts/' + testCartId + '/items', data).reply(201, testCartResponse)

        return cartApi.addItem(testCartId, productCode, quantity, variantCode)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.data).to.deep.equal(testCartResponse)
            })
    })

    it('gets the cart', () => {
        mock.onGet(appConfig.apiUrl + '/carts/' + testCartId).reply(200, testCartResponse)

        return cartApi.get(testCartId)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testCartResponse)
            })
    })

    it('updates item in the cart', () => {
        const itemid = 'testItem'
        const quantity = 2
        mock.onPut(appConfig.apiUrl + '/carts/' + testCartId + '/items/' + itemid, {quantity}).reply(200, testCartResponse)

        return cartApi.updateItem(testCartId, itemid, quantity)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testCartResponse)
            })
    })

    it('removes item in the cart', () => {
        const itemid = 'testItem'
        mock.onDelete(appConfig.apiUrl + '/carts/' + testCartId + '/items/' + itemid).reply(200, testCartResponse)

        return cartApi.removeItem(testCartId, itemid)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testCartResponse)
            })
    })

    it('clears cart', () => {
        mock.onDelete(appConfig.apiUrl + '/carts/' + testCartId).reply(200)

        return cartApi.clear(testCartId)
            .then(response => {
                expect(response.status).to.equal(200)
            })
    })
})
