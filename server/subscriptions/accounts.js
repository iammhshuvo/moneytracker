Meteor.publish("accounts",function()
{
    return DBAccounts.find({});
});