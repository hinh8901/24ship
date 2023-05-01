import axios from "axios"

const SHEET_ENDPOINT = process.env.NEXT_PUBLIC_SHEET_ENDPOINT

export const sendRequest = (data) => {
  return axios.get(SHEET_ENDPOINT, {
    params: data,
  })
}
