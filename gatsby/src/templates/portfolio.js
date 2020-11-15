import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout' 
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import {
    FaSass,
    FaHtml5,
    FaReact,
    FaMobileAlt,
    FaRocket,
    FaLink,
    FaExternalLinkAlt
} from 'react-icons/fa';

// Decode HTML from server
const renderHTML = (rawHTML) => {
    return React.createElement(
        "span",
        { dangerouslySetInnerHTML: { __html: rawHTML } }
    );
}

// Render Images in columns
const renderImagesSection = (images => {
    return (
        images.map(image => {
            if (image.localImage.ext.toLowerCase() == ".gif"){
                return (
                  <div key={image.pk} className="columns">
                      <div className="column column-image">
                          <img src={image.localImage.publicURL} />
                      </div>
                  </div>
                )
            } else {
              return (
                  <div key={image.pk} className="columns">
                      <div className="column column-image">
                          <Img loading="lazy" fluid={image.localImage.childImageSharp.fluid} />
                      </div>
                  </div>
              )
            }
        })
    )
})

const renderImageSections = (section => {
    if (section.worksectionimage_set && section.worksectionimage_set.length > 0) {
      return renderImagesSection(section.worksectionimage_set)
    }
})

// Render images as plain img tags
const renderPlainImages = (images => {
    return (
        images.map(image => {
            return (
                <img style={{height: '80vh', width: 'auto'}} key={image.pk} src={image.localImage.childImageSharp.fluid.src} />
            )
        })
    )
})

const renderImagesPlain = (section => {
    if (section.worksectionimage_set && section.worksectionimage_set.length > 0) {
      return renderPlainImages(section.worksectionimage_set)
    }
})

///////////////////
// Text Section //
/////////////////
const render_section_text = (section => {
    
    if (section.align == 'l'){
        return (
                <div className="columns">
                    <div className="column">
                          <div className="content has-text-left">
                            {renderHTML(section.text)}
                          </div>
                    </div>
                </div>
        )
    } else if (section.align == 'r'){
        return (
                <div className="columns">
                    <div className="column">
                          <div className="content has-text-right">
                            {renderHTML(section.text)}
                          </div>
                    </div>
                </div>
        )
    } else if (section.align == 'c'){
        return (
                <div className="columns">
                    <div className="column">
                          <div className="content has-text-centered">
                            {renderHTML(section.text)}
                          </div>
                    </div>
                </div>
        )
    }
})

const render_section_text_image = (section => {
    if (section.align_vertical = "m"){
        var valign = "columns is-vcentered";
    } else {
        var valign = "columns";
    }
    if (section.align == 'l'){
      return (
              <div className={valign}>
                  <div className="column">
                      <div className="content">
                        {renderHTML(section.text)}
                      </div>
                  </div>
                  <div className="column">
                      {renderImageSections(section)}
                  </div>
              </div>
      )
    } else {
      return (
              <div className={valign}>
                  <div className="column">
                      {renderImageSections(section)}
                  </div>
                  <div className="column">
                      <div className="content">
                        {renderHTML(section.text)}
                      </div>
                  </div>
              </div>
      )
    }
})

const render_section_image = (section => {
      return (
        <React.Fragment>
            {renderImageSections(section)}
        </React.Fragment>
      )
})

const render_section_image_gallery = (section => {
      return (
        <div>
        <Carousel
          offset={50}
          plugins={[
            'centered',
            'infinite',
            'fastSwipe',
            //'arrows',
            {
              resolve: slidesToShowPlugin,
              options: {
               numberOfSlides: 3
              }
            },
          ]}
          breakpoints={{
              767: {
                plugins: [
                 {
                   resolve: slidesToShowPlugin,
                   options: {
                    numberOfSlides: 1
                   }
                 },
               ]
              },
              1024: {
                plugins: [
                 {
                   resolve: slidesToShowPlugin,
                   options: {
                    numberOfSlides: 2
                   }
                 },
               ]
              }
            }}
        >
            {renderImagesPlain(section)}
        </Carousel>
        </div>
      )
})

