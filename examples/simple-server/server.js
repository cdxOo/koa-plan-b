var koa = require('koa'),
    router = require('koa-router');

var PlanB = require('../../src/'),
    Registry = require('./registry'),
    plans = require('./plans.json');

var conditions = Registry(),
    actions = Registry();

conditions.set('/foo-plan/is true?', async (context) => {
    return true;
});

actions.set('/foo-plan/do foo stuff', async (context) => {
    // do something interesing
})

var createPlanMW = PlanB({
    plans,
    onCondition: async (context, node) => {
        return await conditions.get(node.key)(context);
    },
    onAction: async (context, node) => {
        await actions.get(node.key)(context);
    }
})

router.get(
    '/foo',
    // we could add other middleware here
    // such as body middleware etc
    createPlanMW('foo-plan')
);

app.use(
    router.routes()
    router.allowedMethods()
);

app.listen(3055);
