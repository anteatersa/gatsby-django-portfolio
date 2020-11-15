#!/bin/sh
set -e

export GATSBY_DIR="/site"
export PATH="$PATH:/usr/local/bin/gatsby"
export THEME="https://github.com/amandeepmittal/gatsby-bulma-quickstart"

# Initialize Gatsby or run NPM install if needed
if [ ! -f "$GATSBY_DIR/package.json" ]
then
  echo "Initializing Gatsby..."
  gatsby new $GATSBY_DIR $THEME

else
  if [ ! -e "$GATSBY_DIR/node_modules/" ]
  then
    echo "Node modules is empty. Running npm install..."
    npm install

  fi

fi

# Decide what to do
if  [ "$1" == "develop" ]
then
  rm -rf $GATSBY_DIR/public
  gatsby clean
  gatsby develop --host 0.0.0.0

elif  [ "$1" == "clean" ]
then
  gatsby clean

elif  [ "$1" == "build" ]
then
  rm -rf $GATSBY_DIR/public
  gatsby build

elif  [ "$1" == "stage" ]
then
  rm -rf $GATSBY_DIR/public
  gatsby clean
  gatsby build
  gatsby serve --port 8000 --host 0.0.0.0

else
  exec $@

fi



