import axios from "axios";

export const fetchPendingData = async (token: string) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/sponsers/pending",
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const fetchApprovedData = async (token: string) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/sponsers/approved",
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRejectededData = async (token: string) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/sponsers/rejected",
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const RejectSponsor = async (token: string, id: string) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/v1//admin/reject/sponser/${id}`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const ApprovedSponsor = async (token: string, id: string) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/v1/admin/approved/sponser/${id}`,
      {
        status: "approved",
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
