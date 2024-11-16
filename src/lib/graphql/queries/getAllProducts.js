import { gql } from 'graphql-request';

const products =  gql`
  query GetAllProducs {
    products {
      id
      name
      slug
      price
      images {
        id
        url
      }
    }
  }
`;

export default products;