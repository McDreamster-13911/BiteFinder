import { useEffect, useState } from "react";

const useOnlineStatus = () =>
{
    const [online_status, set_online_status] = useState(true);

    // check if the user is online / connected to the internet

    useEffect(() => {

        window.addEventListener("offline", () => {
            set_online_status(false);
        })

        window.addEventListener("online", () => {
            set_online_status(true);
        })
    }, []);

    // Boolean value
    return online_status;
}

export default useOnlineStatus;