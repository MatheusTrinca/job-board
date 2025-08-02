import { gql } from '@apollo/client';
import { JOB_FRAGMENT, COMPANY_WITH_JOBS_FRAGMENT } from './fragments';

// Queries
export const JOBS_QUERY = gql`
  query Jobs($limit: Int, $offset: Int) {
    jobs(limit: $limit, offset: $offset) {
      ...JobInfo
    }
  }
  ${JOB_FRAGMENT}
`;

export const JOB_BY_ID_QUERY = gql`
  query Job($id: ID!) {
    job(id: $id) {
      ...JobInfo
    }
  }
  ${JOB_FRAGMENT}
`;

export const COMPANY_BY_ID_QUERY = gql`
  query Company($id: ID!) {
    company(id: $id) {
      ...CompanyWithJobs
    }
  }
  ${COMPANY_WITH_JOBS_FRAGMENT}
`;
