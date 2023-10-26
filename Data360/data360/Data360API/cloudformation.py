


def generate_s3_cloudformation_template(i,params,cloudformation_template):
    
    s3_resource_name = f"MyS3Bucket{i}"

    cloudformation_template["Resources"][s3_resource_name] = {
        "Type": "AWS::S3::Bucket",
        "Properties": {
            "BucketName": params['bucketName'],
            "AccessControl": "Private",
        }
    }

def generate_lambda_cloudformation_template(i,params,cloudformation_template):
    print(i,params)
    lambda_resource_name = f"MyLambdaFunction{i}"
    
    cloudformation_template["Resources"][lambda_resource_name] = {
        "Type": "AWS::Lambda::Function",
        "Properties": {
            "FunctionName": params['functionName'],
            "Runtime": params['runtime'],
            "Handler": f"{params['handlerName']}.handler",
            "Role": f"arn:aws:iam::{params['accountid']}:role/{params['IAMRole']}",
            "Code": {
                "S3Bucket": params['s3bucketName'],
                "S3Key": params['s3Key']
            }
        }
    }

def generate_glue_cloudformation_template(i, params, cloudformation_template):

    glue_job_resource_name = f"MyGlueETLJob{i}"

    cloudformation_template["Resources"][glue_job_resource_name] = {
        "Type": "AWS::Glue::Job",
        "Properties": {
            "Name": params['jobName'],
            "Role": f"arn:aws:iam::{params['accountid']}:role/{params['iamRoleArn']}",
            "Command": {
                "Name": "glueetl",
                "ScriptLocation": params['scriptLocation'],
            },
            "DefaultArguments": {
                "--job-language": "python"
            },
            "MaxRetries": 0,
            "ExecutionProperty": {
                "MaxConcurrentRuns": 1
            },
            "MaxCapacity": 10,
            "Timeout": 180,
            "GlueVersion": "2.0"
        }
    }