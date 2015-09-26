/**
 * Created by asmmehedihasan on 9/26/15.
 */
Meteor.publish("transactions",function(id)
{
    return DBTransactions.find({"toaccount": id});
});