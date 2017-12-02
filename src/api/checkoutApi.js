import axios from 'axios'
import appConfig from '../../src/config'

/**
 * checkout api
 *
 * @module api/checkout
 */
export default {

    /**
     * PUT | change shipping address
     *
     * @param {string} cartid cart id
     * @param {object} formData ship object
     * @todo billing address
     * @returns {AxiosPromise} 200 | address object
     */
    updateAddress (cartid, formData) {
        const payload = {
            shippingAddress: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                countryCode: formData.countryCode,
                street: formData.street,
                city: formData.city,
                postcode: formData.postcode,
                provinceName: formData.provinceName
            }
        }

        return axios.put(appConfig.apiUrl + '/checkout/' + cartid + '/address', payload)
    },

    /**
     * GET | fetch all shipments
     *
     * @param {string} cartid cart id
     * @returns {AxiosPromise} 200 | all shipments
     */
    getShipments (cartid) {
        return axios.get(appConfig.apiUrl + '/checkout/' + cartid + '/shipping')
    },

    /**
     * PUT | update shipment
     *
     * @param {string} cartid cartid
     * @param {string} shipmentCode selected shipment code
     *
     * @returns {AxiosPromise} 204 | no content
     */
    updateShipment (cartid, shipmentCode) {
        const payload = {
            method: shipmentCode
        }

        return axios.put(appConfig.apiUrl + '/checkout/' + cartid + '/shipping/0', payload)
    },

    /**
     * GET | fetch all payments
     *
     * @param {string} cartid cart id
     * @returns {AxiosPromise} 200 | all payments
     */
    getPayments (cartid) {
        return axios.get(appConfig.apiUrl + '/checkout/' + cartid + '/payment')
    },

    /**
     * PUT | update payment
     *
     * @param {string} cartid cartid
     * @param {string} paymentCode selected payment code
     *
     * @returns {AxiosPromise} 204 | no content
     */
    updatePayment (cartid, paymentCode) {
        const payload = {
            method: paymentCode
        }

        return axios.put(appConfig.apiUrl + '/checkout/' + cartid + '/payment/0', payload)
    },

    /**
     * GET | fetch checkout object
     *
     * @param {string} cartid cart id
     * @returns {AxiosPromise} 200 | checkout object
     */
    get (cartid) {
        return axios.get(appConfig.apiUrl + '/checkout/' + cartid)
    },

    /**
     * PUT | complete checkout
     *
     * @param {string} cartid cartid
     * @param {object} payload user email and note
     *
     * @returns {AxiosPromise} 204 | no content
     */
    complete (cartid, payload) {
        return axios.put(appConfig.apiUrl + '/checkout/' + cartid + '/complete', payload)
    }
}
