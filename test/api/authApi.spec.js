import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import appConfig from '../../src/config'

import authApi from '../../src/api/authApi'

describe('api/auth', () => {
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

    it('logins in', () => {
        const data = {
            email: 'test@unit.de',
            password: '012345'
        }
        const payload = {
            _username: data.email,
            _password: data.password
        }
        const loginResponse = {token: '123456'}

        mock.onPost(appConfig.apiUrl + '/login_check', payload).reply(200, loginResponse)

        return authApi.login(data)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(loginResponse)
            })
    })

    it('registers', () => {
        const data = {
            firstName: 'tester',
            lastName: 'unit',
            email: 'tester@unit.de',
            password: 'secret'
        }
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            plainPassword: data.password,
            channel: appConfig.apiChannel
        }

        mock.onPost(appConfig.apiUrl + '/register', payload).reply(204)

        return authApi.register(data)
            .then(response => {
                expect(response.status).to.equal(204)
            })
    })

    it('gets user', () => {
        const token = '123456'
        const userResponse = {user: 'user'}
        mock.onGet(appConfig.apiUrl + '/me', {
            headers: { Authorization: 'Bearer ' + token }
        }).reply(200, userResponse)

        return authApi.getMe(token)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.data).to.deep.equal(userResponse)
            })
    })
})
