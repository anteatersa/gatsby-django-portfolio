import React, { Component } from "react";
import Img from "gatsby-image"
import './style.scss';
import { StaticQuery, graphql } from 'gatsby';
import { Link } from "gatsby"
import TransitionLink  from "gatsby-plugin-transition-link";
import {
	FaTimes,
    FaGithub,
} from 'react-icons/fa';

class Navbar extends Component {

	constructor(props) {
	  super(props);
	  // Don't call this.setState() here!
	  this.state = { menuOpen: false };
	}

	// Decode HTML from server
	renderHTML = (rawHTML) => {
		return React.createElement(
			"span",
			{ dangerouslySetInnerHTML: { __html: rawHTML } }
		);
	}

	lightOrDark = (color) => {

		// Variables for red, green, blue values
		var r, g, b, hsp;
		
		// Check the format of the color, HEX or RGB?
		if (color.match(/^rgb/)) {

			// If RGB --> store the red, green, blue values in separate variables
			color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
			
			r = color[1];
			g = color[2];
			b = color[3];
		} 
		else {
			
			// If hex --> Convert it to RGB: http://gist.github.com/983661
			color = +("0x" + color.slice(1).replace( 
			color.length < 5 && /./g, '$&$&'));

			r = color >> 16;
			g = color >> 8 & 255;
			b = color & 255;
		}
		
		// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
		hsp = Math.sqrt(
		0.299 * (r * r) +
		0.587 * (g * g) +
		0.114 * (b * b)
		);

		// Using the HSP value, determine whether the color is light or dark
		if (hsp>127.5) {

			return 'light';
		} 
		else {

			return 'dark';
		}
	}

	toggleMenu = () => {
		this.setState({menuOpen: !this.state.menuOpen});
	}

  render() {

	if (this.state.menuOpen){
		var menu = <div id="mobileNav" className="menuFade">
			<div className="transitionFade"><Link to="/#work" onClick={this.toggleMenu}>Work</Link></div>
			<div className="transitionFade"><Link to="/about" onClick={this.toggleMenu}>About</Link></div>
			<div className="transitionFade"><Link to="/contact" onClick={this.toggleMenu}>Contact</Link></div>
			<div className="transitionFade"><a href="https://github.com/anteatersa/gatsby-django-portfolio" onClick={this.toggleMenu}>
                <FaGithub size="" /> Github
            </a></div>
		</div>
	} else {
		var menu = null
	}

	return (
		<StaticQuery
		  query={graphql`
			query NavTitleQuery{
			  allRestApiSettings {
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
								...GatsbyImageSharpFluid_tracedSVG
								...GatsbyImageSharpFluidLimitPresentationSize
							}
						}
					}
					localLogoLight {
						childImageSharp {
							fluid(maxWidth: 1360) {
								...GatsbyImageSharpFluid_tracedSVG
								...GatsbyImageSharpFluidLimitPresentationSize
							}
						}
					}
				  }
				}
			  }
			}
		  `}
		  render={data => (
			<div className="hero-head">
			{menu}
				<nav className="navbar">
					<div className="container">
						<div className="navbar-brand">
							<span className="navbar-item">
								<TransitionLink to="/" enter={{ length: 0.5 }} exit={{ length: 0.5 }}>
								<h1 style={{ color: this.props.text_colour }}>
										{/*<span>{ data.allRestApiSettings.edges[0].node.title } </span> */}
										{(() => {
										if (data.allRestApiSettings.edges[0].node.svg_logo) {
											if (this.state.menuOpen){
												return (
													<div id="svg_logo" className={this.state.menuOpen ? "logo_menu_open" : ""}>{
														this.renderHTML(data.allRestApiSettings.edges[0].node.svg_logo.replace(/#333333/g,"#fff"))
														}</div>
												)

											} else {
												return (
													<div id="svg_logo" className={this.state.menuOpen ? "logo_menu_open" : ""}>{
														this.renderHTML(data.allRestApiSettings.edges[0].node.svg_logo.replace(/#333333/g,this.props.text_colour))
														}</div>
												)
											}
										} else if (!data.allRestApiSettings.edges[0].node.localLogoDark && !data.allRestApiSettings.edges[0].node.localLogoLight) {
											return (
												<span>{data.allRestApiSettings.edges[0].node.title}</span>
											)
										} else if ( this.lightOrDark(this.props.text_colour) == "dark"){
											return (
										<Img
											id="logo"
											//loading="eager"
											alt={data.allRestApiSettings.edges[0].node.title}
											fluid={data.allRestApiSettings.edges[0].node.localLogoDark.childImageSharp.fluid}
											imgStyle={{
												objectFit: 'contain',
												objectPosition: 'left center',
											}}
										/>
											)
										} else {
											return (
										<Img
											id="logo"
											//loading="eager"
											alt={data.allRestApiSettings.edges[0].node.title}
											fluid={data.allRestApiSettings.edges[0].node.localLogoLight.childImageSharp.fluid}
											imgStyle={{
												objectFit: 'contain',
												objectPosition: 'left center',
											}}
										/>
											)
										}
										})()}
								</h1>
								</TransitionLink>
							</span>

							<button id="mobile-nav-button" className={this.state.menuOpen ? "hamburger hamburger--spring is-active" : "hamburger hamburger--spring"} type="button" onClick={this.toggleMenu}>
							  <span className="hamburger-box">
								<span className="hamburger-inner" style={{backgroundColor: this.props.text_colour}}></span>
							  </span>
							</button>

							{/*
							<a role="button" onClick={this.toggleMenu} className="navbar-burger" aria-label="menu" aria-expanded="false">
							  <span aria-hidden="true"></span>
							  <span aria-hidden="true"></span>
							  <span aria-hidden="true"></span>
							</a>
							*/}
						</div>
						<div id="navbarMenuHeroA" className="navbar-menu">
							<div className="navbar-end">
								<span className="navbar-item">
									<TransitionLink to="/#work" enter={{ length: 0.5 }} exit={{ length: 0.5 }}>
										<span style={{ color: this.props.text_colour }}>Work</span>
									</TransitionLink>
								</span>
								<span className="navbar-item">
									<TransitionLink to="/about" enter={{ length: 0.5 }} exit={{ length: 0.5 }}>
										<span style={{ color: this.props.text_colour }}>About</span>
									</TransitionLink>
								</span>
								<span className="navbar-item">
									<TransitionLink to="/contact" enter={{ length: 0.5 }} exit={{ length: 0.5 }}>
										<span style={{ color: this.props.text_colour }}>Contact</span>
									</TransitionLink>
								</span>
								<span className="navbar-item">
									<a href="https://github.com/anteatersa/gatsby-django-portfolio">
										<span style={{ color: this.props.text_colour }}>
											<FaGithub size="" />
                                        </span>
									</a>
								</span>
							</div>
						</div>
					</div>
				</nav>
			</div>
		)} />
	)
  }
}

export default Navbar;
