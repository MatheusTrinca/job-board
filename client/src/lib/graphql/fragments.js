import { gql } from '@apollo/client';

export const COMPANY_FRAGMENT = gql`
  fragment CompanyInfo on Company {
    id
    name
  }
`;

export const COMPANY_WITH_JOBS_FRAGMENT = gql`
  fragment CompanyWithJobs on Company {
    id
    name
    description
    jobs {
      id
      title
      date
    }
  }
`;

export const JOB_FRAGMENT = gql`
  fragment JobInfo on Job {
    id
    title
    description
    date
    company {
      ...CompanyInfo
    }
  }
  ${COMPANY_FRAGMENT}
`;