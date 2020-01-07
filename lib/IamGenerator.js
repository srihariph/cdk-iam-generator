"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@aws-cdk/core");
const fs_1 = require("fs");
const aws_iam_1 = require("@aws-cdk/aws-iam");
class IamGenerator extends core_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        let configjson = JSON.parse(fs_1.readFileSync(props.configPath).toString());
        let policies = configjson.policies;
        let statement_actions;
        let statement_resources;
        let statement_conditions;
        if (policies != null) {
            for (var i = 0; i < policies.length; i++) {
                let policy_name = policies[i].policy_name;
                let policy_file = policies[i].policy_file;
                let policyJson = JSON.parse(fs_1.readFileSync(props.policyPath + '/' + policy_file).toString());
                let managedPolicy = new aws_iam_1.ManagedPolicy(this, policy_name, {
                    managedPolicyName: policy_name
                });
                let iamPolicyStatement;
                if (policyJson.Statement != null) {
                    for (var j = 0; j < policyJson.Statement.length; j++) {
                        if (typeof policyJson.Statement[j].Action === "string") {
                            statement_actions = policyJson.Statement[j].Action;
                            statement_resources = policyJson.Statement[j].Resource;
                            statement_conditions = policyJson.Statement[j].Condition;
                            iamPolicyStatement = new aws_iam_1.PolicyStatement({
                                resources: [statement_resources],
                                actions: [statement_actions],
                                conditions: statement_conditions
                            });
                        }
                        else {
                            statement_actions = policyJson.Statement[j].Action;
                            statement_resources = policyJson.Statement[j].Resource;
                            statement_conditions = policyJson.Statement[j].Condition;
                            iamPolicyStatement = new aws_iam_1.PolicyStatement({
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
exports.IamGenerator = IamGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWFtR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSWFtR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXNEO0FBQ3RELDJCQUFtQztBQUduQyw4Q0FBa0U7QUFPbEUsTUFBYSxZQUFhLFNBQVEsZ0JBQVM7SUFFdkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF3QjtRQUNoRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLElBQUksVUFBVSxHQUF3QixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFZLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFNUYsSUFBSSxRQUFRLEdBQXdDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDeEUsSUFBSSxpQkFBb0MsQ0FBQztRQUN6QyxJQUFJLG1CQUEyQixDQUFDO1FBQ2hDLElBQUksb0JBQStCLENBQUM7UUFFcEMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUV4QyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO2dCQUMxQyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO2dCQUMxQyxJQUFJLFVBQVUsR0FBc0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzlHLElBQUksYUFBYSxHQUFHLElBQUksdUJBQWEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO29CQUN2RCxpQkFBaUIsRUFBRSxXQUFXO2lCQUMvQixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxrQkFBa0IsQ0FBQztnQkFDdkIsSUFBSSxVQUFVLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtvQkFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNwRCxJQUFJLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFOzRCQUN0RCxpQkFBaUIsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQWdCLENBQUM7NEJBQzdELG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBa0IsQ0FBQzs0QkFDakUsb0JBQW9CLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFzQixDQUFDOzRCQUV0RSxrQkFBa0IsR0FBRyxJQUFJLHlCQUFlLENBQUM7Z0NBQ3ZDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dDQUNoQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDNUIsVUFBVSxFQUFFLG9CQUFvQjs2QkFDakMsQ0FBQyxDQUFDO3lCQUNKOzZCQUFNOzRCQUNMLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBa0IsQ0FBQzs0QkFDL0QsbUJBQW1CLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFrQixDQUFDOzRCQUNqRSxvQkFBb0IsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQXNCLENBQUM7NEJBRXRFLGtCQUFrQixHQUFHLElBQUkseUJBQWUsQ0FBQztnQ0FDdkMsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7Z0NBQ2hDLE9BQU8sRUFBRSxpQkFBaUI7Z0NBQzFCLFVBQVUsRUFBRSxvQkFBb0I7NkJBQ2pDLENBQUMsQ0FBQzt5QkFDSjt3QkFDRCxhQUFhLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7cUJBRWpEO2lCQUNGO2FBQ0Y7U0FDRjtJQUdILENBQUM7Q0FDSjtBQXJERCxvQ0FxREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QsIFN0YWNrUHJvcHMgfSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7ICByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XG5cbmltcG9ydCB7IElhbVBvbGljeVJvbGVDb25maWcsIElhbVBvbGljeURvY3VtZW50LCBQb2xpY2llc0VudGl0eSwgQ29uZGl0aW9uIH0gZnJvbSAnLi9JUG9saWN5Um9sZUNvbmZpZyc7XG5pbXBvcnQgeyBNYW5hZ2VkUG9saWN5LCBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tICdAYXdzLWNkay9hd3MtaWFtJztcblxuZXhwb3J0IGludGVyZmFjZSBJYW1HZW5lcmF0b3JQcm9wcyBleHRlbmRzIFN0YWNrUHJvcHN7XG4gICAgcmVhZG9ubHkgY29uZmlnUGF0aDogc3RyaW5nLFxuICAgIHJlYWRvbmx5IHBvbGljeVBhdGg6IHN0cmluZztcbiB9XG5cbmV4cG9ydCBjbGFzcyBJYW1HZW5lcmF0b3IgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IElhbUdlbmVyYXRvclByb3BzKSB7XG4gICAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgICAgbGV0IGNvbmZpZ2pzb246IElhbVBvbGljeVJvbGVDb25maWcgPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhwcm9wcy5jb25maWdQYXRoKS50b1N0cmluZygpKTtcblxuICAgICAgbGV0IHBvbGljaWVzOiBQb2xpY2llc0VudGl0eVtdIHwgbnVsbCB8IHVuZGVmaW5lZCA9IGNvbmZpZ2pzb24ucG9saWNpZXM7XG4gICAgICBsZXQgc3RhdGVtZW50X2FjdGlvbnM6IHN0cmluZ1tdIHwgc3RyaW5nO1xuICAgICAgbGV0IHN0YXRlbWVudF9yZXNvdXJjZXM6IHN0cmluZztcbiAgICAgIGxldCBzdGF0ZW1lbnRfY29uZGl0aW9uczogQ29uZGl0aW9uO1xuICBcbiAgICAgIGlmIChwb2xpY2llcyAhPSBudWxsKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9saWNpZXMubGVuZ3RoOyBpKyspIHtcbiAgXG4gICAgICAgICAgbGV0IHBvbGljeV9uYW1lID0gcG9saWNpZXNbaV0ucG9saWN5X25hbWU7XG4gICAgICAgICAgbGV0IHBvbGljeV9maWxlID0gcG9saWNpZXNbaV0ucG9saWN5X2ZpbGU7XG4gICAgICAgICAgbGV0IHBvbGljeUpzb246IElhbVBvbGljeURvY3VtZW50ID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMocHJvcHMucG9saWN5UGF0aCArICcvJyArIHBvbGljeV9maWxlKS50b1N0cmluZygpKTtcbiAgICAgICAgICBsZXQgbWFuYWdlZFBvbGljeSA9IG5ldyBNYW5hZ2VkUG9saWN5KHRoaXMsIHBvbGljeV9uYW1lLCB7XG4gICAgICAgICAgICBtYW5hZ2VkUG9saWN5TmFtZTogcG9saWN5X25hbWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgaWFtUG9saWN5U3RhdGVtZW50O1xuICAgICAgICAgIGlmIChwb2xpY3lKc29uLlN0YXRlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBvbGljeUpzb24uU3RhdGVtZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcG9saWN5SnNvbi5TdGF0ZW1lbnRbal0uQWN0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50X2FjdGlvbnMgPSBwb2xpY3lKc29uLlN0YXRlbWVudFtqXS5BY3Rpb24gYXMgc3RyaW5nO1xuICAgICAgICAgICAgICAgIHN0YXRlbWVudF9yZXNvdXJjZXMgPSBwb2xpY3lKc29uLlN0YXRlbWVudFtqXS5SZXNvdXJjZSBhcyBzdHJpbmc7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50X2NvbmRpdGlvbnMgPSBwb2xpY3lKc29uLlN0YXRlbWVudFtqXS5Db25kaXRpb24gYXMgQ29uZGl0aW9uO1xuICBcbiAgICAgICAgICAgICAgICBpYW1Qb2xpY3lTdGF0ZW1lbnQgPSBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgICAgICAgICAgIHJlc291cmNlczogW3N0YXRlbWVudF9yZXNvdXJjZXNdLFxuICAgICAgICAgICAgICAgICAgYWN0aW9uczogW3N0YXRlbWVudF9hY3Rpb25zXSxcbiAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbnM6IHN0YXRlbWVudF9jb25kaXRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50X2FjdGlvbnMgPSBwb2xpY3lKc29uLlN0YXRlbWVudFtqXS5BY3Rpb24gYXMgc3RyaW5nW107XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50X3Jlc291cmNlcyA9IHBvbGljeUpzb24uU3RhdGVtZW50W2pdLlJlc291cmNlIGFzIHN0cmluZztcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnRfY29uZGl0aW9ucyA9IHBvbGljeUpzb24uU3RhdGVtZW50W2pdLkNvbmRpdGlvbiBhcyBDb25kaXRpb247XG4gIFxuICAgICAgICAgICAgICAgIGlhbVBvbGljeVN0YXRlbWVudCA9IG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBbc3RhdGVtZW50X3Jlc291cmNlc10sXG4gICAgICAgICAgICAgICAgICBhY3Rpb25zOiBzdGF0ZW1lbnRfYWN0aW9ucyxcbiAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbnM6IHN0YXRlbWVudF9jb25kaXRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbWFuYWdlZFBvbGljeS5hZGRTdGF0ZW1lbnRzKGlhbVBvbGljeVN0YXRlbWVudCk7XG4gIFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICB9XG59ICBcbiJdfQ==