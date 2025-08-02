import { useMutation, useQuery } from '@apollo/client';
import { COMPANY_BY_ID_QUERY, JOB_BY_ID_QUERY, JOBS_QUERY } from './queries';
import { CREATE_JOB_MUTATION } from './mutations';

export function useCompany(id) {
  const { data, loading, error } = useQuery(COMPANY_BY_ID_QUERY, {
    variables: { id },
  });
  return { company: data?.company, loading, error: Boolean(error) };
}

export function useJobs(limit, offset) {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    variables: { limit, offset },
  });
  return { jobs: data?.jobs, loading, error: Boolean(error) };
}

export function useJob(id) {
  const { data, loading, error } = useQuery(JOB_BY_ID_QUERY, {
    variables: { id },
  });
  return { job: data?.job, loading, error: Boolean(error) };
}

export function useCreateJob() {
  const [mutate, { loading }] = useMutation(CREATE_JOB_MUTATION);

  const createJob = async (title, description) => {
    const {
      data: { job },
    } = await mutate({
      variables: { input: { title, description } },
      update: (cache, { data: { job } }) => {
        cache.modify({
          fields: {
            jobs(existingJobs = []) {
              return [...existingJobs, job];
            },
          },
        });
      },
    });

    return job;
  };

  return { createJob, loading };
}
