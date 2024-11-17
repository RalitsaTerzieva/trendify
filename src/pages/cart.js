import { useContext, useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CartContext from './../lib/context/Cart/index';
import getProductsById from './../lib/graphql/queries/getProductsById';
import graphql from '@/lib/graphql';

export default function Cart() {
    const { items } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const hasProducts = Object.keys(item).length;

    useEffect(() => {
        if(!hasProducts) return;

        graphql.request(getProductsById, {
            ids: Object.keys(items),
        })
        .then((data) => {
            setProducts(data.products)
        })
        .catch((err) => console.log(err))
    }, [JSON.stringify(products)])

    return (
        <Box
        rounded="xl"
        boxShadow="2xl"
        w="container.lg"
        p="16"
        bgColor="white"
        >
            <Text as="h1" fontSize="2xl" fontWeight="bold" color="gray.800">Cart</Text>
            <Box>
                <Text>The card is empty...</Text>
            </Box>
        </Box>
    )
}