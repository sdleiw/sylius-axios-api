import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import appConfig from '@/src/config'

import categoryApi from '@/src/api/categoryApi'

describe('api/category', () => {
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

    it('should get all categories', (done) => {
        const testCategories = [
            {name: 'category1'},
            {name: 'category2'},
            {name: 'category3'}
        ]
        mock.onGet(appConfig.apiUrl + '/taxons/').reply(200, testCategories)

        categoryApi.getAll()
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testCategories)
                done()
            })
    })

    it('should get category by code', (done) => {
        const testCategory = {name: 'category1'}
        const code = 'test1234'
        mock.onGet(appConfig.apiUrl + '/taxons/' + code + '?locale=' + appConfig.apiLocale).reply(200, testCategory)

        categoryApi.getByCode(code)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testCategory)
                done()
            })
    })
})
