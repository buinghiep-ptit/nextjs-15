import axiosInstance from "@/lib/axios";
import { MyInfo } from "@/types/customer.type";

export const customerApiRequest = {
  getCustomerInfo: async (): Promise<MyInfo> => {
    const response = await axiosInstance.get(`/fan/api/account/info`);
    return response.data;
  },
};
