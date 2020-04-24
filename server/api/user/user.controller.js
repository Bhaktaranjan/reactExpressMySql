const { create, getUserById, getUsers, updateUser, deleteUser, getUserByEmail } = require('./user.services');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        console.log(req.body);
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error!'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results 
            })
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        console.log(id);
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record not found!'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        console.log(req.body);
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                message: 'User updated Successfully!' 
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        console.log(data);

        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record not found!'
                });
            }
            return res.json({
                success: 1,
                messsage: 'User deleted successfully!'
            });
        });
    },
    login: (req, res) => {
        const data = req.body;
        console.log(data);
        getUserByEmail(data.email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Invalid email or password!'
                });
            }
            console.log(results);
            const result = compareSync(data.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, 'abc123', {
                    expiresIn: '1h'    
                });

                return res.json({
                    success: 1,
                    message: "Login successfully!",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    message: 'Invaid Email or password!'
                });
            }
        });
    }
}