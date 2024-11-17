import { useContext, useState } from 'react';
import graphql from './../../lib/graphql';
import getAllProducts from './../../lib/graphql/queries/getAllProducts';
import getProductDetail from './../../lib/graphql/queries/getProductDetail';
import { Box, Flex, Grid, Text, Image, Button } from '@chakra-ui/react';
import CartContext from './../../lib/context/Cart';
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";


export async function getStaticPaths() {
    const { products } = await graphql.request(getAllProducts);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug
        }
    }))

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const { products } = await graphql.request(getProductDetail, {
        slug: params.slug
    })
    console.log(products[0])
    return {
        props: {
            product: products[0]
        }
    };
}

const SelectQuantity = ({ onChange }) => {
    const quantityOptions = createListCollection({
      items: Array.from({ length: 10 }, (_, i) => ({
        label: `${i + 1}`,
        value: `${i + 1}`,
      })),
    });
  
    return (
      <SelectRoot
        collection={quantityOptions}
        size="sm"
        width="200px"
        onValueChange={onChange}
      >
        <SelectLabel color="gray.800">Select Quantity</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Choose quantity" color="gray.800" />
        </SelectTrigger>
        <SelectContent>
          {quantityOptions.items.map((item) => (
            <SelectItem item={item} key={item.value} color="gray.800">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    );
  };

export default function ProductPage({ product }) {
    const [quantity, setQuantity] = useState(0);
    const { items, setItems } = useContext(CartContext);
    
    const alreadyInCart = product.id in items;
  
    function addToCart() {
      setItems({
        ...items,
        [product.id]: quantity,
      });
    }

    if (!product) {
        return <Text>Loading...</Text>;
    }

    return (
        <Flex rounded="xl" boxShadow="2xl" w="full" p="16" bgColor="white">
          <Image height="96" width="96" src={product.images[0].url} />
          <Box ml="12" width="container.xs">
            <Text as="h1" fontSize="4xl" fontWeight="bold" color="blue.500">
              {product.name}
            </Text>
            <Text lineHeight="none" fontSize="xl" my="3" fontWeight="bold" color="blue.500">
              €{product.price / 100}
            </Text>
            <Text maxW="96" textAlign="justify" fontSize="sm" color="blue.500">
              {product.description}
            </Text>
            <Grid gridTemplateColumns="2fr 1fr" gap="5" alignItems="center">
            <SelectQuantity onChange={(quantity) => setQuantity(parseInt(quantity))} />
              <Button colorScheme="blue" onClick={addToCart}>
                {alreadyInCart ? 'Update' : 'Add to cart'}
              </Button>
            </Grid>
          </Box>
        </Flex>
      );
    }