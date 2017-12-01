import axios from 'axios'
import appConfig from '../../src/config'

/**
 * Review API: fetch and add Review to product by slug
 * @module api/review
 */
export default {

    /**
     * GET | fetch Review by Product Slug of a channel
     *
     * @todo Channel parameter as dependency
     * @param {string} slug product slug
     * @returns {AxiosPromise} 200 | review object
     */
    getBySlug (slug) {
        return axios.get(appConfig.apiUrl + '/product-reviews-by-slug/' + slug + '?channel=' + appConfig.apiChannel)
    },

    /**
     * POST | add review to product by its slug
     *
     * @param {string} slug product slug
     * @param {string} title review title
     * @param {string} rating review rating
     * @param {string} comment review comment
     * @param {string} email customer email
     * @returns {AxiosPromise} 201 | no content
     */
    addBySlug (slug, title, rating, comment, email) {
        const data = {
            channelCode: appConfig.apiChannel,
            title,
            rating: parseInt(rating),
            comment,
            email
        }

        return axios.post(appConfig.apiUrl + '/product-reviews-by-slug/' + slug, data)
    }
}
