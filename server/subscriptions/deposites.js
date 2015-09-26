Meteor.publish("deposites",function(accountid)
{
    return DBAccounts.find({_id:accountid});
});
