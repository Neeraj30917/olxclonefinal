import api from "./apiconfig"

export const fetchads = (data) => {
    const url = "/app/fetchads"
    return api()
        .post(url, data)
        .then((result) => {
            return result.data;
        })
}
