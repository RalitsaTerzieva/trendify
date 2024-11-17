import { useContext, useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CartContext from './../lib/context/Cart/index';

export default function Cart() {
    const { items } = useContext(CartContext);
    
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