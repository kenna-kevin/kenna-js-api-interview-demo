const pactum = require('pactum');

class KennaAPI {
    constructor(XRiskToken, options) {
        this.baseurl =  process.env.API_BASEURL || options?.baseurl
        try {
            this.endpoint = options.endpoint
        }
        catch {
            throw new Error("You must provide the Kenna endpoint route")
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

    put(jsonBody) {
        return pactum.spec().put(this.endpoint).withJson(jsonBody)
    }

    delete() {
        return pactum.spec().delete(this.endpoint)
    }
}

module.exports = KennaAPI