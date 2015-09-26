Meteor.methods({
    "getBalance" : function(ofAccount)
    {
        Meteor.call("updateDeposites",ofAccount);
        Meteor.call("updateWithdrawals",ofAccount);

        var accountDeposite = DBDeposites.findOne({_id: ofAccount});
        var accountWithdrawals = DBWithdrawals.findOne({_id:ofAccount});

        var depositeAmount = 0;
        var withdrawalAmount = 0;

        //console.log(accountDeposite.count());
        //console.log(accountWithdrawals.count());
        if(accountDeposite !="")
        {
            depositeAmount = Number(accountDeposite.totalAmount);
        }
        if(accountWithdrawals !="")
        {
            withdrawalAmount = Number(accountWithdrawals.totalAmount);
        }
        var balance = depositeAmount - withdrawalAmount;


        DBAccounts.update({_id:ofAccount},{$set: {balance: balance}});


    }
});