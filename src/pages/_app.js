import "@/styles/globals.css";
import { ChakraProvider, defaultSystem, Box, Flex } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <Flex w='full' minH='100vh' bgColor='gray.100'>
        <Box maxW='70vw' m='auto'>
          <Component {...pageProps} />
        </Box>
      </Flex>
   </ChakraProvider>
  )
}
