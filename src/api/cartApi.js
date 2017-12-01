import axios from 'axios'
import appConfig from '../../src/config'

/**
 * cart api includes
 * pickup fetch and remove of cart object
 * add, update and remove of each cart item
 *
 * @module api/cart
 */
export default {

    /**
     * POST | pickup a cart before add item to it, needs to send a uuid
     *
     * @param {string} cartid cart id
     * @returns {AxiosPromise} 201 | cart object
     */
    pickUp (cartid) {
        const data = {
            channel: appConfig.apiChannel
        }

        return axios.post(appConfig.apiUrl + '/carts/' + cartid, data)
    },

    /**
     * GET | fetch cart by id
     * @param {string} cartid cart id
     *
     * @returns {AxiosPromise} 200 | cart object
     */
    get (cartid) {
        return axios.get(appConfig.apiUrl + '/carts/' + cartid)
    },

    /**
     * POST | add item to cart
     * @todo: not working for single product without variantCode
     *
     * @param {string} cartid cart id
     * @param {string} productCode product code
     * @param {number} quantity item quantity
     * @param {string} variantCode variant code
     * @returns {AxiosPromise} 201 | cart object
     */
    addItem (cartid, productCode, quantity, variantCode) {
        return axios.post(appConfig.apiUrl + '/carts/' + cartid + '/items', {
            productCode,
            quantity,
            variantCode
        })
    },

    /**
     * PUT | update cart item
     *
     * @param {string} cartid cart id
     * @param {string} itemid item id
     * @param {number} quantity quantity
     * @returns {AxiosPromise} 200 | cart object
     */
    updateItem (cartid, itemid, quantity) {
        return axios.put(appConfig.apiUrl + '/carts/' + cartid + '/items/' + itemid, {quantity})
    },

    /**
     * DELETE | remove cart item
     *
     * @param {string} cartid cart id
     * @param {string} itemid item id
     * @returns {AxiosPromise} 200 | cart object
     */
    removeItem (cartid, itemid) {
        return axios.delete(appConfig.apiUrl + '/carts/' + cartid + '/items/' + itemid)
    },

    /**
     * DELETE | remove cart object
     *
     * @param {string} cartid cart id
     * @returns {AxiosPromise} 204 | no content
     */
    clear (cartid) {
        return axios.delete(appConfig.apiUrl + '/carts/' + cartid)
    }
}
