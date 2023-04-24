# The below image is created out of the Dockerfile.base
# It has the dependencies already installed so that codespace will boot up fast
FROM ghcr.io/evochat/evochat_codespace:latest

# Do the set up required for evochat app
WORKDIR /workspace
COPY . /workspace
RUN yarn && gem install bundler && bundle install
