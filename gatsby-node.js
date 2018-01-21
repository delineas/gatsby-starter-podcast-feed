const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const URL = require('url-parse')
const slugify = require('slugify')

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for Wordpress pages (route : /{slug})
// Will create pages for Wordpress posts (route : /post/{slug})
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Wordpress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    // ==== PAGES (WORDPRESS NATIVE) ====
    graphql(
      `
        {
            allRssFeedItem {
                edges {
                  node {
                    id,
                    guid,
                    title,
                    content,
                    isoDate(formatString: "DD/MM/YYYY"),
                    link
                  }
                }
            }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create Page pages.
        const postTemplate = path.resolve(`./src/templates/post.js`)
        // We want to create a detailed page for each
        // page node. We'll just use the Wordpress Slug for the slug.
        // The Page ID is prefixed with 'PAGE_'
        _.each(result.data.allRssFeedItem.edges, edge => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: slugify(edge.node.title, {lower: true}),//URL(edge.node.link).pathname.substr(1),
            component: postTemplate,
            context: {
              guid: edge.node.guid,
            },
          })
        })
      })
      // ==== END PAGES ====


    // ==== END POSTS ====
      resolve();
    })
}