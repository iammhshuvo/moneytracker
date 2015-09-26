/**
 * Created by asmmehedihasan on 9/26/15.
 */
Meteor.methods({
    "updateWithdrawals": function(account)
    {
        DBTransactions.aggregate([ {$match: {"type":"withdrawal"}}, {$group: {"_id":"$toaccount",totalAmount: {$sum:"$amount"}}},{$out: "withdrawals"}]);
        var data = DBWithdrawals.find({});

        console.log(data.count());
        if(data.count() === 0)
        {
            DBWithdrawals.insert({_id: account, totalAmount:0});
        }

    }
});