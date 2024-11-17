import { fallbackId } from '@chakra-ui/react/dist/types/components/skip-nav/skip-nav-link';
import graphql from './../../lib/graphql';
import getAllProducts from './../../lib/graphql/queries/getAllProducts';

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
    }
}

export async function getStaticProps() {}

export default function ProductPage() {}