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
        return DBTransactions.find({toaccount: Session.get("acc_id")});
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