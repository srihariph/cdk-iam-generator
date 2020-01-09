# CDK IAM Generator


[AWS CDK] construct helps create IAM Managed Policies and IAM Roles using JSON Configuration  

This package is written in TypeScript and made available via [JSII] to all other supported languages. Package are available on:

- [npm]
- [PyPI]

## Quickstart

Install or update from npm

TypeScript/Javascript

```console
npm i cdk-iam-generator

```

Python

```console
pip install cdk-iamgenerator

```

## Usage

** TypeScript **

```typescript
    import { IamPolicyGenerator, IamRoleGenerator } from 'cdk-iam-generator';

    new IamPolicyGenerator(this,"IamPolicyGenerator",{
        configPath:"config/iam_generator_config.json",
        policyPath: "config/policy"
    });

    new IamRoleGenerator(this,"IamRoleGenerator",{
        configPath:"config/iam_generator_config.json"
    });
```

## Prerequsites

Example folder structure for Json Configuration of Roles and Policies: 

```
config
├── policy
│   ├── CodeCommitArchive.json
│   └── KMSPolicy.json
│   └── CreateServiceLinkedRoleECS.json
│   └── DeployService1.json
│   └── DeployService2.json
├── iam_generator_config.json

```

Place all the Policy Json files inside config/policy in your project root and policy file would look something like this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "codecommit:CancelUploadArchive",
        "codecommit:UploadArchive"
      ],
      "Resource": "*"
    }
  ]
}
```

Configure the policies and roles to be created in config/iam_generator_config.json file and would look something like this:

```json
{
    "policies": [     
        {
            "policy_name": "CodeCommitArchive",
            "description": "CodeCommitArchive policy",
            "policy_file": "CodeCommitArchive.json"
        },
        {
            "policy_name": "KMSPolicy",
            "description": "KMSPolicy policy",
            "policy_file": "KMSPolicy.json"
        },
        {
            "policy_name": "CreateServiceLinkedRoleECS",
            "description": "CreateServiceLinkedRoleECS policy",
            "policy_file": "CreateServiceLinkedRoleECS.json"
        },
        {
            "policy_name": "DeployService1",
            "description": "DeployService1 policy",
            "policy_file": "DeployService1.json"
        },
        {
            "policy_name": "DeployService2",
            "description": "DeployService2 policy",
            "policy_file": "DeployService2.json"
        }
    ],
    "roles": [
        {
            "role_name": "TestRole1",
            "trust_service_principal": ["apigateway.amazonaws.com","lambda.amazonaws.com"],
            "customer_managed_policies": ["DeployService1","DeployService2","KMSPolicy"],
            "aws_managed_policies": ["service-role/AmazonAPIGatewayPushToCloudWatchLogs"]
        },
        {
            "role_name": "TestRole2",
            "trust_service_principal": ["sns.amazonaws.com"],
            "trust_account_principal": ["748669239283"],
            "customer_managed_policies": ["CreateServiceLinkedRoleECS","CodeCommitArchive","KMSPolicy"],
            "aws_managed_policies": ["service-role/AmazonAPIGatewayPushToCloudWatchLogs"]
        },
        {
            "role_name": "TestRole3",
            "trust_service_principal": ["ec2.amazonaws.com","sns.amazonaws.com"],
            "trust_account_principal": ["748669239283"],
            "customer_managed_policies": ["DeployService2","CodeCommitArchive","KMSPolicy"],
            "aws_managed_policies": ["AWSLambdaFullAccess"]
        }
        
    ]
}
```
 ## License

cdk-iamgenerator is distributed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

See [LICENSE](./LICENSE) for more information.

[AWS CDK]: https://aws.amazon.com/cdk/
[JSII]: https://github.com/aws/jsii
[npm]: https://www.npmjs.com/package/cdk-iam-generator
[PyPI]: https://pypi.org/project/cdk-iamgenerator/





