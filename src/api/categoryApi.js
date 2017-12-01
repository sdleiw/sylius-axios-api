import axios from 'axios'
import appConfig from './../config'

/**
 * Category API: fetch all Categories and fetch category by Code
 * @module api/category
 */
export default {

    /**
     * GET | fetch taxons
     *
     * @returns {AxiosPromise} 200 | category tree
     */
    getAll () {
        return axios.get(appConfig.apiUrl + '/taxons/')
    },
    /**
     * GET | fetch category by code
     *
     * @param {string} code taxon code
     * @returns {AxiosPromise} 200 | category object
     */
    getByCode (code) {
        return axios.get(appConfig.apiUrl + '/taxons/' + code + '?locale=' + appConfig.apiLocale)
    }
}
