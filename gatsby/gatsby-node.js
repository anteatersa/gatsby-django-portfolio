/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Bugfix for Sharp segmentation fault - https://florian.ec/blog/gatsby-build-netlify-segmentation-fault/
const sharp = require('sharp');
sharp.cache(false);
sharp.simd(false);

const path = require(`path`);
const { createRemoteFileNode } = require("gatsby-source-filesystem")

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      
      return result;
    })
  )
});

// Create Schema Manually to avoid issue of Null or empty arrays in rest data
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type RestApiWork implements Node {
	  active: Boolean
	  pk: String
	  link: String
      title: String
      slug: String
      blurb: String
      date: String
      body_colour: String
      text_colour: String
      header_text_colour: String
	  image: String
	  header_image: String
	  hero_align: String
      worksection_set: [Section]!
    }
	type Section implements Node {
		pk: String
		text: String
		layout: String
		align: String
		align_vertical: String
		wide: Boolean
		full: Boolean
		sorting: Int
		video: String
		worksectionimage_set: [Image]
	}
	type Image implements Node {
		title: String
		sorting: Int
		image: String
	}
  `)

  // Work Section
  createTypes(`
    type RestApiWorksection implements Node {
		pk: String
		text: String
		layout: String
		align: String
		wide: Boolean
		full: Boolean
		sorting: Int
		video: String
		worksectionimage_set: [Image]
    }
	type Image implements Node {
		title: String
		sorting: Int
		image: String
	}
  `)
}

// Import images as fileNodes
exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
  if (
    node.internal.type === "Image") {}
  if (
    node.internal.type === "RestApiWork" &&
    node.worksection_set.length > 0
  ) {
	const asynMap1 = await Promise.all(node.worksection_set.map(async (section, parentIndex) => {
		if (section.worksectionimage_set.length > 0){
			const asynMap2 = await Promise.all(section.worksectionimage_set.map(async (image, subIndex) => {
				let fileNode = await createRemoteFileNode({
				  url: image.image, // string that points to the URL of the image
				  parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
				  createNode, // helper function in gatsby-node to generate the node
				  createNodeId, // helper function in gatsby-node to generate the node id
				  cache, // Gatsby's cache
				  store, // Gatsby's redux store
				})
				// if the file was created, attach the new node to the parent node
				if (fileNode) {
				  node.worksection_set[parentIndex].worksectionimage_set[subIndex].localImage___NODE = fileNode.id
				}
			}))
		}
	}))
	/**
    let fileNode = await createRemoteFileNode({
      url: node.frontmatter.featuredImgUrl, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImg___NODE = fileNode.id
    }
	**/
  }
}


// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  
  const getPortfolios = makeRequest(graphql, `
    {
      allRestApiWork {
        edges {
          node {
			pk
			active
			title	
            slug
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each article.
    result.data.allRestApiWork.edges.forEach(({ node }, index) => {

	  // Prev
	  var prev = null;
	  var iter = 1;
	  while (true){
		if (index - iter < 0) {
			break; // No more to look at
		}
		var prev_item = result.data.allRestApiWork.edges[index - iter].node;
		if (prev_item.active == true){
			prev = prev_item;
			break;
		}
		iter = iter + 1;
	  }

	  // Next
	  var next = null;
	  iter = 1;
	  while (true){
		if (index + iter > result.data.allRestApiWork.edges.length - 1) {
			break; // No more to look at
		}
		var next_item = result.data.allRestApiWork.edges[index + iter].node;
		if (next_item.active == true){
			next = next_item;
			break;
		}
		iter = iter + 1;
	  }

      createPage({
        path: `/${node.slug}`,
        component: path.resolve(`src/templates/portfolio.js`),
        context: {
          slug: node.slug,
		  prev: prev,
		  next: next,
        },
      })
    })
  });
  
  // Query for articles nodes to use in creating pages.
  return getPortfolios;
};
