const axios = require('axios');

class KennaAPI {
    constructor(XRiskToken) {
        if (!XRiskToken) {
            throw new Error("No Risk Token provided")
        }
        this.instance = axios.create({
            baseURL: process.env.API_BASEURL,
            timeout: 10000,
            headers: { "Accept": "application/json", "Content-Type": "application/json", "x-risk-token": XRiskToken },
            validateStatus: null
        })
    }

    async get(path) {
        try {
            return await this.instance.get(path)
        }
        catch(err) {
            return err
        }
    }
    
    async post(path, body) {
        try {
            return await this.instance.post(path, body)
        }
        catch(err) {
            return err
        }
    }
    
    async put(path ,body) {
        try {
            return await this.instance.put(path, JSON.stringify(body))
        }
        catch (err) {
            return err
        }
    }
    
    async delete(path) {
        try {
            return await this.instance.delete(path)
        }
        catch (err) {
            return err
        }
    }
}

module.exports = KennaAPI