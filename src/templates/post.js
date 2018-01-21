import React, { Component } from "react"
import PropTypes from "prop-types"
import linkifyHtml from 'linkifyjs/html'

class PostTemplate extends Component {
  render() {
    const post = this.props.data.allRssFeedItem

    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: post.edges[0].node.title }} />
        <div dangerouslySetInnerHTML={{ __html: linkifyHtml(post.edges[0].node.content).replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
      </div>
    )
  }
} 
//<img src={post.image.sizes.thumbnail} />

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate

export const pageQuery = graphql`
  query currentPostQuery($guid: String!) {
    allRssFeedItem (limit: 1, filter: { guid: { eq: $guid } }){
        edges {
          node {
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