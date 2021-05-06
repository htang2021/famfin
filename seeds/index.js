const { User, Fund, Member } = require('../models');
const sequelize = require('../config/connection');

const userData = [
    {
        first_name: 'Steph',
        last_name: 'Curry',
        email: 'steph@warriors.com',
        password: 'warriorswin'
    },
    {
        first_name: 'Klay',
        last_name: 'Thompson',
        email: 'klay@warriors.com',
        password: 'splashbros'
    },
];

const fundData = [
    {
        stock_name: 'JNJ',
        quantity: '15'
    },
    {
        stock_name: 'DIS',
        quantity: '32'
    },
];


const memberData = [
    {
        first_name: 'Clay',
        last_name: 'Coder',
        relationship: "best friend"
    },
    {
        first_name: 'Kevin',
        last_name: 'Durant',
        relationship: "former teammate"
    },
];
const seedUser = () => User.bulkCreate(userData);
const seedFund = () => Fund.bulkCreate(fundData);
const seedMember = () => Member.bulkCreate(memberData);


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUser();
    console.log('\n----- USERS SEEDED -----\n');

    await seedFund();
    console.log('\n----- FUNDS SEEDED -----\n');

    await seedMember();
    console.log('\n----- MEMBERS SEEDED -----\n');

    process.exit(0);
};

seedAll();