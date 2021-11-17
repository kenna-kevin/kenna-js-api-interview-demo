const assert = require('assert')
const KennaAPI = require('../KennaAPI')
require('dotenv').config();
const userToken = process.env["X_RISK_TOKEN"]

describe('Asset Groups', () => {
    
    it('should respond with 200 cause auth works', async () => {
        const ListAssetGroupRequest = new KennaAPI(userToken, { endpoint: "/asset_groups" })
        const response = await ListAssetGroupRequest.get()
        
        assert.equal(response.statusCode, 200)
        assert.equal(response.json.hasOwnProperty("asset_groups"), true)
    });
    
    it('should response with 404 when asset groups id doesnt exist', async () => {
        const invalidID = 12345678
        const ShowAssetGroupRequest = new KennaAPI(userToken, { endpoint: `/asset_groups/${invalidID}` })
        const response = await ShowAssetGroupRequest.get()

        assert.equal(response.statusCode, 404)
        assert.equal(response.json.success, "false")
        assert.equal(response.json.message, "Asset Group not found.")
    })

    it('creates new asset group', async () => {
        const CreateAssetGroupRequest = new KennaAPI(userToken, { endpoint: "/asset_groups" })
        const createUserBody = {
            "asset_group": {
                "name":"Demo",
                "query": {
                    "status": ["active"],
                    "tags": ["foo", "bar"]
                }
            }
        }
        const response = await CreateAssetGroupRequest.post(createUserBody)

        assert.equal(response.statusCode, 200)
    })
})

