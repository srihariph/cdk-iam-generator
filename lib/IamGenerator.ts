import { Construct, StackProps } from '@aws-cdk/core';
import { readFileSync } from 'fs';
import { IamPolicyRoleConfig, IamPolicyDocument, PoliciesEntity, Condition } from './IPolicyRoleConfig';
import { ManagedPolicy, PolicyStatement } from '@aws-cdk/aws-iam';

export interface IamGeneratorProps extends StackProps {
    readonly configPath: string,
    readonly policyPath: string;
}

export class IamPolicyGenerator extends Construct {

    constructor(scope: Construct, id: string, props: IamGeneratorProps) {
        super(scope, id);
        let configjson: IamPolicyRoleConfig = JSON.parse(readFileSync(props.configPath).toString());

        let policies: PoliciesEntity[] | null | undefined = configjson.policies;
        let statement_actions: string[] | string;
        let statement_resources: string;
        let statement_conditions: Condition;

        if (policies != null) {
            for (var i = 0; i < policies.length; i++) {

                let policy_name = policies[i].policy_name;
                let policy_file = policies[i].policy_file;
                let policyJson: IamPolicyDocument = JSON.parse(readFileSync(props.policyPath + '/' + policy_file).toString());
                let managedPolicy = new ManagedPolicy(this, policy_name, {
                    managedPolicyName: policy_name
                });
                let iamPolicyStatement;
                if (policyJson.Statement != null) {
                    for (var j = 0; j < policyJson.Statement.length; j++) {
                        if (typeof policyJson.Statement[j].Action === "string") {
                            statement_actions = policyJson.Statement[j].Action as string;
                            statement_resources = policyJson.Statement[j].Resource as string;
                            statement_conditions = policyJson.Statement[j].Condition as Condition;

                            iamPolicyStatement = new PolicyStatement({
                                resources: [statement_resources],
                                actions: [statement_actions],
                                conditions: statement_conditions
                            });
                        } else {
                            statement_actions = policyJson.Statement[j].Action as string[];
                            statement_resources = policyJson.Statement[j].Resource as string;
                            statement_conditions = policyJson.Statement[j].Condition as Condition;

                            iamPolicyStatement = new PolicyStatement({
                                resources: [statement_resources],
                                actions: statement_actions,
                                conditions: statement_conditions
                            });
                        }
                        managedPolicy.addStatements(iamPolicyStatement);

                    }
                }
            }
        }
    }
}  
