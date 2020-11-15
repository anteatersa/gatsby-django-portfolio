require("dotenv").config({
  //path: `.env.${process.env.NODE_ENV}`,
  path: `.env`,
})
module.exports = {
	siteMetadata: {
		title: 'Umlungu Portfolio',
		author: 'Adam Cox',
		imageUrl: 'https://i.imgur.com/Vz81GEl.png',
		description: 'A beautiful and flexible portfolio to showcase your work',
		keywords: `Portfolio, Template, Django, Javascript, Gatsby, Bulma Developer, CSS3, HTML5, Seo, Starter`,
		twitter: 'https://twitter.com/###',
		github: `https://github.com/###`,
		medium: 'https://medium.com/@###',
		gatsby: 'https://www.gatsbyjs.org/',
		bulma: 'https://bulma.io/',
		siteUrl: `http://www.umlungu.co.uk`
	},
	plugins: [
        'gatsby-plugin-transition-link',
		'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
        //This plugin exists only once but can consume an array of endpoints
        {
          resolve: 'gatsby-source-rest-api',
          options: {
            endpoints: [
              "http://django:8000/work/",
              "http://django:8000/worksection/",
              "http://django:8000/settings/"
            ],
          },
        },
        {
          resolve: `gatsby-plugin-remote-images`,
          options: {
            nodeType: 'RestApiWork',
            imagePath: 'image',
          },
        },
        {
          resolve: `gatsby-plugin-remote-images`,
          options: {
            nodeType: 'RestApiWork',
            imagePath: 'header_image',
            name: 'localHeaderImage',
          },
        },
        {
          resolve: `gatsby-plugin-remote-images`,
          options: {
            nodeType: 'RestApiWork',
            imagePath: 'hero_image',
            name: 'localHeroImage',
          },
        },
        {
          resolve: `gatsby-plugin-remote-images`,
          options: {
            nodeType: 'RestApiSettings',
            imagePath: 'logo_light',
            name: 'localLogoLight',
          },
        },
        {
          resolve: `gatsby-plugin-remote-images`,
          options: {
            nodeType: 'RestApiSettings',
            imagePath: 'logo_dark',
            name: 'localLogoDark',
          },
        },
        {
            resolve: `gatsby-plugin-trigger-deploy`,
            options: {
                secretKey: 'vaXahW5weiph8vah',
                //addressCallback: 'http://localhost/endpoint/for/notifying',
            },
        },
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'Makefolio',
				short_name: 'Makefolio',
				start_url: '/',
				background_color: '#2980b9',
				theme_color: '',
				display: 'standalone',
				icon: 'src/images/gatsby-icon.png',
				orientation: 'portrait'
			}
		},
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-XXXXXXXX-X',
				// Setting this parameter is optional (requried for some countries such as Germany)
				anonymize: true
			}
		},
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `asap:300,400,400i,700` // you can also specify font weights and styles
                ],
                display: 'swap'
            }
        },
		`gatsby-plugin-sitemap`
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		// 'gatsby-plugin-offline',
	]
};
