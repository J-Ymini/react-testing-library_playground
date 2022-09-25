import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts",
});

const getData = async () => {
  const { data } = await instance.get("/");
  return data;
};

const postData = async (information: unknown) => {
  const { data } = await instance.post("/", information);
  return data;
};

type PostData = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export const useDataQuery = () =>
  useQuery<PostData[], AxiosError>(["getData"], getData);

export const useDataMutation = () => useMutation(["postData"], postData);
