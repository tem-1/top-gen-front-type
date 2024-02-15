interface ErrorResponse {
  status: number;
  message: string;
}

export const handleApiError = (error: any): ErrorResponse => {
  let status = 500;
  let message = "An unexpected error occurred. Please try again later.";

  if (error.response) {
    // The request was made and the server responded with a status code
    status = error.response.status;
    message = error.response.data.message || "Server Error";
  } else if (error.request) {
    // The request was made but no response was received
    status = 0;
    message = "No response from server";
  } else {
    // Something happened in setting up the request that triggered an error
    message = error.message || "Request Error";
  }

  return { status, message };
};
