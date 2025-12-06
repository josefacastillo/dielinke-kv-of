import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // 1. Column 1: Brand & Socials
    {
      name: 'brand',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'DIE LINKE. Offenbach',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Sozial. Gerecht. Für Alle.\nWir kämpfen für ein solidarisches Offenbach.',
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Twitter / X', value: 'twitter' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // 2. Columns 2 & 3: Dynamic Navigation Columns
    {
      name: 'navColumns',
      label: 'Navigation Columns',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g. Partei & Politik',
          },
        },
        {
          name: 'navItems',
          type: 'array',
          fields: [
            link({
              appearances: false, // Keeping it simple as requested
            }),
          ],
        },
      ],
      admin: {
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },

    // 3. Column 4: Contact Info
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Kontakt',
        },
        {
          name: 'address',
          type: 'textarea',
          defaultValue: 'Die Linke KV Offenbach\nDomstraße 81\n63067 Offenbach am Main',
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'info@die-linke-of.de',
        },
      ],
    },

    // 4. Bottom Bar: Legal & Copyright
    {
      name: 'legal',
      type: 'group',
      fields: [
        {
          name: 'copyright',
          type: 'text',
          defaultValue: '© 2025 DIE LINKE Kreisverband Offenbach-Stadt',
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
