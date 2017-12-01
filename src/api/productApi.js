import axios from 'axios'
import appConfig from '../../src/config'
import {toQueryString} from '../utils'

/**
 * Product API: get product, and list of products
 * @module api/product
 */
export default {

    /**
     * Get | fetch product list by taxon Code
     *
     * @param {string} code taxon code
     * @param {number} page page number
     * @returns {AxiosPromise} 200 | product list
     */
    getList (code, page = 1) {
        const query = {
            'channel': appConfig.apiChannel,
            'limit': appConfig.apiLimit,
            page
        }

        return axios.get(appConfig.apiUrl + '/taxon-products/' + code + '?' + toQueryString(query))
    },

    /**
     * Get | fetch product by Code
     *
     * @param {string} code product code
     * @returns {AxiosPromise} 200 | product object
     */
    getByCode (code) {
        const query = {
            'channel': appConfig.apiChannel,
            'locale': appConfig.apiLocale
        }
        return axios.get(appConfig.apiUrl + '/products/' + code + '?' + toQueryString(query))
    },

    /**
     * Get | fetch product by slug
     *
     * @param {string} slug product slug
     * @returns {AxiosPromise} 200 | product object
     */
    getBySlug (slug) {
        const query = {
            'channel': appConfig.apiChannel,
            'locale': appConfig.apiLocale
        }
        return axios.get(appConfig.apiUrl + '/products-by-slug/' + slug + '?' + toQueryString(query))
    },

    /**
     * Get | fetch latest product list
     *
     * @returns {AxiosPromise} 200 | product list
     */
    getLatest () {
        const query = {
            'channel': appConfig.apiChannel
        }

        return axios.get(appConfig.apiUrl + '/product-latest/' + '?' + toQueryString(query))
    }
}
