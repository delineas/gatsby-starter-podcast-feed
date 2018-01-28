module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
'gatsby-plugin-react-helmet',
                {
                        resolve: 'gatsby-source-feed',
                        options: {
                                feedURL: 'https://www.ivoox.com/podcast-1bit-memoria_fg_f1469800_filtro_1.xml'
                        }
                },
],
};
