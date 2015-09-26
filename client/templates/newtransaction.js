/**
 * Created by asmmehedihasan on 9/23/15.
 */
Template.newtransaction.helpers({
    showhide: function(){
        return Session.get('showhide')? "trns-show":"trns-hide";
    },
    edititem: function()
    {
        return Session.get("item");
    },
    edititemtrue: function()
    {
        return Session.get("edititemtrue");
    }
});
Template.newtransaction.events({
    'click .trns-cross':function(event,tempate)
    {
        Session.set("showhide",false);
        Session.set("edititemtrue",false);
    },
    "submit .newtrns": function(event,target)
    {
        event.preventDefault();
        var date = target.find(".datepicker").value;
        var ttype = target.find(".ttype").value;
        var purpose = target.find(".purpose").value;
        var amount = target.find(".amount").value;
        var toaccount = Session.get("acc_id");
        var transaction = {
            toaccount:toaccount,
            attime: new Date(date),
            type: ttype,
            purpose: purpose,
            amount: Number(amount)
        }
        //Meteor.methods("addTransactions",transaction);

        DBTransactions.insert(transaction);

        Meteor.call("getBalance",Session.get("acc_id"));

        target.find(".datepicker").value = date;
        target.find(".ttype").value = "";
        target.find(".purpose").value = "";
        target.find(".amount").value = "";

        Session.set("showhide",false);
        Meteor.call("getBalanceAsync",Session.get("acc_id"),function(err,data)
        {
            Session.set("balance",data);
        });
    },
    "submit .formedittransaction": function(event, target){
        event.preventDefault();

        var type = target.find(".edittype").value;
        var purpose = target.find(".editpurpose").value;
        var amount = target.find(".editamount").value;

        var edititem = Session.get("item");

        DBTransactions.update({_id:edititem._id},
            {$set:{
                type: type,
                purpose: purpose,
                amount: Number(amount)
            }},
            { upsert: false});

        Meteor.call("getBalance",Session.get("acc_id"));

        target.find(".edittype").value = "";
        target.find(".editpurpose").value = "";
        target.find(".editamount").value = "";

        Session.set("showhide",false);
        Session.set("item",{});

        Meteor.call("getBalanceAsync",Session.get("acc_id"),function(err,data)
        {
            Session.set("balance",data);
        });


    },
    "click .trns-outside":function(event,target)
    {

    }
});