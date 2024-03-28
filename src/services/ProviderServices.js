import axios from "axios";

class ProviderServices {
    async login (data) {
        return axios({
            url: "http://localhost:3000/login-provider",
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
}
const providerServices = new ProviderServices()
export default providerServices;