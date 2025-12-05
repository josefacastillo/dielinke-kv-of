import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        // 1. The Top Label
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Top level label',
          },
        },
        // 2. The Dropdown Menu
        {
          name: 'submenu',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        // components: {
        //   RowLabel: '@/Header/RowLabel#RowLabel',
        // },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
