import { gql } from '@apollo/client';
import { JOB_FRAGMENT } from './fragments';

// AFTER USING HOOKS

// Mutations
export const CREATE_JOB_MUTATION = gql`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobInfo
    }
  }
  ${JOB_FRAGMENT}
`;

export const DELETE_JOB_MUTATION = gql`
  mutation DeleteJob($id: ID!) {
    job: deleteJob(id: $id) {
      id
    }
  }
`;
