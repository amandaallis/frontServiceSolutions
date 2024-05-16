import axios from "axios";

class ProviderServices {
    async login (data) {
        return axios({
            url: "https://back-service-solutions-edea454839be.herokuapp.com/login-provider",
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
            url: "https://back-service-solutions-edea454839be.herokuapp.com/register-provider?type=legal",
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
                url: "https://back-service-solutions-edea454839be.herokuapp.com/all-services",
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
            url: `https://back-service-solutions-edea454839be.herokuapp.com/email-alredy-registred?email=${email}`,
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
            url: `https://back-service-solutions-edea454839be.herokuapp.com/phone-alredy-registred?phone=${phone}`,
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

    async newTypeService(data, token) {
        return axios({
            url: `https://back-service-solutions-edea454839be.herokuapp.com/new-type-service`,
            method: "POST",
            data: data,
            timeout: 5000,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log("Response:", response.data);  // Log da resposta
            return Promise.resolve(response);
        }).catch((error) => {
            console.log("Error:", error);  // Log do erro
            return Promise.reject(error);
        });
    }
    async getUserInfo(token) {
        return axios({
            url: `https://back-service-solutions-edea454839be.herokuapp.com/user-info`,
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

    async getProvidersByServices(token, service) {
        console.log("Entrou no getProvider")
        console.log(service)
        const url = `https://back-service-solutions-edea454839be.herokuapp.com/available-provider/${service}`;
        try {
            const response = await axios({
                url: url,
                method: "GET",
                timeout: 5000,
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getTypeServiceById (id) {
        const url = `https://back-service-solutions-edea454839be.herokuapp.com/service/${id}`;
        try {
            const response = await axios({
                url: url,
                method: "GET",
                timeout: 5000,
                headers: {
                    Accept: 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
const providerServices = new ProviderServices()
export default providerServices;