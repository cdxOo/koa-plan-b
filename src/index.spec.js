var expect = require('chai').expect,
    compose = require('koa-compose'),

    PlanB = require('./index');

describe('koa-plan-b', () => {

    it('things', async () => {
        
        var executed = [];

        var executePlan = PlanB({
            plans: [
                {
                    graph: 'foo-plan',
                    nodes: [
                        [ '$start', 'is true?' ],
                        {
                            condition: 'is true?',
                            connect: [
                                [ true, 'do foo stuff' ],
                                [ false, '$end']
                            ]
                        },
                        [ 'do foo stuff', '$end']
                    ]
                },
                {
                    graph: 'bar-plan',
                    nodes: [
                        [ '$start', 'is true?' ],
                        {
                            condition: 'is true?',
                            connect: [
                                [ true, 'do bar stuff' ],
                                [ false, '$end']
                            ]
                        },
                        [ 'do bar stuff', '$end']
                    ]
                },
            ],
            onCondition: async (context, node) => {
                executed.push(node.key);
                return true;
            },
            onAction: async (context, node) => {
                executed.push(node.key);
            },
        });

        var calledNext = false;

        await compose([
            executePlan('foo-plan'),
            executePlan('bar-plan'),
            async (context, next) => {
                calledNext = true;
                await next;
            }
        ])(context);
        
        console.log(executed);
        expect(calledNext).to.equal(true);
        expect(executed).to.eql([
            '/foo-plan/is true?',
            '/foo-plan/do foo stuff',
            '/bar-plan/is true?',
            '/bar-plan/do bar stuff'
        ]);

    });

});
