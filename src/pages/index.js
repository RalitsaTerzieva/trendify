import ProductCard from './../components/ProductCard/index'; // Importing default export
import graphql from './../lib/graphql';
import getAllProducts from '@/lib/graphql/queries/getAllProducts';
import { Grid } from '@chakra-ui/react';

// Home component
 const Home = (props) => {
  console.log(props.products);
  return (
    <Grid gridTemplateColumns="repeat(4, 1fr)" gap="5">
      {props.products.map((product) => (
        <ProductCard
          key={product.id}
          slug={product.slug}
          image={product.images}
          name={product.name}
          price={product.price}
        />
      ))}
    </Grid>
  );
};

// Export the Home component as default
export default Home;

// Export getStaticProps at the end
export const getStaticProps = async () => {
  const { products } = await graphql.request(getAllProducts);
  console.log(products);

  return {
    revalidate: 60,
    props: {
      products,
    },
  };
};
