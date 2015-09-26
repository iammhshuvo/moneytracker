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
    "updateDeposites": function(account)
    {
        DBTransactions.aggregate([ {$match: {"type":"deposite"}}, {$group: {"_id":"$toaccount",totalAmount: {$sum:"$amount"}}},{$out: "deposites"}]);

        var data = DBDeposites.find({});

        if(data.count() === 0)
        {
            DBDeposites.insert({_id:account, totalAmount:0});
        }

    }
})