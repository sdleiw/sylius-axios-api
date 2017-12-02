import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import appConfig from '../../src/config'

import checkoutApi from '../../src/api/checkoutApi'

describe('api/checkout', () => {
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

    it('updates shipping address', () => {
        const cartid = '123456'
        const formData = {
            firstName: 'tester',
            lastName: 'unit',
            countryCode: 'DE',
            street: 'abc street 1',
            city: 'Nuremberg',
            postCode: '90419',
            provinceName: 'bayern'
        }
        const addressResponse = {address: 'address object'}
        mock.onPut(appConfig.apiUrl + '/checkout/' + cartid + '/address').reply(200, addressResponse)

        return checkoutApi.updateAddress(cartid, formData)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(addressResponse)
            })
    })

    it('fetches all the shipments', () => {
        const cartid = '123456'
        const shipmentsResponse = [{shipment1: 'shipment1'}, {shipment2: 'shipment2'}]
        mock.onGet(appConfig.apiUrl + '/checkout/' + cartid + '/shipping').reply(200, shipmentsResponse)

        return checkoutApi.getShipments(cartid)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(shipmentsResponse)
            })
    })

    it('updates selected shipment', () => {
        const cartid = '123456'
        const shipmentCode = '1'
        mock.onPut(appConfig.apiUrl + '/checkout/' + cartid + '/shipping/0').reply(204)

        return checkoutApi.updateShipment(cartid, shipmentCode)
            .then(response => {
                expect(response.status).to.equal(204)
            })
    })

    it('gets all the payments', () => {
        const cartid = '123456'
        const paymentsResponse = [{payment1: 'payment1'}, {payment2: 'payment2'}]

        mock.onGet(appConfig.apiUrl + '/checkout/' + cartid + '/payment').reply(200, paymentsResponse)

        return checkoutApi.getPayments(cartid)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(paymentsResponse)
            })
    })

    it('updates selected payment', () => {
        const cartid = '123456'
        mock.onPut(appConfig.apiUrl + '/checkout/' + cartid + '/payment/0').reply(204)

        return checkoutApi.updatePayment(cartid)
            .then(response => {
                expect(response.status).to.equal(204)
            })
    })

    it('fetches checkout object', () => {
        const cartid = '123456'
        const checkoutResponse = {checkout: 'checkout object'}
        mock.onGet(appConfig.apiUrl + '/checkout/' + cartid).reply(200, checkoutResponse)

        return checkoutApi.get(cartid)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(checkoutResponse)
            })
    })

    it('completes checkout', () => {
        const cartid = '123456'
        mock.onPut(appConfig.apiUrl + '/checkout/' + cartid + '/complete').reply(204)

        return checkoutApi.complete(cartid)
            .then(response => {
                expect(response.status).to.equal(204)
            })
    })
})
