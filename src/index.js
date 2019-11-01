const cp = require('child_process')
const fs = require('fs')
const core = require('@actions/core')

try {
  const image = core.getInput('image', { required: true })
  const registry = core.getInput('registry', { required: true })
  const tag = core.getInput('tag')
  const dockerfile = core.getInput('dockerfile')

  const fullImage = `${registry}/${image}:${tag}`

  const region = registry.substring(registry.indexOf('ecr.') + 4, registry.indexOf('.amazonaws'))

  if (!fs.existsSync(dockerfile)) {
    core.setFailed(`Cannot find DockerFile (${dockerfile})`)
  }

  core.info(`Login to AWS region ${region}`)
  cp.execSync(`$(aws ecr get-login --region ${region} --no-include-email)`)

  core.info(`Build Docker Image: ${fullImage}`)
  cp.execSync(`docker build -f ${dockerfile} -t ${fullImage} .`)

  core.info(`Push Docker image ${fullImage}`)
  cp.execSync(`docker push ${fullImage}`)
} catch (error) {
  core.setFailed(error.message)
}
