export const config = (token) => {
    const username = JSON.parse(localStorage.getItem("user")).username
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "subject": username
        }
    }
}