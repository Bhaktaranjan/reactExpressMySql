const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(
            `Insert into users (first_name, last_name, email, password)
            values (?, ?, ?, ?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        )
    },
    getUsers: callback => {
        pool.query(
            `Select id, first_name, last_name, email from users`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        )
    },
    getUserById: (id, callback) => {
        pool.query(
            `select id, first_name, last_name, email from users where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0]);
            }
        )
    },
    updateUser: (data, callback) => {
        pool.query(
            `update users SET first_name=?, last_name=?, email=?, password=? where id=?`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0]);
            }
        )
    },
    deleteUser: (data, callback) => {
        pool.query(
            `DELETE from users where id=?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        )
    },
    getUserByEmail: (email, callback) => {
        pool.query(
            `select id, first_name, last_name, email, password from users where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results[0]);
            }
        )
    }
}