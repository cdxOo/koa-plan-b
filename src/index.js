'use strict';
var PlanB = require('@cdxoo/plan-b');

module.exports = ({
    plans,
    onAction,
    onCondition,
    sync
}) => (selected) => (
    async (context, next) => {
        var runner = (
            PlanB()
            .plans(...plans)
            .onCondition(onCondition)
            .onAction(onAction)
        );

        if (sync) {
            runner.execute(selected) ;
        }
        else {
            await (
                runner
                .async(true)
                .execute(selected)
            );
        }
        
        await next();
    }
)
