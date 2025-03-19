import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/service";
import { IApiResponseWayBill } from "@/types";
import  { AxiosError } from 'axios';

type TProps = {
  awb: string;
  courier: string;
};

const useGetWayBill = () => {
  const data = useMutation<IApiResponseWayBill, AxiosError, TProps>({
    mutationFn: async (props: TProps) => {
      const response = await axiosClient.post(`/api/v1/track/waybill`, {},
      {
        params: props,
      });

      return response.data;
    },
  });
  return data;
};

export default useGetWayBill;
