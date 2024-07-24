import { defineField } from "sanity";

export default {
    name: 'jobCategory',
    title: 'Job Category',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Category Title',
        type: 'string',
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'description',
        title: 'Category Description',
        type: 'text'
      })
    ]
  };