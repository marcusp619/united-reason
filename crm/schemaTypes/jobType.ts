import {defineField, defineType} from 'sanity'

export const jobType = defineType({
  name: 'jobPosting',
  title: 'Job Posting',
  type: 'document',
  fields: [
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{type: 'company'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Job Category',
      type: 'reference',
      to: [{type: 'jobCategory'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whyUs',
      title: 'Why Us',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'full-time'},
          {title: 'Part-time', value: 'part-time'},
          {title: 'Contract', value: 'contract'},
          {title: 'Temporary', value: 'temporary'},
          {title: 'Internship', value: 'internship'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'salaryRange',
      title: 'Salary Range',
      type: 'string',
    }),
    defineField({
      name: 'whoWeWant',
      title: 'Who We Want',
      type: 'string',
    }),
    defineField({
      name: 'whatWeExpect',
      title: 'What We Expect (Essential Functions)',
      type: 'array',
      of: [{type: 'text'}],
      initialValue: [
        'Responsible for the overall management of one large $200MM + or an individual project with a high level of complexity or multiple construction projects. Key responsibilities, as described below include: Project Administration, Financial Performance, Schedule Performance, Risk Management, Relationship Management, Team Member Development, and Collaboration.',
        'PROJECT ADMINISTRATION: Facilitates Customer and Team\'s meetings and ensures that detailed meeting minutes and actions items registers are updated and promptly distributed. Ensure that all "project start-up meetings" are held when required and with the appropriate team members. Ensures that the project action items are being systematically tracked and completed to support the project requirements. Ensure that project staff completes submittal reviews, status reports, closeout documents, and maintenance manuals promptly. Visit project sites regularly.',
        'FINANCIAL SUCCESS: The Project Executive is responsible to continually monitor progress identifying issues early during budget/costs reviews, developing needed corrective actions to mitigate issues, and to provide reports to the Responsible Director, Responsible Regional Manager or Responsible Vice President. Operate within budgetary limitations and requirements. The Project Manager inherits the role of day to day management of project financials while the Project Executive is responsible for developing proposals and execution strategy for the project. This strategy should be project-specific and evolve over the proposal phase and finalized early in execution. The plan should have buy-in from Construction, A/E, MEP Services, and Field Ops and include a reporting process to update Market Leaders as appropriate. The Risk Management and Relationship Management plans will be part of the execution strategy. Monitor the purchasing of all required materials, subcontracts, equipment, and services for project(s) by project staff and other team members, ensuring optimal savings within safety, quality, scheduling, training, and profitability requirements. Ensure that the project staff is issuing change orders to subcontractors and customers according to the work procedures. Ensure that the project staff is completing red files accurately and in a timely manner, as well as reviewing the red file and/or job cost reports with the Site Manager on a monthly basis.',
        'SCHEDULE PERFORMANCE: Responsible for oversight of project team in the development and maintenance of the project master schedule to ensure conformance to project execution strategy and contractual obligations. Responsible for collaboration with Field Operations Managers, A/E Services, and MEP Services to assess the project schedule progress, identifying potential issues, and assisting the project team in the development of corrective measures as needed. Ensure that any delays on the project are appropriately documented and communicated to all pertinent parties; includes producing timely notices and development of documentation to justify extensions to the schedule, and/or taking the development of documentation to justify extensions to the schedule, and/or taking appropriate measures to adhere to or modify the schedule.',
        'RISK MANAGEMENT: Ensure that all contractual terms and conditions in both owner contracts and subcontracts are understood by all parties. Must be able to render decisions and/or take appropriate action(s) based on the contractual obligations of all parties. Ensure that goals for safety, quality, scheduling, training, and profitability are met for specific project or projects. This includes the promotion and implementation of the safety and quality programs. Responsible for developing the project risk management plan and assigning responsibilities for monitoring and reporting progress. Plans should address both internal and external risks. Risk management planning should be incorporated into the Project Execution plan. Assess the effectiveness of plans and in collaboration with the Field Operations Manager, A/E Services, and MEP Services to develop changes to the plan and/or corrective action steps to be implemented by the team. Provide oversight, identifying potential issues & assist project teams in the development of corrective measures for risk mitigation. In addition, responsible in monitoring the corrective measure until risk is mitigated. Demonstrate and communicate a consistent and clear approach to problem-solving.',
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
    }),
    defineField({
      name: 'preparedDate',
      title: 'Prepared Date',
      type: 'datetime',
    }),
  ],
})
