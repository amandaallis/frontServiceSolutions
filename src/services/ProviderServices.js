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

    async newProviderLegal(data) {
        return axios({
            url: "http://localhost:3000/register-provider?type=legal",
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

    async listServices(token) {
        try {
            const response = await axios({
                url: "http://localhost:3000/all-services",
                method: "GET",
                timeout: 5000,
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
            }});
            
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    

    async alredyExistEmail(email) {
        return axios({
            url: `http://localhost:3000/email-alredy-registred?email=${email}`,
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
    
    async alredyExistPhone(phone) {
        return axios({
            url: `http://localhost:3000/phone-alredy-registred?phone=${phone}`,
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
const providerServices = new ProviderServices()
export default providerServices;