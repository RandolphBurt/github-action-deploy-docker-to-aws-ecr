# Github Action to build and then deploy a docker image to AWS ECR

* Put the AWS credentials (AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY) into your github repo secrets.
* Add the following to your workflow...

```yaml
uses: RandolphBurt/github-action-deploy-docker-to-aws-ecr@v1.0
with:
  image: image-name
  tag: image-tag (Defaults to 'latest')
  registry: [aws-account-number].dkr.ecr.[region].amazonaws.com
  dockerfile: (Defaults to Dockerfile in the root)
env:
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  ```

  