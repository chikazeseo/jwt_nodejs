
const testApi = (req, res) => {
    res.status(200).json({
        'message': 'success',
        'data': 'test API'
    })
}

module.exports = {
    testApi
}