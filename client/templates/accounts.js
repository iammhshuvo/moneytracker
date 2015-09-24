/**
 * Created by asmmehedihasan on 9/23/15.
 */

Template.listaccount.helpers({
    allaccounts: function(){
        return DBAccounts.find();
    }

});
Template.listaccount.events({
    'keyup .accountname': function(event,template)
    {
       if(event.keyCode ===13)
       {
           var accountname = template.find(".accountname").value;
           var account = {
               name: accountname,
               createdon: new Date(),
               balance: 0
           }
           DBAccounts.insert(account);

           template.find(".accountname").value = "";
       }
    },
    "click .rmaccount":function(event,template)
    {
        DBAccounts.remove({_id:this._id});
    }
});

Template.account.events({
    'click .itemaccount': function()
    {
        Session.set('acc_id',this._id);
    }
});