import "@/styles/globals.css";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <Component {...pageProps} />
   </ChakraProvider>
  )
}
