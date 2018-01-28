import React from 'react'
import Link from 'gatsby-link'
import URL from 'url-parse'
import linkifyHtml from 'linkifyjs/html'

const IndexPage = ({ data }) => {
  console.log(data);
  const posts = data.allPodcastFeedItem.edges

  return (
    <main>
      {posts.map(post => (
        <article key={post.node.guid}>
          <h2>{post.node.title}</h2>
          <p>{post.node.published}</p>
          {/* <img
            src={post.node.itunes.image}
            alt={post.node.title}
            width="150"
          /> */}
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