import React from 'react';

import Layout from '../components/layout';
import { StaticQuery, graphql, Link } from "gatsby"
import PortfolioCard from "../components/portfolio"

const AboutPage = ({data}) => {
	const handlePortfolioClick = (work) => {
		//alert("portfolio clicked: " + work.node.title);
	}

	var header_text_colour="#fcf5f4";
	var text_colour="#fcf5f4";
	var body_colour="#f73919";	

	// Move this to navbar
	if (false){
		var logo = data.settings.edges[0].node.localLogoLight;
	} else {
		var logo = data.settings.edges[0].node.localLogoDark;
	}

	return (
		<Layout
			header_text_colour={header_text_colour}
			text_colour={text_colour}
			body_colour={body_colour}
		>
        	<div className="container">
          		<div className="home-header">
              		<div className="columns">
                		<div className="column is-three-fifths is-offset-one-fifth">
							<p className="lead">Please contact me on <a href="mailto:contact@mywebsite.com">contact@mywebsite.com</a> or call me on 012 3456 7890</p>
						</div>
					</div>
				</div>
			</div>

            <div className="container">
                <div className="columns">
                  <div className="column">
                    <Link to="/" className="work-footer-link">Work</Link>
                  </div>
                  <div className="column">
                    <Link to="/about" className="work-footer-link">About</Link>
                  </div>
                </div>
            </div>
		</Layout>
	)
}

export const query = graphql`
  query {
	settings: allRestApiSettings {
	  edges {
		node {
		  title
		  intro
		  home_body_colour
		  home_body_shade
		  home_header_text_colour
		  home_light_or_dark
		  home_text_colour
		  localLogoDark {
			  childImageSharp {
				  fluid(maxWidth: 1360) {
					  ...GatsbyImageSharpFluid
				  }
			  }
		  }
		  localLogoLight {
			  childImageSharp {
				  fluid(maxWidth: 1360) {
					  ...GatsbyImageSharpFluid
				  }
			  }
		  }
		}
		}
	  }
	  works: allRestApiWork {
		edges {
		  node {
			pk
			title
			slug
			blurb
			date
			body_colour
			text_colour
			header_text_colour
			image
			localImage {
				childImageSharp {
					fluid(maxWidth: 1360) {
						...GatsbyImageSharpFluid
					}
				}
			}
		  }
		}
	  }
	}
`


export default AboutPage;
