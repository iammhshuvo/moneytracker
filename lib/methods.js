/**
 * Created by asmmehedihasan on 9/23/15.
 */

if(Meteor.isServer)
{
    Meteor.methods({
        deleteAllTransactions: function(id)
        {
            return DBTransactions.remove({toaccount: id});
        },
        addTransactions: function(data)
        {
            DBTransactions.insert(data);
        }
    });
}
