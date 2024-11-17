import Link from 'next/link';
import { Box, Text, Image } from '@chakra-ui/react';

const ProductCard = ({ slug, image, price, name }) => {
    
    return (
        <Link href={`/product/${slug || 'unknown'}`} passHref>
            <Box 
            border='1px'
            borderColor='gray.200'
            px='10'
            py='5'
            rounded='lg'
            boxShadow='lg'
            bgColor='white'
            transition='ease 0.2s'
            _hover={{
                boxShadow: 'xl',
                transform: 'scale(1.02)',
            }}
            >
                <Image 
                    src={image?.[0]?.url || '/placeholder.png'} 
                    alt={name || 'Product Image'} 
                />
                <Box>
                    <Text color="gray.800">
                        {name || 'Unnamed Product'}
                    </Text>
                    <Text color="gray.800">
                        ${price.toFixed(2) ?? 'N/A'}
                    </Text>
                </Box>
            </Box>
        </Link>
    )
}

export default ProductCard;