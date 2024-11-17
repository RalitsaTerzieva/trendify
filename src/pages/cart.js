import { useContext, useEffect, useState } from 'react';
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import CartContext from './../lib/context/Cart/index';
import getProductsById from './../lib/graphql/queries/getProductsById';
import graphql from '@/lib/graphql';
import Link from 'next/link';
import loadStripe from './../lib/stripe/index';

export default function Cart() {
    const { items } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const hasProducts = Object.keys(items).length;

    useEffect(() => {
        if (!hasProducts) return;
    
        graphql.request(getProductsById, {
            ids: Object.keys(items),
        })
        .then((data) => {
            setProducts(data.products);
        })
        .catch((err) => console.log(err));
    }, [items]);

    function getTotal() {
        if (!products.length) return 0;
    
        return Object.keys(items)
          .map((id) => {
            const product = products.find((product) => product.id === id);
    
            // If the product or product price is not found or price is invalid, return 0
            if (!product || typeof product.price !== 'number' || product.price <= 0) {
              return 0;
            }
    
            const quantity = items[id];
    
            // If quantity is not valid, return 0
            if (isNaN(quantity) || quantity <= 0) {
              return 0;
            }
    
            return (product.price * quantity) / 100;
          })
          .reduce((x, y) => x + y, 0)
          .toFixed(2);
    }
    
    
      async function handlePayment() {
        const stripe = await loadStripe();
    
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items,
            success_url: `${window.location.origin}/success`,
          }),
        });
    
        const { session } = await res.json();
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      }

    return (
        
        <Box rounded="xl" boxShadow="2xl" w="container.lg" p="16" bgColor="white">
            <Text as="h1" fontSize="2xl" fontWeight="bold" color="gray.900">
                Cart
            </Text>
            <Box>
            {!hasProducts ? (
                <Text color="gray.900">The cart is empty.</Text>
            ) : (
                <>
                {products.map((product) => (
                    <Flex key={product.id} justifyContent="space-between" mb="4">
                    <Box>
                        <Link href={`/product/${product.slug}`} passHref>
                        <Text
                            as="a"
                            fontWeight="bold"
                            color="gray.900"
                            _hover={{ textDecoration: 'underline', color: 'blue.500' }}>
                            {product.name}
                            <Text as="span" color="gray.900" paddingRight="10">
                            {' '}
                            x {product.name}
                            </Text>
                        </Text>
                        </Link>
                    </Box>
                    <Text color="gray.900" paddingRight="5">€{(product.price * (items[product.id] || 0) / 100).toFixed(2)}</Text>
                    </Flex>
                ))}
                <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="xl" fontWeight="bold" color="gray.900">
                    Total: €{getTotal()}
                    </Text>
                    <Button colorScheme="blue" padding="4" onClick={handlePayment}>
                    Pay now
                    </Button>
                </Flex>
                </>
            )}
            </Box>
        </Box>
    )
}