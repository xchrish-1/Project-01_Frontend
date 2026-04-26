import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getResponseErrorMessage = async (
  response: Response,
  fallbackMessage: string
) => {
  try {
    const responseBody = await response.json();
    if (responseBody.message) {
      return responseBody.message;
    }
    if (Array.isArray(responseBody.errors) && responseBody.errors.length > 0) {
      return responseBody.errors[0].msg || fallbackMessage;
    }
    return fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

const getErrorMessage = (error: unknown, fallbackMessage: string) =>
  error instanceof Error ? error.message : fallbackMessage;

const getRestaurantNetworkErrorMessage = (error: unknown, action: string) => {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return `Cannot ${action} restaurant because the backend API is not reachable. Make sure the backend is running on ${API_BASE_URL}.`;
  }

  return getErrorMessage(error, `Unable to ${action} restaurant`);
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant | undefined> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 404) {
      return undefined;
    }
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error(
        await getResponseErrorMessage(response, "Failed to create restaurant")
      );
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
  } = useMutation(createMyRestaurantRequest, {
    onSuccess: () => {
      toast.success("Restaurant created!");
      queryClient.invalidateQueries("fetchMyRestaurant");
    },
    onError: (error) => {
      toast.error(getRestaurantNetworkErrorMessage(error, "create"));
    },
  });

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error(
        await getResponseErrorMessage(response, "Failed to update restaurant")
      );
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
  } = useMutation(updateRestaurantRequest, {
    onSuccess: () => {
      toast.success("Restaurant updated");
      queryClient.invalidateQueries("fetchMyRestaurant");
    },
    onError: (error) => {
      toast.error(getRestaurantNetworkErrorMessage(error, "update"));
    },
  });

  return { updateRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
        return [];
      }
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};
