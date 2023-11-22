import userApiService from '../service/userApiService';

const testApi = (req, res) => {
    res.status(200).json({
        'message': 'success',
        'data': 'test API'
    })
}
const handleRegister = async (req, res) => {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            res.status(200).json({
                EM: 'Missing input',
                EC: '1',
                DT: '',
            })
        }
        let password = req.body.password;
        if (password.length < 3) {
            res.status(200).json({
                EM: 'Password phải dài hơn 3 ký tự',
                EC: '2',
                DT: '',
            })
        }
        // Service handling
        let data = await userApiService.userRegister(req.body);
        // Return 
        res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: (data.DT) ? data.DT : '',
        })
    } catch (error) {
        res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: '',
        })
    }
}
const handleLogin = async (req, res) => {
    try {
      let data = await userApiService.userLogin(req.body);
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      console.log("Cookies: ", req.cookies);
      res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT ? data.DT.access_token : "",
      });
    } catch (error) {
        res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: '',
        })
    }
}
module.exports = {
    testApi,
    handleLogin,
    handleRegister,
}