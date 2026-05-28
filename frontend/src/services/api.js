const API_BASE = "/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const error = new Error(data?.error || data?.message || "Request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const api = {
  getJobs: () => request("/job-fetch"),
  postJob: (jobData) =>
    request("/post-job", {
      method: "POST",
      body: JSON.stringify(jobData),
    }),
  deleteJob: (jobId) =>
    request(`/jobs/${jobId}`, {
      method: "DELETE",
    }),
  login: (credentials) =>
    request("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  signup: (userData) =>
    request("/signing", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
};