const render_section_2_1_1 = (section => {
    if (section.align == 'l'){
      return (
              <div className="columns is-8">
                  <div className="column is-two-thirds">
                        <Img loading="lazy" fluid={section.worksectionimage_set[0].localImage.childImageSharp.fluid} />
                  </div>
                  <div className="column is-one-third">
                      <div className="columns is-8">
                        <div className="column">
                          <Img loading="lazy" fluid={section.worksectionimage_set[1].localImage.childImageSharp.fluid} />
                        </div>
                      </div>
                      <div className="columns is-8">
                        <div className="column">
                            <Img loading="lazy" fluid={section.worksectionimage_set[2].localImage.childImageSharp.fluid} />
                        </div>
                      </div>
                  </div>
              </div>
      )
    } else {
      return (
              <div className="columns is-8">
                  <div className="column is-one-third">
                      <div className="columns is-8">
                        <div className="column">
                          <Img loading="lazy" fluid={section.worksectionimage_set[1].localImage.childImageSharp.fluid} />
                        </div>
                      </div>
                      <div className="columns is-8">
                        <div className="column">
                            <Img loading="lazy" fluid={section.worksectionimage_set[2].localImage.childImageSharp.fluid} />
                        </div>
                      </div>
                  </div>
                  <div className="column is-two-thirds">
                        <Img loading="lazy" fluid={section.worksectionimage_set[0].localImage.childImageSharp.fluid} />
                  </div>
              </div>
      )
    }
})

//////////////
// Helpers //
////////////
const render_debug = (section => {
    return (
        <React.Fragment>
          <p>layout: {section.layout}</p>
          <p>align: {section.align}</p>
          <p>wide: {section.wide ? <span>True</span> : <span>False</span>}</p>
          <p>full: {section.full ? <span>True</span> : <span>False</span>}</p>
          <p>sorting: {section.sorting}</p>
        </React.Fragment>
    )
})

const render_section = (section => {
    if (section.full){
        return (
            <div className="full_section">
            { render_section_contents(section) }
            </div>
        )
    } else if (section.wide){
        return (
            <div className="wide_section container">
              <div className="columns">
                <div className="column"></div>
                <div className="column is-four-fifths">
                    { render_section_contents(section) }
                </div>
                <div className="column"></div>
              </div>
            </div>
        )
    } else {
        return (
            <div className="normal_section container">
              <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                    { render_section_contents(section) }
                </div>
              </div>
            </div>
        )
    }
})

const render_section_contents = (section => {
    return (
        <React.Fragment>
            { section.layout == "text" ? render_section_text(section) : null}
            { section.layout == "text_image" ? render_section_text_image(section) : null}
            { section.layout == "image" ? render_section_image(section) : null}
            { section.layout == "image_2_1_1" ? render_section_2_1_1(section) : null}
            { section.layout == "image_gallery" ? render_section_image_gallery(section) : null}
            {/**renderImageSections(section)**/}
        </React.Fragment>
    )
})

