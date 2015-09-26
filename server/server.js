/**
 * Created by asmmehedihasan on 9/24/15.
 */




Meteor.methods({
    "rmallTransactions":function(accountid)
    {
        DBTransactions.remove({toaccount: accountid});
    },
    "currentAccount": function(accountid)
    {
        return DBAccounts.findOne({_id: accountid});
    },

})