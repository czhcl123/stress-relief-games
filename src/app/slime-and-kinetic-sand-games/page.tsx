import type { Metadata } from 'next'
import { getCollection } from '@/lib/collections'
import { collectionMetadata } from '@/lib/collectionSeo'
import CollectionPage from '@/components/CollectionPage'

const collection = getCollection('slime-and-kinetic-sand-games')

export const metadata: Metadata = collectionMetadata(collection)

export default function Page() {
  return <CollectionPage collection={collection} />
}
