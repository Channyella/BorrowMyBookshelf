import axios from "axios";
import { GetAuthHeader } from "./AuthHelper";

type MyObject = {
    [key: string]: string | number | boolean | undefined;
};

export async function Post<T>(url: string, data: MyObject): Promise<T> {
    const formData = new FormData();

    for (const pair of Object.entries(data)) {
        if (pair[1] === undefined) continue;
        formData.append(pair[0], pair[1].toString());
    }
    const response = await axios.post<T>(url, formData,
        {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
    return response.data;
}

export async function Put(url: string, data: MyObject): Promise<T> {
    const formData = new FormData();

    for (const pair of Object.entries(data)) {
        if (pair[1] === undefined) continue;
        formData.append(pair[0], pair[1].toString());
    }
    await axios.put(url, formData,
        {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
}

export async function Delete(url: string) {
    await axios.delete(url,
        {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
}