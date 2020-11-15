import React from 'react';
import { FaGithub } from 'react-icons/fa';

import './style.scss';

import gatsbyLogo from '../images/gatsby-icon.png';
import bulmaLogo from '../images/bulma-logo.png';
import Navbar from './navbar';
import TransitionLink  from "gatsby-plugin-transition-link";

//const Header = ({ siteTitle }) => (
const Header = props => (
	<section className="hero gradientBg-DISABLE is-fullheight-with-navbar-DISABLE">
		<Navbar svg_logo={props.svg_logo} text_colour={props.text_colour} />
                    {/*
		<div className="hero-body">
			<div className="container center">
				<article className="media">
					<figure className="is-left">
						<span className="icon is-large">
							<img src={bulmaLogo} alt="bulma-logo" />
						</span>
					</figure>
					<div className="media-content">
						<div className="content">
							<h1 className="is-uppercase is-size-1 has-text-white">
                                A short bit about myself
							</h1>
							<p className="subtitle has-text-white is-size-3">
								A Bulma CSS + GatsbyJS Starter Kit{' '}
                                <TransitionLink to="page2" enter={{ length: 0.5 }} exit={{ length: 0.5 }}>
  		                            Go to page 2 (transition link)
	                            </TransitionLink>
								<a
									className="button is-info"
									href="https://github.com/amandeepmittal/gatsby-bulma-quickstart"
								>
									<span className="icon">
										<FaGithub size="fa-1x" />
									</span>
									<span>Download</span>
								</a>
							</p>
						</div>
					</div>
				</article>
			</div>
		</div>
                    */}
	</section>
);

export default Header;
