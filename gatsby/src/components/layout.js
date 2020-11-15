import React from 'react';

import './style.scss';
import Helmet from './helmet';
import Header from './header';
import Midsection from './midsection';
import Footer from './footer';

const Layout = props => {
  const { header_image, header_text_colour, body_colour, text_colour, children } = props

  // Wrapper style
  var wrapper_style = {
	background: body_colour,
	color: text_colour,
  }

  // Background image style
  if (props.header_image){
	var header_bg_style = {
		backgroundImage: 'url(' + header_image.childImageSharp.fluid.src + ')',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		
	}
	//background: header_image.childImageSharp.fluid.src,
  } else {
	var header_bg_style = {};
  }
  return (
	<div id="siteWrapper" style={{...wrapper_style, ...header_bg_style}}>
		<Helmet colour={props.body_colour} />
		<Header svg_logo={props.svg_logo} text_colour={props.header_text_colour} />
		<Midsection>
			{ children }
		</Midsection>
		<Footer />
	</div>
   )
}

export default Layout;
