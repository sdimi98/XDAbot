const { db } = require('./db');

const GET_TODAY_BIRTHDAY = `SELECT * FROM birthdays WHERE strftime('%m-%d', date) = strftime('%m-%d', 'now');`;

function getTodayBirthdays() {
    return db.prepare(GET_TODAY_BIRTHDAY).all();
}
module.exports = { getTodayBirthdays };