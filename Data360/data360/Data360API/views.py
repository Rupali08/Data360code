from django.shortcuts import render
import requests
from .models import Scripts
from .serializer import ScriptsSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import os
import boto3
import base64
from .cloudformation import *
 
from django.core.files.storage import FileSystemStorage
Base_dir = os.getcwd()
print(Base_dir)

@api_view(['GET', 'POST'])
def scriptsData(request):
    if request.method == 'GET':
        ScriptsData=Scripts.objects.all()
        Scripts_serializer = ScriptsSerializer(ScriptsData, many=True)
        return JsonResponse(Scripts_serializer.data, safe=False)
    elif request.method == 'POST':
        data=request.data
              
        listOfComponent=data['Flow']
        
        s3n=0
        lambdan=0
        gluen=0
        cloudformation_template = {
                        "Parameters": {},
                        "Resources": {},
                }
        for i in listOfComponent:

            if i.keys().__contains__('Start'):
                start = '{\n  "AWSTemplateFormatVersion": "2010-09-09",'
                
            elif i.keys().__contains__('Stop'):
                end='}'
                
            elif i.keys().__contains__('S3'):
                s3n=s3n+1
                params=i['S3']
                generate_s3_cloudformation_template(s3n,params,cloudformation_template)
                
            elif i.keys().__contains__('Lambda'):
                lambdan=lambdan+1
                params=i['Lambda']
                print(params['runtime'])
                generate_lambda_cloudformation_template(lambdan,params,cloudformation_template)

            elif i.keys().__contains__('Glue'):
                gluen=gluen+1
                params=i['Glue']
                generate_glue_cloudformation_template(gluen,params,cloudformation_template)
        
                
        Resultdict = json.dumps(cloudformation_template, indent=2)
        updated_dict= Resultdict[1:-1]
        result=start+updated_dict+end
        print("44444444444444",result)
        
        # print('8888888888888888888888',result)
        #         with open('D:/DAccelerator/Data360/UI/data360/Data360API/Data360Scripts/pipelinescripts.json', 'r') as json_file:
        #             file_data=json_file.read()
        #         string={"{"}
        #         string1={"AWSTemplateFormatVersion": "2010-09-09"}
        #         string.append(string1)
                # file_data.append(data1)
                # client = boto3.client('cloudformation',
                #                 aws_access_key_id=accessKey,
                #                 aws_secret_access_key=secertAccessKey)
                # params=[{
                #         'ParameterKey':'BucketName',
                #         'ParameterValue':bucketname
                #     },
                #     {
                #         'ParameterKey':'BucketRegion',                
                #         'ParameterValue':region
                #     }
                # ]
                # response = client.create_stack(
                #     StackName=stackname,
                #     TemplateBody=file_data,
                #     Parameters=params
                # )
            #     print(bucketname)
            #     Result.append("New S3 Bucket Created Successfully")
            #     print(Result)
            # elif i.keys().__contains__('GLUE'):
            #     params=i['GLUE']
            
            # elif i.keys().__contains__('GLUE'):
            #     params=i['GLUE']
            #     bucketname=params['s3bucketName']
            #     print(bucketname)
            #     foldername=params['folderName']
            #     accessKey=params['accessKey']
            #     secertAccessKey=params['secertAccessKey']
            #     base64_data=params['uploadBase64']
            #     ipfilename=params['uploadFileName']
                # filename=foldername+"/"+ipfilename
                # decoded_data = base64.b64decode(base64_data.split(",")[1]).decode('utf-8')
                # s3 = boto3.resource('s3',
                #                     aws_access_key_id=accessKey,
                #                     aws_secret_access_key=secertAccessKey)
                # s3object = s3.Object(bucketname,filename)

                # s3object.put(
                #     Body=decoded_data
                # )
                # Result.append("File uploaded in the existing S3 Bucket Successfully")
           
        
        
                
        return JsonResponse(result, safe=False)