import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import appConfig from '@/src/config'

import reviewApi from '@/src/api/reviewApi'

describe('api/reviewApi', () => {
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

    const testReviewResponse = {review: '1'}

    it('gets review by slug', () => {
        const slug = 'testSlug'
        mock.onGet(appConfig.apiUrl + '/product-reviews-by-slug/' + slug + '?channel=' + appConfig.apiChannel)
            .reply(200, testReviewResponse)

        return reviewApi.getBySlug(slug)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testReviewResponse)
            })
    })

    it('adds review by slug', () => {
        const slug = 'testSlug'
        const title = 'testReview'
        const rating = '3'
        const comment = 'no comment'
        const email = 'unit@test.de'
        const data = {
            channelCode: appConfig.apiChannel,
            title,
            rating: parseInt(rating),
            comment,
            email
        }
        mock.onPost(appConfig.apiUrl + '/product-reviews-by-slug/' + slug, data)
            .reply(200, testReviewResponse)

        return reviewApi.addBySlug(slug, title, rating, comment, email)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(testReviewResponse)
            })
    })
})
