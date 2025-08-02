import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompany,
  updateJob,
} from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    jobs: async (_root, { limit, offset }) => {
      const items = await getJobs(limit, offset);
      const totalCount = await getJobCount();

      return { items, totalCount };
    },

    job: async (_, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError(`Job not found with ID: ${id}`);
      }
      return job;
    },

    company: async (_, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError(`Company not found with ID: ${id}`);
      }
      return company;
    },
  },

  Mutation: {
    createJob: async (_, { input: { title, description } }, { user }) => {
      if (!user) {
        throw notAuthorizedError('You must be logged in to create a job.');
      }

      const companyId = user.companyId;
      return createJob({ companyId, title, description });
    },

    deleteJob: async (_, { id }, { user }) => {
      if (!user) {
        throw notAuthorizedError('You must be logged in to delete a job.');
      }

      const job = await deleteJob(id, user.companyId);

      if (!job) {
        throw notFoundError(`Job not found with ID: ${id}`);
      }

      return job;
    },

    updateJob: async (_, { input: { id, title, description } }, { user }) => {
      if (!user) {
        throw notAuthorizedError('You must be logged in to update a job.');
      }

      const companyId = user.companyId;
      const job = await updateJob({ id, title, description, companyId });

      if (!job) {
        throw notFoundError(`Job not found with ID: ${id}`);
      }

      return job;
    },
  },

  Company: {
    jobs: company => getJobsByCompany(company.id),
  },

  Job: {
    date: job => toISODate(job.createdAt),
    company: (job, _args, { companyLoader }) =>
      companyLoader.load(job.companyId),
  },
};

function toISODate(value) {
  return value.slice(0, 'yyyy-MM-dd'.length);
}

function notAuthorizedError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: 'NOT_AUTHORIZED',
    },
  });
}

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: 'NOT_FOUND',
    },
  });
}
