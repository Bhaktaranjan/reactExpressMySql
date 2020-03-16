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
    }
}