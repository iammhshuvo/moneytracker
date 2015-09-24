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
            amount: amount
        }
        //Meteor.methods("addTransactions",transaction);
        if(Session.get("edititemtrue"))
        {
            DBTransactions.update();
        }
        else {
            DBTransactions.insert(transaction);
        }

        target.find(".datepicker").value = date;
        target.find(".ttype").value = "";
        target.find(".purpose").value = "";
        target.find(".amount").value = "";

        Session.set("showhide",false);
    },
    "click .trns-outside":function(event,target)
    {

    }
});