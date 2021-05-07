const Fund = require('./Fund');
const Member = require('./Member');
const User = require('./User');

Fund.belongsTo(Member, {
  foreignKey: 'member_id',
  onDelete: 'SET NULL'
});
Member.hasMany(Fund, {
  foreignKey: 'member_id'
});
// Family.belongsTo(User, {
//   foreignKey: 'user_id',
//   // onDelete: 'SET NULL'
// });
// Fund.hasMany(Stock, {
//   foreignKey: 'stock_id',
//   onDelete: 'SET NULL',
// });
// Family.hasMany(Member, {
//     // update this foreign key
//     // foreignKey: ''
// });
// Stock.belongsToMany(Fund, {
//     // update this foreign key
// //   foreignKey: '',
// //   onDelete: 'SET NULL'
// });
// // to-Do: Fund belongs User, Member belongs to Family, more? 

module.exports = {
  Fund,
  Member,
  User
};
