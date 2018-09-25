const mysql = require('mysql');

let connection = mysql.createConnection(
    {
        host: 'localhost',
        database: 'chirpr',
        user: 'chirprapp',
        password: 'password1'
    }
);

connection.connect();



// connection.query('SELECT * FROM USERS', (err, results, fields) => {
//     if(err) {
//         connection.end();
//         return console.log(err)
//     }
//     results.forEach(item => {
//         console.log(item.name)
//     });
//     connection.end();

// });

let getChirps = async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM CHIRPS', (err, results, fields) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

let getChirp = async id => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM CHIRPS WHERE id = ${id}`, (err, results, fields) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

let createChirp = async (values) => {
    return new Promise((resolve, reject) => {
        let userid = values.userid
        let text = values.chirp
        
        connection.query(`
            INSERT INTO CHIRPS (USERID, TEXT)
            VALUES (${userid}, '${text}')
        `, (err, results, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
    });
}

let updateChirp = async (id, values) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            UPDATE CHIRPS
            SET TEXT = '${values}' 
            WHERE ID = ${id}
        `, (err, results, fields) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

let deleteChirp = async id => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM CHIRPS WHERE id = ${id}`, (err, results, fields) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

let getMentions = async (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(`call spUserMentions(${userid})`, (err, results, fields) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            console.log(results);
            return resolve(results);
            
        });
    });
}


module.exports = {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp,
    GetMentions: getMentions
}