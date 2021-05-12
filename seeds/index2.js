const { User, Fund, Member } = require('../models');
const sequelize = require('../config/connection');
const fundData = [
    {
        stock_name: 'JNJ',
        quantity: '15',
        member_id: 7
    },
    {
        stock_name: 'DIS',
        quantity: '32',
        member_id: 8
    },
    {
        stock_name: 'DIS',
        quantity: '5',
        member_id: 9
    },
    {
        stock_name: 'MSFT',
        quantity: '10',
        member_id: 8
    },
    {
        stock_name: 'AAPL',
        quantity: '4',
        member_id: 10
    },
    {
        stock_name: 'AMZN',
        quantity: '3',
        member_id: 10
    }
];
const memberData = [
    {
        first_name: 'Linh',
        last_name: 'Nguyen',
        relationship: "best friend",
        user_id: 3
    },
    {
        first_name: 'Ben',
        last_name: 'Nguyen',
        relationship: "second best friend",
        user_id: 3
    },
    {
        first_name: 'Joe',
        last_name: 'Williams',
        relationship: "neighbor",
        user_id: 3
    },
    {
        first_name: 'Jane',
        last_name: 'Williams',
        relationship: "neighbor",
        user_id: 3
    },
    {
        first_name: 'Wilson',
        last_name: 'Wilsonson',
        relationship: "volleyball",
        user_id: 3
    }
];

const seedMember = () => Member.bulkCreate(memberData);
const seedFund = () => Fund.bulkCreate(fundData);
const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    // await seedUser();
    console.log('\n----- USERS SEEDED -----\n');
    await seedMember();
    console.log('\n----- MEMBERS SEEDED -----\n');
    await seedFund();
    console.log('\n----- FUNDS SEEDED -----\n');
    process.exit(0);
};
seedAll();
