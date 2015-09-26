/**
 * Created by asmmehedihasan on 9/26/15.
 */
Meteor.methods({
    "getBalanceAsync": function(accountId)
    {
        var acc = DBAccounts.findOne({_id: accountId});

        return acc.balance;
    }
});