import cdk = require('@aws-cdk/core');
import { IamPolicyGenerator, IamRoleGenerator } from 'cdk-iamgenerator';


export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
 
    new IamPolicyGenerator(this,"IamPolicyGenerator",{
        configPath:"config/iam_generator_config.json",
        policyPath: "config/policy"
    });
 
    new IamRoleGenerator(this,"IamRoleGenerator",{
        configPath:"config/iam_generator_config.json"
    });
    // The code that defines your stack goes here
  }
}
