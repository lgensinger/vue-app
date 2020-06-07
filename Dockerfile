# use an official runtime as parent image
FROM node

# declare for build
ARG NPM_REGISTRY_URL

# set configs
RUN npm config set package-lock false && \
    npm config set registry ${NPM_REGISTRY_URL}
    
##########################################################  VUE  ##########################################################

# install system requirements
RUN npm install -g @vue/cli
RUN npm install -g @vue/cli-service
RUN npm install -g @vue/cli-service-global

# without these below (which are redundant in the package.json)
# the global cli-service will not work
RUN npm install -g @vue/cli-plugin-eslint
RUN npm install -g vue-template-compiler

##########################################################  PROJECT FILES  ##########################################################

# copy all contents into container
COPY ./.eslintrc.js /project/.eslintrc.js
COPY ./package.json /project/package.json
COPY ./vue/src /project/src
COPY ./public /project/public
COPY ./vue.config.js /project/vue.config.js

# update directory context
WORKDIR /project

# install dependencies
RUN npm install

##########################################################  RUNTIME CONFIGS  ##########################################################

# ui
EXPOSE 8080

# set starting context
ENTRYPOINT ["npm"]

# run app
CMD ["start"]