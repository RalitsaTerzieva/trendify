import { useContext } from 'react';
import Link from 'next/link';
import { Flex, Box, Button, Text } from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';
import CartContext from './../../lib/context/Cart';

export default function NavBar() {
  const { items } = useContext(CartContext);

  const itemsCount = Object.values(items)
    .reduce((total, quantity) => {
      return total + (isNaN(quantity) ? 0 : quantity);
    }, 0);
  

  return (
    <Box position="fixed" top={0} left={0} w="full" bgColor="white" boxShadow="md">
      <Flex width="container.xl" m="auto" p="5" justifyContent="space-between">
        <Link href="/" passHref>
          <Text color="blue.800" fontWeight="bold" fontSize="2xl" >
            My e-commerce
          </Text>
        </Link>
        <Box>
          <Link href="/cart" passHref>
            <Button padding="5">
              <MdShoppingCart />
              <Text ml="3">{itemsCount}</Text>
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}