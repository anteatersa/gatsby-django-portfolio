#!/bin/sh
set -e

export PROJECT_DIR="/code"

# Initialize Django or run pip install if needed
if [ ! -f "$PROJECT_DIR/packages_installed" ]
then
  echo "Initializing Django..."
  cd $PROJECT_DIR
  pip install -r requirements.txt
  touch $PROJECT_DIR/packages_installed
fi

echo "Running Django..."
python $PROJECT_DIR/portfolio/manage.py runserver 0.0.0.0:8000
