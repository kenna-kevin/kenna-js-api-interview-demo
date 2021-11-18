const assert = require('assert')
const KennaAPI = require('../KennaAPI')
require('dotenv').config();
const userToken = process.env["X_RISK_TOKEN"]
const pactum = require('pactum')

describe('Asset Groups', () => {
    it('GET / responds with 200 OK', async () => {
        const ListAssetGroupRequest = new KennaAPI(userToken, { endpoint: "asset_groups" })
        const response = await ListAssetGroupRequest.get()
        
        assert.equal(response.statusCode, 200)
        assert.equal(response.json.hasOwnProperty("asset_groups"), true)
    });
    
    it('GET /:asset_group_id with invalid ID responds with 404', async () => {
        const invalidID = 12345678
        const ShowAssetGroupRequest = new KennaAPI(userToken, { endpoint: `asset_groups/${invalidID}` })
        const response = await ShowAssetGroupRequest.get()

        assert.equal(response.statusCode, 404)
        assert.equal(response.json.success, "false")
        assert.equal(response.json.message, "Asset Group not found.")
    })

    it('POST / responds with 201 Created', async () => {
        const CreateAssetGroupRequest = new KennaAPI(userToken, { endpoint: "asset_groups" })
        const createUserBody = {
            "asset_group": {
                "name": "Demo",
                "query": {
                    "status": ["active"],
                    "tags": ["foo", "bar"]
                }
            }
        }
        const response = await pactum.spec().post("https://api.kdev.docker/asset_groups").withBody(JSON.stringify(createUserBody))
        // const response = await CreateAssetGroupRequest.post(createUserBody)

        assert.equal(response.statusCode, 201)
    })

    it('updates an asset group', async () => {
        const assetGroupID = 304163
        const updateUserBody = {
            "asset_group":
                {
                    "name":"Postman Update"
                }
        }
        
        const UpdateAssetGroup = new KennaAPI(userToken, { endpoint: `asset_groups/${assetGroupID}` })
        
        const response = await UpdateAssetGroup.put(updateUserBody)

        assert.equal(response.statusCode, 204)
    })

    it.skip('deletes an asset group', async () => {
        const assetGroupID = 12345678
        const DeleteAssetGroup = new KennaAPI(userToken, { endpoint: `asset_groups/${assetGroupID}` })
        
        const response = await DeleteAssetGroup.delete()

        assert.equal(response.statusCode, 200)
    })
})

