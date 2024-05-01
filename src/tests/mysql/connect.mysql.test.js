const mysql = require('mysql2')

// create connection to pool server
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'passroot',
    database: 'aliconcon'
})

const batchSize = 10 //100000; // adjust batch size
const totalSize = 1000//1_000_000; // adjust  total size

let currentId = 1;
console.time('::::::::;TIMER::::::')
const insertBatch = async () => {
    const values = [];
    for (let i = 0; i < batchSize && currentId < totalSize; i++) {
        const name = `name-${currentId}`
        const age = currentId
        const address = `address-${currentId}`
        values.push([currentId, name, age, address])
        currentId++;
    }

    if (!values.length) {
        console.timeEnd('::::::::;TIMER::::::')
        pool.end(err => {
            if (err) {
                console.log(`error occurred while running batch`);
            } else {
                console.log(`Connection pool closed successfully`);
            }
        })
        return;
    }
    const sql = `INSERT INTO test_table (id, name, age, address) VALUES ?`
    // 
    pool.query(sql, [values], async function (err, results) {
        if (err) throw err
        console.log(`Inserted ${results.affectedRows} records`)
        await insertBatch()
    })
}

insertBatch().catch(error => console.log(error))

// perform a sample operation
// pool.query('SELECT 1 + 1 AS solution', function (err, results) {
// pool.query('SELECT * from aliconcon.users', function (err, results) {
//     if (err) throw err
//     console.log(`query result:`, results)
//     // close pool connection
//     pool.end(err => {
//         if (err) throw err
//         console.log(`connection closed`)
//     })
// })