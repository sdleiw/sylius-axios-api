import axios from 'axios'
import appConfig from '../../src/config'

/**
 * Coupon API: add and remove coupon for the given cart id
 * @module api/coupon
 */
export default {

    /**
     * PUT | apply coupon
     *
     * @param {string} cartid cart id
     * @param {string} coupon coupon
     * @returns {AxiosPromise} 200 | cart object
     */
    add (cartid, coupon) {
        return axios.put(appConfig.apiUrl + '/carts/' + cartid + '/coupon', {coupon})
    },

    /**
     * DELETE | remove coupon
     *
     * @param {string} cartid cart id
     * @returns {AxiosPromise} 200 | cart object
     */
    remove (cartid) {
        return axios.delete(appConfig.apiUrl + '/carts/' + cartid + '/coupon')
    }
}
