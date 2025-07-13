const { getTodayBirthdays } = require('../repository/birthdaysRepository');

function getTodayBirthdaysFromDb() {
    return getTodayBirthdays();
}
module.exports = { getTodayBirthdaysFromDb };