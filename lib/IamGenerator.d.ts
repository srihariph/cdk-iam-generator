import { Construct, StackProps } from '@aws-cdk/core';
export interface IamGeneratorProps extends StackProps {
    readonly configPath: string;
    readonly policyPath: string;
}
export declare class IamGenerator extends Construct {
    constructor(scope: Construct, id: string, props: IamGeneratorProps);
}