const PortfolioTemplate = ({ data, pageContext} ) => {
    const doc = data.allRestApiWork.edges[0].node
    //const debug = true // Show or hise debug info
    const debug = false // Show or hise debug info
    console.log(doc);

    // Link
    if (doc.link){
      var link = <p className="link">
            <a href={doc.link}>
                Visit site <FaExternalLinkAlt style={{verticalAlign: "middle", fontSize: "1rem"}} />
            </a>
        </p>
    } else {
      var link = null;
    }

    if (doc.localHeroImage){
        if (doc.hero_align == "c"){
            var header = <div className="container">
            <div className="work-header">
                <Img
                    style={{ maxHeight: "50vh", width: "auto" }}
                    fluid={doc.localHeroImage.childImageSharp.fluid}
                    loading="eager"
                    imgStyle={{
                        objectFit: 'contain',
                        objectPosition: 'center center',
                    }}
                />
                <h1>{doc.title}</h1>
                {link}
                  <div className="columns">
                    <div className="column is-half is-offset-one-quarter">
                        <p className="lead">{renderHTML(doc.blurb)}</p>
                    </div>
                  </div>
              </div>
            </div>
        } else if (doc.hero_align == "l"){
            var header = <div className="container">
              <div className="work-header work-header-hero-left">
                <div className="columns is-vcentered">
                  <div className="column is-half hero-image">
                    <Img
                      style={{ maxHeight: "75vh", width: "auto" }}
                      fluid={doc.localHeroImage.childImageSharp.fluid}
                      loading="eager"
                      imgStyle={{
                          objectFit: 'contain',
                          objectPosition: 'center center',
                      }}
                    />
                  </div>
                  <div className="column is-one-third-tablet hero-text">
                    <h1>{doc.title}</h1>
                    {link}
                    <p className="lead">{renderHTML(doc.blurb)}</p>
                  </div>
                </div>
              </div>
            </div>
        } else if (doc.hero_align == "r"){
            var header = <div className="container">
              <div className="work-header work-header-hero-right">
                <div className="columns">
                  <div className="column is-one-third-tablet hero-text">
                    <h1>{doc.title}</h1>
                    {link}
                    <p className="lead">{renderHTML(doc.blurb)}</p>
                  </div>
                  <div className="column is-half hero-image">
                    <Img
                      style={{ maxHeight: "75vh", width: "auto" }}
                      fluid={doc.localHeroImage.childImageSharp.fluid}
                      loading="eager"
                      imgStyle={{
                          objectFit: 'contain',
                          objectPosition: 'center center',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
        }
    } else {
        var header = <div className="container">
        <div className="work-header">
            <h1>{doc.title}</h1>
              <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                    <p className="lead">{renderHTML(doc.blurb)}</p>
                </div>
              </div>
          </div>
        </div>
    }


    // Next Link Footer if it exists
    if (pageContext.next){
        var next = <Link to={"/" + pageContext.next.slug} className="work-footer-link">
            <span>Next </span>
            {pageContext.next.title}
        </Link>
    } else {
        var next = null;
    }

    // Prev Link Footer if it exists
    if (pageContext.prev){
        var prev = <Link to={"/" + pageContext.prev.slug} className="work-footer-link">
            <span>Previous </span>
            {pageContext.prev.title}
        </Link>
    } else {
        var prev = null;
    }

	var lightOrDark = (color) => {

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


    return (
      <Layout
        body_colour={doc.body_colour}
        text_colour={doc.text_colour}
        header_text_colour={doc.header_text_colour}
        header_image={doc.localHeaderImage}
      >
        <div className="work-page">
        {header}
          { doc.worksection_set.map((section, i) => {
			if ( lightOrDark(doc.text_colour) == "dark"){
                return (
                    <div className="work-section work-section-dark" key={section.pk}>
                        { debug ? render_debug(section) : null}
                        { render_section(section) }
                    </div>
                )
            } else {
                return (
                    <div className="work-section work-section-light" key={section.pk}>
                        { debug ? render_debug(section) : null}
                        { render_section(section) }
                    </div>
                )
            }
          }) }
        </div>
        
        <div className="container">
            <div className="columns">
              <div className="column">
                {prev}
              </div>
              <div className="column">
                {next}
              </div>
            </div>
        </div>
      </Layout>
    )
}

export default PortfolioTemplate

export const query = graphql`
  query PortfolioTemplate($slug: String!) {
    allRestApiWork(filter: { slug: {eq: $slug} }) {
      edges {
        node {
            active
            title
            slug
            link
	        blurb
	        date
	        body_colour
            text_colour
            header_text_colour
            hero_align
            worksection_set {
                pk
                text
                layout
                align
                align_vertical
                wide
                full
                sorting
                worksectionimage_set {
                    pk
                    title
                    sorting
                    image
                    localImage {
                        ext
                        publicURL
                        childImageSharp {
                            fluid(maxWidth: 1360, quality: 100) {
								...GatsbyImageSharpFluid_tracedSVG
                                src
                            }
                        }
                    }
                }
            }
            localImage {
                childImageSharp {
                    fluid(maxWidth: 1360) {
						...GatsbyImageSharpFluid_tracedSVG
                    }
                }
            }
            localHeaderImage {
                childImageSharp {
                    fluid(maxWidth: 1360) {
						...GatsbyImageSharpFluid_tracedSVG
                    }
                }
            }
            localHeroImage {
                childImageSharp {
                    fluid(maxWidth: 1360) {
						...GatsbyImageSharpFluid_tracedSVG
                    }
                }
            }
        }
     }
  }
}
`
