export const fetchEmails = async () => {
  try {
    console.log("Calling /api/fetch-emails...");
    const response = await axios.get("/api/fetch-emails");

    console.log("Response status:", response.status);
    console.log("Fetched emails:", response.data);

    if (!Array.isArray(response.data)) {
      console.error("Invalid data format in response");
      throw new Error("Invalid data format");
    }

    return response.data;
  } catch (error) {
    console.error("Error in fetchEmails:", error.message);
    throw error;
  }
};
