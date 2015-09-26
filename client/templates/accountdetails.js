/**
 * Created by asmmehedihasan on 9/23/15.
 */
Template.accountdetails.helpers({
    accountInfo: function()
    {
        return DBAccounts.findOne({_id: Session.get('acc_id')});
    }
    ,
    transactions: function()
    {
        return DBTransactions.find({});
    },
    isValidAmount: function()
    {
        var amount = Session.get("balance");

        if(Session.get("balance") < 0)
        {
            return "invalidamount";
        }
        else
            return "valid";
    }

});

Template.accountdetails.events({
    "click .newtransaction": function(event,template)
    {
        Session.set("showhide",true);

    }
});

Template.transactionitem.helpers({

});
Template.transactionitem.events({
    "click .rmtransaction": function(event,target)
    {
        //alert(this._id);
        DBTransactions.remove({_id:this._id});
        Meteor.call("getBalance",Session.get("acc_id"));


        Meteor.call("getBalanceAsync",Session.get("acc_id"),function(err,data)
        {
            Session.set("balance",data);
        });
    },
    "dblclick .dataitem": function (event) {
        var edititem = {
            _id: this._id,
            type: this.type,
            purpose: this.purpose,
            amount: this.amount
        };
        Session.set("item",edititem);
        Session.set("edititemtrue",true);
        Session.set("showhide",true);
    },
    "click .edittransaction": function()
    {
        var edititem = {
          _id: this._id,
            type: this.type,
            purpose: this.purpose,
            amount: this.amount
        };
        Session.set("item",edititem);
        Session.set("edititemtrue",true);
        Session.set("showhide",true);
    }

});


Template.registerHelper('formatDate', function(date) {
    return date.format('MM-DD-YYYY');
});