const assert = require('assert')
const KennaAPI = require('../KennaAPI')
require('dotenv').config();
const userToken = process.env["X_RISK_TOKEN"]

describe('Asset Groups', () => {
    const AssetGroupRequest = new KennaAPI(userToken)
    it('GET / responds with 200 OK', async () => {
        const response = await AssetGroupRequest.get("/asset_groups")
        
        assert.equal(response.status, 200)
    });
    
    it('GET /:asset_group_id with invalid ID responds with 404', async () => {
        const invalidID = 12345678
        const response = await AssetGroupRequest.get(`/asset_groups/${invalidID}`)

        assert.equal(response.status, 404)
        assert.equal(response.data.success, "false")
        assert.equal(response.data.message, "Asset Group not found.")
    })

    it('POST / responds with 201 Created', async () => {
        const createUserBody = {
            "asset_group": {
                "name": "Demo",
                "query": {
                    "status": ["active"],
                    "tags": ["foo", "bar"]
                }
            }
        }
        const response = await AssetGroupRequest.post("asset_groups/", createUserBody)

        assert.equal(response.status, 201)
    })

    // TODO - Update already existing asset group
    it.skip('updates an asset group', async () => {
        // Need to get a valid ID
        const assetGroupID = 12345678
        const updateUserBody = {
            "asset_group":
                {
                    "name":"Postman Update"
                }
        }

        
        const response = await AssetGroupRequest.put(`asset_groups/${assetGroupID}`, updateUserBody)

        assert.equal(response.status, 204)
    })

    // TODO - Delete already existing asset group
    it.skip('deletes an asset group', async () => {
        // Need to get a valid ID
        const assetGroupID = 12345678
        
        const response = await AssetGroupRequest.delete(`asset_groups/${assetGroupID}`)

        assert.equal(response.status, 204)
    })
})

