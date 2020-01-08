import { Construct, StackProps } from '@aws-cdk/core';
import { readFileSync } from 'fs';
import { IamPolicyRoleConfig, IamPolicyDocument, PoliciesEntity, Condition, RolesEntity } from './IPolicyRoleConfig';
import { ManagedPolicy, PolicyStatement, CompositePrincipal, ServicePrincipal, AccountPrincipal, Role } from '@aws-cdk/aws-iam';

export interface IamPolicyGeneratorProps extends StackProps {
  readonly configPath: string,
  readonly policyPath: string;
}

export interface IamRoleGeneratorProps extends StackProps {
  readonly configPath: string
}

export class IamPolicyGenerator extends Construct {

  constructor(scope: Construct, id: string, props: IamPolicyGeneratorProps) {
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

export class IamRoleGenerator extends Construct {

  constructor(scope: Construct, id: string, props: IamRoleGeneratorProps) {
    super(scope, id);
    let configjson: IamPolicyRoleConfig = JSON.parse(readFileSync(props.configPath).toString());
    let roles: RolesEntity[] = configjson.roles as RolesEntity[];
    let trust_service_principal: string[];
    let trust_account_principal: string[];
    let customer_managed_policies: string[];
    let aws_managed_policies: string[];
    let compositePrincipal;
    let role;

    for (var i = 0; i < roles.length; i++) {
      compositePrincipal = null;
      trust_service_principal = roles[i].trust_service_principal as string[]
      trust_account_principal = roles[i].trust_account_principal as string[]
      customer_managed_policies = roles[i].customer_managed_policies as string[];
      aws_managed_policies = roles[i].aws_managed_policies as string[];



      if (trust_service_principal != null) {
        for (var k = 0; k < trust_service_principal.length; k++) {
          if (compositePrincipal == null) {
            compositePrincipal = new CompositePrincipal(new ServicePrincipal(trust_service_principal[k]))
          } else {
            compositePrincipal.addPrincipals(new ServicePrincipal(trust_service_principal[k]))
          }
        }
      }

      if (trust_account_principal != null) {
        for (var k = 0; k < trust_account_principal.length; k++) {
          if (compositePrincipal == null) {
            compositePrincipal = new CompositePrincipal(new AccountPrincipal(trust_account_principal[k]))
          } else {
            compositePrincipal.addPrincipals(new AccountPrincipal(trust_account_principal[k]))
          }
        }
      }

      if (compositePrincipal != null) {
        role = new Role(this, roles[i].role_name, {
          roleName: roles[i].role_name,
          assumedBy: compositePrincipal
        });

        if (customer_managed_policies != null) {
          for (var j = 0; j < customer_managed_policies.length; j++) {
            role.addManagedPolicy(ManagedPolicy.fromManagedPolicyName(this, roles[i].role_name + customer_managed_policies[j], customer_managed_policies[j]))
          }
        }

        if (aws_managed_policies != null) {
          for (var j = 0; j < aws_managed_policies.length; j++) {
            role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName(aws_managed_policies[j]))
          }
        }

      }
    }
  }
}
