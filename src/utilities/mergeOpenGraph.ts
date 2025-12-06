import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: '',
  // images: [
  //   {
  //     url: `${getServerSideURL()}/website-template-OG.webp`,
  //   },
  // ],
  siteName: 'DIE LINKE KV Offenbach Stadt',
  title: 'DIE LINKE KV Offenbach Stadt',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...og,
    images: og?.images ? og.images : undefined,
  }
}
