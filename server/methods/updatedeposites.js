Meteor.methods({
    "updateDeposites": function(account)
    {
        DBTransactions.aggregate([ {$match: {"type":"deposite"}}, {$group: {"_id":"$toaccount",totalAmount: {$sum:"$amount"}}},{$out: "deposites"}]);

        var data = DBDeposites.find({_id:account});

        if(data.count() === 0)
        {
            DBDeposites.insert({_id:account, totalAmount:0});
        }

    }
});