provider "aws" {
  shared_credentials_file = "/Users/eduardo.david/.aws/credentials"
  profile                 = "terraform"
  region                  = "us-east-1"
}

resource "aws_elastic_beanstalk_application" "example" {
  name        = "rest-api"
  description = "leads rest api"
}

resource "aws_elastic_beanstalk_environment" "tfenvtest" {
  name                = "rest-api-prod"
  application         = "${aws_elastic_beanstalk_application.example.name}"
  solution_stack_name = "64bit Amazon Linux 2018.03 v2.12.9 running Docker 18.06.1-ce"
}