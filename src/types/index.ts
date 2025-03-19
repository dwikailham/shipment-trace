export type TListManifes = {
  manifest_code: string;
  manifest_description: string;
  manifest_date: string;
  manifest_time: string;
  city_name: string;
};

export interface IApiResponseWayBill {
  meta: { message: string; code: number; status: string };
  data: {
    delivered: boolean;
    summary: {
      courier_code: string;
      courier_name: string;
      waybill_number: string;
      service_code: string;
      waybill_date: string;
      shipper_name: string;
      receiver_name: string;
      origin: string;
      destination: string;
      status: string;
    };
    details: {
      waybill_number: string;
      waybill_date: string;
      waybill_time: string;
      weight: string;
      origin: string;
      destination: string;
      shipper_name: string;
      shipper_address1: string;
      shipper_address2: string;
      shipper_address3: string;
      shipper_city: string;
      receiver_name: string;
      receiver_address1: string;
      receiver_address2: string;
      receiver_address3: string;
      receiver_city: string;
    };
    delivery_status: {
      status: string;
      pod_receiver: string;
      pod_date: string;
      pod_time: string;
    };
    manifest: Array<TListManifes>;
  };
}

export type TListDropdown = { code: string; label: string };
