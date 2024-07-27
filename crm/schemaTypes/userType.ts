import {defineField} from 'sanity'

export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      hidden: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'userType',
      title: 'User Type',
      type: 'string',
      options: {
        list: [
          {title: 'Job Seeker', value: 'job-seeker'},
          {title: 'Recruiter', value: 'recruiter'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resume',
      title: 'Resume',
      type: 'file',
      hidden: ({document}) => document?.userType !== 'job-seeker',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{type: 'company'}],
      hidden: ({document}) => document?.userType !== 'recruiter',
    }),
  ],
}
