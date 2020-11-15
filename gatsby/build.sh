#!/bin/bash
#echo "Building Gatsby"
#sudo docker exec `sudo docker ps | grep "portfolio-gatsby-bulma_gatsby_1" | cut -d ' ' -f 1` gatsby build
echo "Copy generated code to /var/www/demo-portfolio"
sudo rm -rf /var/www/demo-portfolio/*
sudo cp -r /home/adam/projects/portfolio-github/gatsby/public/* /var/www/demo-portfolio/
sudo chown -R www-data:www-data /var/www/demo-portfolio
