import axios from "axios";
import { baseUrl } from "../components/elements/Core";

export const axiosInstance = axios.create({
     baseURL: baseUrl,
     timeout: 10000,
     headers: {
          'Content-Type': 'application/json',
     }
})

export const fetchResource = async (resource: string, slug?: string) => {
     try {
          const response = await axiosInstance.get(`/${resource}${slug ? `/${slug}` : ''}`);
          console.log('API Responses:', response.data);
          return response.data;
     } catch (error) {
          console.error('API request failed:', error);
          throw error;
     }
}


