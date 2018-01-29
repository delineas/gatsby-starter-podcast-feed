module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Podcast Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-feed',
      options: {
        feedURL: 'https://www.danielprimo.io/podcast/feed.xml'
      }
    },
  ],
};
