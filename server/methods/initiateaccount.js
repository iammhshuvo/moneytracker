/**
 * Created by asmmehedihasan on 9/26/15.
 */
Meteor.methods({
   "initiateAccount": function(id)
   {
       DBDeposites.insert({_id: id, totalAmount:0});
       DBWithdrawals.insert({_id: id, totalAmount:0});
   }
});