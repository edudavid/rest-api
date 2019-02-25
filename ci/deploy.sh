#!/bin/sh

ENV_NAME=${CI_ENVIRONMENT_SLUG:-development}

ENV_UPPERCASE=$(echo $ENV_NAME | tr '[:lower:]' '[:upper:]')

# # Create elasticbeanstalk config
rm -r .elasticbeanstalk
mkdir .elasticbeanstalk
cp ci/eb-config-${ENV_NAME}.yml .elasticbeanstalk/config.yml

# Create Dockerrun
cat > Dockerrun.aws.json <<- EOF
{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "docker.io/edudavid81/rest-api:latest",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": "3000"
    }
  ]
}
EOF

echo "Starting deploy....."

eb deploy -l "latest" "rest-api-prod"

echo "Finish....."
