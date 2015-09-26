/**
 * Created by asmmehedihasan on 9/23/15.
 */

Template.listaccount.helpers({
    allaccounts: function(){
        return DBAccounts.find();
    }

});
Template.listaccount.events({
    "click .rmaccount":function(event,template)
    {
        Meteor.call("rmallTransactions",this._id);
        DBAccounts.remove({_id:this._id});
    }
});

Template.account.events({
    'click .itemaccount': function()
    {
        Meteor.call("getBalance",this._id);
        Session.set("selectedAccount",this);
        Session.set('acc_id',this._id);

        Meteor.call("getBalanceAsync",Session.get("acc_id"),function(err,data)
        {
            Session.set("balance",data);
        });
        console.log("After ALll: "+Session.get("balance"));
    },
    "mousemove .rmaccount":function(event,template)
    {
        Session.set("cross-through",true);
    },
    "mouseover .rmaccount":function(event,template)
    {
        Session.set("cross-through",false);
    }

});

Template.newaccount.events({
    'keyup .accountname': function(event,template)
    {
        if(event.keyCode ===13)
        {
            var accountname = template.find(".accountname").value;
            if(accountname ==="")
            {
                alert("Please Enter A name");
            }else
            {
                var account = {
                    name: accountname,
                    createdon: new Date(),
                    balance: 0
                }
                DBAccounts.insert(account,function(err,insertedId)
                {
                    DBDeposites.insert({_id: insertedId, totalAmount:0});
                    DBWithdrawals.insert({_id: insertedId, totalAmount:0});
                    Session.set("acc_id",insertedId);
                });



            }

            //
            template.find(".accountname").value = "";
        }
    }
});

Template.account.helpers({
    crossthrough:function() {
        return Session.get("cross-through")? "cross-through":"";
    }
});