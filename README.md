# Vue.js Web Application

Vue.js web application scaffold.

## System Requirements

1. docker
1. git

## Environmental Variables

The following values need to be configured in the environment **prior** to running the commands below.

1. NODE_ENV
1. NPM_REGISTRY_URL

---

## Quickstart

### VUE: Actively Develop the Application

```bash
# clone project
git clone https://github.com/lgensinger/vue-app.git

# update directory context
cd vue-app

# build image
docker build \
  --build-arg NPM_REGISTRY_URL=${NPM_REGISTRY_URL} \
  -t myimage \
  .

# run container
docker run \
  --rm \
  --name mycontainer \
  --env-file env_file \
  -p 8080:8080 \
  -v $(pwd)/vue:/project/src \
  myimage
```

### BOOTSTRAP: Actively Develop the Application

```bash
# clone project
git clone https://github.com/lgensinger/vue-app.git

# update directory context
cd vue-app

# build image
docker build \
  --build-arg NPM_REGISTRY_URL=${NPM_REGISTRY_URL} \
  -f Dockerfile.bootstrap \
  -t myimage \
  .

# run container
docker run \
  --rm \
  --name mycontainer \
  --env-file env_file \
  -p 8080:8080 \
  -v $(pwd)/bootstrap:/project/src \
  myimage
```

### MATERIAL: Actively Develop the Application

```bash
# clone project
git clone https://github.com/lgensinger/vue-app.git

# update directory context
cd vue-app

# build image
docker build \
  --build-arg NPM_REGISTRY_URL=${NPM_REGISTRY_URL} \
  -f Dockerfile.material \
  -t myimage \
  .

# run container
docker run \
  --rm \
  --name mycontainer \
  --env-file env_file \
  -p 8080:8080 \
  -v $(pwd)/material:/project/src \
  myimage
```