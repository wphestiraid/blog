import React from 'react';
import Link from 'gatsby-link';
import kebabCase from 'lodash/kebabCase';
import { Card, Icon, Label } from 'semantic-ui-react';

const TagsCard = ({ data }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Link to="/tags">
            <Icon name="tags" size="small" />
            Tags
          </Link>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Label.Group size="small">
          {data.map(tag => (
            <Link
              className="ui label"
              to={`/tags/${kebabCase(tag.fieldValue)}`}
              key={tag.fieldValue}
            >
              {tag.totalCount}
              <Label.Detail>{tag.fieldValue}</Label.Detail>
            </Link>
          ))}
        </Label.Group>
      </Card.Content>
    </Card>
  );
};

export default TagsCard;