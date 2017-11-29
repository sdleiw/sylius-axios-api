import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import appConfig from '../../src/config'

import productApi from '../../src/api/productApi'
import {toQueryString} from '../../src/utils'

describe('api/product', () => {
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

    const responseProduct = {name: 'product1'}
    const responseProductList = [
        {name: 'product1'},
        {name: 'product2'},
        {name: 'product3'}
    ]

    it('gets list of product by the taxon code', () => {
        const testCode = 'testCategory1234'
        const query = {
            'channel': appConfig.apiChannel,
            'limit': appConfig.apiLimit,
            'page': 1
        }
        mock.onGet(appConfig.apiUrl + '/taxon-products/' + testCode + '?' + toQueryString(query))
            .reply(200, responseProductList)

        return productApi.getList(testCode)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(responseProductList)
            })
    })

    it('gets list of product by the taxon code on page 2', () => {
        const testCode = 'testCategory1234'
        const query = {
            'channel': appConfig.apiChannel,
            'limit': appConfig.apiLimit,
            'page': 2
        }
        mock.onGet(appConfig.apiUrl + '/taxon-products/' + testCode + '?' + toQueryString(query))
            .reply(200, responseProductList)

        return productApi.getList(testCode, 2)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(responseProductList)
            })
    })

    it('gets product by the product code', () => {
        const code = 'testProduct9876'
        mock.onGet(appConfig.apiUrl + '/products/' + code + '?channel=' + appConfig.apiChannel + '&locale=' + appConfig.apiLocale)
            .reply(200, responseProduct)
        return productApi.getByCode(code)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(responseProduct)
            })
    })

    it('gets product by slug', () => {
        const slug = 'testSlug'
        mock.onGet(appConfig.apiUrl + '/products-by-slug/' + slug + '?channel=' + appConfig.apiChannel + '&locale=' + appConfig.apiLocale)
            .reply(200, responseProduct)

        return productApi.getBySlug(slug)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(responseProduct)
            })
    })

    it('gets latest products', () => {
        mock.onGet(appConfig.apiUrl + '/product-latest/?channel=' + appConfig.apiChannel)
            .reply(200, responseProductList)

        return productApi.getLatest()
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(responseProductList)
            })
    })
})
