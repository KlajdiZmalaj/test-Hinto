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
  //delay a little bit api response so we can see the loader :)
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 200);
  });

  const data = await res.json();
  return data;
};
//
