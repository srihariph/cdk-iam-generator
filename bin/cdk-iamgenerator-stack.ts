import cdk = require('@aws-cdk/core');
import { IamPolicyGenerator, IamRoleGenerator } from '../lib/IamGenerator';



class IamStackExample extends cdk.Stack {
    constructor(app: cdk.App, id: string) {
      super(app, id);
      new IamPolicyGenerator(this,"IamPolicyGenerator",{
          configPath:"config/iam_generator_config.json",
          policyPath: "config/policy"
      });
      new IamRoleGenerator(this,"IamRoleGenerator",{
        configPath:"config/iam_generator_config.json"
    });
      
    }
  }
  
  
const app = new cdk.App();
new IamStackExample(app, 'IamStackExample');

app.synth();