import React, { Component } from "react"
import PropTypes from "prop-types"
import linkifyHtml from 'linkifyjs/html'
import Audio from 'react-audioplayer';

class PostTemplate extends Component {
  render() {
    const post = this.props.data.allPodcastFeedItem
console.log(post);
    let playlist = [{src: post.edges[0].node.enclosure.url, name: post.edges[0].node.title}]

    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: post.edges[0].node.title }} />
        <div dangerouslySetInnerHTML={{ __html: linkifyHtml(post.edges[0].node.description).replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
        <Audio
          width={600}
          height={400}
          autoPlay={false}
          playlist={ playlist }
        />
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
    allPodcastFeedItem (limit: 1, filter: { guid: { eq: $guid } }){
        edges {
          node {
            guid,
            title,
            description,
            published(formatString: "DD/MM/YYYY"),
            link,
            enclosure {
              url,
              filesize,
              type
            }
          }
        }
    }
  }
`