const authHeaders = {
    headers: {
        "Authorization": `bearer ${process.env.NEXT_PUBLIC_LEPINE_ACCESS_TOKEN}`,
        "Content-Type": 'application/json'
    }
}

export default authHeaders;