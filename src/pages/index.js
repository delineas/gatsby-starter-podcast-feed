import React from 'react'
import Link from 'gatsby-link'
import URL from 'url-parse'
import linkifyHtml from 'linkifyjs/html'

const IndexPage = ({ data }) => {
  const posts = data.allRssFeedItem.edges
console.log(URL('http://api.spreaker.com/episode/13815996').pathname.substr(1));
  return (
    <main>
      {posts.map(post => (
        <article key={post.node.guid}>
          <h2>{post.node.title}</h2>
          <p>{post.node.isoDate}</p>
          {/* <img
            src={post.node.itunes.image}
            alt={post.node.title}
            width="150"
          /> */}
          <div dangerouslySetInnerHTML={{ __html: linkifyHtml(post.node.content).replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
        </article>
      ))}
    </main>
  )
}

IndexPage.propTypes

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allRssFeedItem {
      edges {
        node {
          guid,
          title,
          content,
          pubDate,
          isoDate(formatString: "DD/MM/YYYY"),
          link
        }
      }
    }
  }
`