import React, { Component } from "react";
import { Link } from "gatsby"
import Img from "gatsby-image"

export default class PortfolioCard extends Component {

  render() {
    const{work}=this.props;
    const{count}=this.props;
    const{full}=this.props;
    const{click}=this.props;
    if (full){
        var workClass = "column is-full";
    } else {
        var workClass = "column is-half";
    }
    return (
        <div className={workClass}>
          <article
            onClick={() => click(work)}
            className="portfolioCard"
            style={{
                backgroundImage: 'url(' + work.node.localImage.childImageSharp.fluid.src + ')',
            }}
          >
            <Link to={"/" + work.node.slug} className="portfolio-link">
              <div className="cover">
                <h2>{work.node.title}</h2>
              </div>
            </Link>
          </article>
        </div>
    )
  }
}

//export default props => (
//  <article
//    className={`post-card ${props.count % 3 === 0 && `post-card-large`} ${
//      props.postClass
//    } ${props.node.frontmatter.thumbnail ? `with-image` : `no-image`}`}
//    style={
//      props.node.frontmatter.thumbnail && {
//        backgroundImage: `url(${
//          props.node.frontmatter.thumbnail.childImageSharp.fluid.src
//        })`,
//      }
//    }
//  >
//      {
//        props.node.frontmatter.thumbnail
//          ?(<ContentWithImage props={props}/>)
//          :(<ContentNoImage props={props}/>)
//      }
//  </article>
//)
