import React from 'react';

import Layout from '../components/layout';
import { StaticQuery, graphql } from "gatsby"
import PortfolioCard from "../components/portfolio"

// Decode HTML from server
const renderHTML = (rawHTML) => {
    return React.createElement(
        "span",
        { dangerouslySetInnerHTML: { __html: rawHTML } }
    );
}

const IndexPage = ({data}) => {
	const handlePortfolioClick = (work) => {
		//alert("portfolio clicked: " + work.node.title);
	}

	var header_text_colour="#fff";
	var text_colour="#fff";
	var body_colour="#333";	

	// Move this to navbar
	if (data.settings.edges[0].node.home_light_or_dark == "light"){
		var logo = data.settings.edges[0].node.localLogoLight;
	} else {
		var logo = data.settings.edges[0].node.localLogoDark;
	}

	// Check for SVG Logo
	if (data.settings.edges[0].node.svg_logo){
		var svg_logo = data.settings.edges[0].node.svg_logo;
	} else {
		var svg_logo = false;
	}

	return (
		<Layout
			header_text_colour = {data.settings.edges[0].node.home_header_text_colour}
			text_colour = {data.settings.edges[0].node.home_text_colour}
			body_colour = {data.settings.edges[0].node.home_body_colour}
			svg_logo = {svg_logo}
		>
        	<div className="container">
          		<div className="home-header">
              		<div className="columns is-vcentered">
                		<div className="column is-half is-offset-one-quarter">
							<p className="lead">{ renderHTML(data.settings.edges[0].node.intro) }</p>
						</div>
					</div>
				</div>
			</div>
				<div id="#work" className="uk-section">
				  <div className="container uk-container-large">
					<div className="columns is-multiline is-vcentered">
					{ data.works.edges.map((article, i) => {
					  return (
						<PortfolioCard
							work={article}
							count={i}
							full={i % 3 == 0}
							click={handlePortfolioClick}
							key={`article__${article.node.pk}`}
						/>
					  )
					}) }

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
		  svg_logo
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
	  works: allRestApiWork(filter: {active: {eq: true}}, sort: {fields: date, order: DESC}) {	
		edges {
		  node {
			pk
			active
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
					fluid(maxWidth: 1800) {
						...GatsbyImageSharpFluid
					}
				}
			}
		  }
		}
	  }
	}
`


export default IndexPage;
