import "@/styles/globals.css";
import { useState } from 'react';
import { ChakraProvider, defaultSystem, Box, Flex } from "@chakra-ui/react";
import CartContext from './../lib/context/Cart';

const App = ({ Component, pageProps }) => {
  const [items, setItems] = useState({});

  return (
    <ChakraProvider value={defaultSystem}>
       <CartContext.Provider value={{ items, setItems }}>
        <Flex w='full' minH='100vh' bgColor='gray.100'>
          <Box maxW='70vw' m='auto'>
            <Component {...pageProps} />
          </Box>
        </Flex>
      </CartContext.Provider>
   </ChakraProvider>
  )
}

export default App;
