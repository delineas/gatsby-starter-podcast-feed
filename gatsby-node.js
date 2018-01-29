const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const URL = require('url-parse')
const slugify = require('slugify')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {

    graphql(
      `
        {
            allPodcastFeedItem {
                edges {
                  node {
                    id,
                    guid,
                    title,
                    description,
                    published(formatString: "DD/MM/YYYY"),
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

        // Create Post pages.
        const postTemplate = path.resolve(`./src/templates/post.js`)
        _.each(result.data.allPodcastFeedItem.edges, edge => {
          createPage({
            path: slugify(edge.node.title, {lower: true}),
            component: postTemplate,
            context: {
              guid: edge.node.guid,
            },
          })
        })
      })

      resolve();
    })
}
