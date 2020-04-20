'use strict';
var PlanB = require('@cdxoo/plan-b');

module.exports = ({
    plans,
    onAction,
    onCondition,
}) => {
    var runner = (
        PlanB()
        .async(true)
        .plans(...plans)
    );

    // FIXME: do we want onCreate
    // to be able to check if all
    // conditions/actions are set
    // for example when someone
    // uses a registry like in
    // my example
    // FIXME: should we incorporate
    // the registry here ?

    raturn (selected) => (
        async (context, next) => {
            await (
                runner
                .onCondition(async (node) => (
                    onCondition(context, node)
                ))
                .onAction(async (node) => (
                    onAction(context, node)
                ))
                .execute(selected)
            );
        
            await next();
        }
    );

}
