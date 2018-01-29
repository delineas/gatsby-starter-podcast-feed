import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import URL from 'url-parse'
import linkifyHtml from 'linkifyjs/html'
import slugify from 'slugify'

const IndexPage = ({ data }) => {
  const posts = data.allPodcastFeedItem.edges

  return (
    <main>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
    </Helmet>
      {posts.map(post => (
        <article key={post.node.guid}>
          
          <Link className="post__title-link" to={ slugify(post.node.title, {lower: true}) }><h2>{post.node.title}</h2></Link>
          <p>{post.node.publised}</p>
          <div dangerouslySetInnerHTML={{ __html: linkifyHtml(post.node.description).replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
        </article>
      ))}
    </main>
  )
}

IndexPage.propTypes

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allPodcastFeedItem {
      edges {
        node {
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