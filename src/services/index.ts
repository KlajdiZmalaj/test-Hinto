import { ENDPOINT } from "../config";

type postParams = {
  _start: number;
  _limit: number;
};
//GET REQUEST
export const getPosts = async (params: postParams) => {
  const res = await fetch(ENDPOINT + "/posts?" + new URLSearchParams(params as {}), {
    method: "GET",
  });
  const data = await res.json();
  return data;
};
