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
        quantity: '15',
        member_id: 1
    },
    {
        stock_name: 'DIS',
        quantity: '32',
        member_id: 2
    },
    {
        stock_name: 'DIS',
        quantity: '1',
        member_id: 1
    },
    {
        stock_name: 'MSFT',
        quantity: '1',
        member_id: 3
    },
    {
        stock_name: 'AAPL',
        quantity: '1',
        member_id: 4
    },
    {
        stock_name: 'AMZN',
        quantity: '1',
        member_id: 1
    }

];


const memberData = [
    {
        first_name: 'Steph',
        last_name: 'Curry',
        email: 'steph@warriors.com',
        user_id: 1,
    },
    {
        first_name: 'Klay',
        last_name: 'Thompson',
        email: 'klay@warriors.com',
        user_id: 2,
    },
    {
        first_name: 'Clay',
        last_name: 'Coder',
        relationship: "best friend",
        user_id: 1
    },
    {
        first_name: 'Kevin',
        last_name: 'Durant',
        relationship: "former teammate",
        user_id: 2
    },
    {
        first_name: 'Kevin',
        last_name: 'Costner',
        relationship: "inspiration",
        user_id: 1
    },
    {
        first_name: 'Oprah',
        last_name: 'Winfrey',
        relationship: "confidant",
        user_id: 2
    },
    {
        first_name: 'Wilson',
        last_name: 'Wilsonson',
        relationship: "volleyball",
        user_id: 1
    },
    {
        first_name: 'Curtis',
        last_name: 'Mayfield',
        relationship: "brother",
        user_id: 2
    },
];
const seedUser = () => User.bulkCreate(userData);
const seedMember = () => Member.bulkCreate(memberData);
const seedFund = () => Fund.bulkCreate(fundData);


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUser();
    console.log('\n----- USERS SEEDED -----\n');

    await seedMember();
    console.log('\n----- MEMBERS SEEDED -----\n');

    await seedFund();
    console.log('\n----- FUNDS SEEDED -----\n');

    process.exit(0);
};

seedAll();
