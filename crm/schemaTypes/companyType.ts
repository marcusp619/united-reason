import { defineField } from "sanity";

export default {
    name: 'company',
    title: 'Company',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Company Name',
        type: 'string',
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'description',
        title: 'Company Description',
        type: 'text'
      }),
      defineField({
        name: 'location',
        title: 'Location',
        type: 'reference',
        to: [{ type: 'location' }]
      }),
      defineField({
        name: 'website',
        title: 'Website',
        type: 'url'
      }),
      defineField({
        name: 'logo',
        title: 'Logo',
        type: 'image'
      })
    ]
  };