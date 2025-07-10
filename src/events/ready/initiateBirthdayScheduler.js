const birthdayScheduler = require('../../schedulers/birthdaysScheduler.js')

module.exports = async (client) => {
console.log('Initiating birthdays scheduler.')
    birthdayScheduler(client);

}