import React from 'react';

import Layout from '../components/layout';
import { StaticQuery, graphql, Link } from "gatsby"
import PortfolioCard from "../components/portfolio"

const AboutPage = ({data}) => {
	const handlePortfolioClick = (work) => {
		//alert("portfolio clicked: " + work.node.title);
	}

	var header_text_colour="#b6c6e7";
	var text_colour="#b6c6e7";
	var body_colour="#0a1626";	

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
							{/*<p className="lead">{ data.settings.edges[0].node.intro }</p>*/}
                            <p className="lead center">This site is built with Gatsby and React JS, powered by a Django Rest API</p>
                        </div>
                    </div>
              		<div className="columns">
                		<div className="column is-full">
                            <div class="content">

                            <p style={{textAlign: "center"}}>Download the source here and create your own portfolio</p>


                            <h2 style={{color: text_colour, textAlign: "center"}}>Features</h2>


                      		<div className="columns">

                      		<div className="column is-one-third">
                              <p><ul>
                                <li>Responsive Design for desktop and mobile</li>
                                <li>Statically generated builds that can be hosted almost anywhere</li>
                              </ul></p>
                            </div>

                      		<div className="column is-one-third">
                              <p><ul>
                                <li>Edit your projects in the Django api</li>
                                <li>Add infinite sections to each project</li>
                              </ul></p>
                            </div>

                      		<div className="column is-one-third">
                              <p><ul>
                                <li>Customisable colours per page</li>
                                <li>Customisable headers per page</li>
                              </ul></p>
                            </div>

                            </div>

						    </div>
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
                <Link to="/contact" className="work-footer-link">Contact</Link>
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
