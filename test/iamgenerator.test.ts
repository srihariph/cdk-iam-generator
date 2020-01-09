import '@aws-cdk/assert/jest';
import { Stack } from '@aws-cdk/core';
import iamgenerator = require('../lib/IamGenerator');

test('IAM Policy Generator', () => {
    const stack = new Stack();
    new iamgenerator.IamPolicyGenerator(stack, 'MyTestConstruct',{
      configPath:"test/config/iam_generator_config.json",
      policyPath: "test/config/policy"
    });
    expect(stack).toHaveResource("AWS::SQS::AWS::IAM::ManagedPolicy");
});

test('IAM Role Generator', () => {
    const stack = new Stack();
    new iamgenerator.IamRoleGenerator(stack, 'MyTestConstruct',{
      configPath:"test/config/iam_generator_config.json"
    });
    expect(stack).toHaveResource("AWS::IAM::Role");
});

