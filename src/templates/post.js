import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import kebabCase from 'lodash/kebabCase';
import { Icon, Label, Header, Divider, Breadcrumb } from 'semantic-ui-react';

const PostDetail = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div>
      <Breadcrumb style={{ marginBottom: '2em' }}>
        <Link className="section" to="/">
          Home
        </Link>
        <Breadcrumb.Divider icon="right angle" />
        <Link className="section" to="/posts">
          Posts
        </Link>
        <Breadcrumb.Divider icon="right angle" />
        <Breadcrumb.Section active>{post.frontmatter.title}</Breadcrumb.Section>
      </Breadcrumb>
      <div>
        <Header as="h1">
          {post.frontmatter.title}
          <Header.Subheader>{post.frontmatter.date}</Header.Subheader>
        </Header>
        <Label.Group>
          {post.frontmatter.tags.map((tag, index) => (
            <Link
              className="ui label"
              style={{ marginBottom: '0em' }}
              key={index}
              to={`/tags/${kebabCase(tag)}`}
            >
              {tag}
            </Link>
          ))}
        </Label.Group>
        <Divider style={{ marginTop: '2em', marginBottom: '2em' }} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </div>
  );
};

PostDetail.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string.isRequired),
      }),
    }),
  }),
};

export default PostDetail;

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;
