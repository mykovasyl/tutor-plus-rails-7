#!/usr/bin/env bash
# exit on error
set -o errexit

# Add build commands for front end
rm -rf public
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

bundle install
bundle exec rake db:reset db:migrate db:seed DISABLE_DATABASE_ENVIRONMENT_CHECK=1