import axios from "axios";

class ProviderClient {
    async login (data) {
        return axios({
            url: "https://back-service-solutions-edea454839be.herokuapp.com/login-requester",
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
            url: "https://back-service-solutions-edea454839be.herokuapp.com/register-requester",
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
            url: `https://back-service-solutions-edea454839be.herokuapp.com/requester-phone-alredy-registred?phone=${phone}`,
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

    async newService(data, token) {
        return axios({
            url: `https://back-service-solutions-edea454839be.herokuapp.com/new-required-service`,
            method: "POST",
            timeout: 5000,
            data: data,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`

            }
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        });
    }

    async getRequiredServiceByProvider({token}) {
        console.log("Entrou requiredService")
        console.log(token)
        return axios({
            url: `https://back-service-solutions-edea454839be.herokuapp.com/list-solicitations-by-provider`,
            method: "GET",
            timeout: 5000,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
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