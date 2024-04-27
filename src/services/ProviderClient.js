import axios from "axios";

class ProviderClient {
    async login (data) {
        return axios({
            url: "http://localhost:3000/login-requester",
            method: "POST",
            timeout: 5000,
            data: data,
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async newRequester(data) {
        return axios({
            url: "http://localhost:3000/register-requester",
            method: "POST",
            timeout: 5000,
            data: data,
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async alredyExistPhone(phone) {
        return axios({
            url: `http://localhost:3000/requester-phone-alredy-registred?phone=${phone}`,
            method: "GET",
            timeout: 5000,
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
}
const providerClient = new ProviderClient()
export default providerClient;