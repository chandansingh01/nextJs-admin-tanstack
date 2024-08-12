"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchUserData = async () => {
  try {
    const response = await fetch(`/api/users`);
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const UseUserData = () => {
  return useQuery({
    queryKey: ["users-data"],
    queryFn: fetchUserData,
  });
};

const fetchUser = async (userId: string) => {
  try {
    const response = await fetch(`/api/users/${userId}`);

    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};
export const useFetchUserDetails = (userId: string) => {
  return useQuery({
    queryKey: ["user-details", userId],
    queryFn: async () => fetchUser(userId),
    enabled: !!userId,
  });
};

const addUserData = async (user: any) => {
  try {
    const body = JSON.stringify(user);
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    return await response.json();
  } catch (error) {
    throw new Error("Failed to add user");
  }
};

export const useAddUserData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "users-data",
      });
    },
    onError: () => {
      throw new Error("Failed to add user");
    },
  });
};

const updateUserData = async (user: any) => {
  try {
    const body = JSON.stringify(user);
    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    return await response.json();
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "users-data",
      });
    },
  });
};
const deleteUsers = async (ids: number[]) => {
  try {
    const body = JSON.stringify(ids);
    const response = await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    return await response.json();
  } catch (error) {
    throw new Error("Failed to delete users");
  }
};

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "users-data",
      });
    },
  });
};
