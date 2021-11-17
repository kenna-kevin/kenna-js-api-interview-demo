const pactum = require('pactum');

class KennaAPI {
    constructor(XRiskToken, options) {
        this.baseurl = options?.baseurl || "https://api.kdev.docker/"
        try {
            this.endpoint = options.endpoint
        }
        catch {
            console.log("You must provide the Kenna endpoint route")
            throw new Error
        }
        if (!XRiskToken) {
            throw new Error("No Risk Token provided")
        }
        this.headers = { "Content-Type": "application/json", "x-risk-token": XRiskToken }

        pactum.request.setBaseUrl(this.baseurl)
        pactum.request.setDefaultHeaders(this.headers)
    }

    get() {
        return pactum.spec()
            .get(this.endpoint)
    }

    post(jsonBody) {
        return pactum.spec().post(this.endpoint).withJson(jsonBody)
    }
}

module.exports = KennaAPI