import { useMutation } from "@tanstack/react-query"
import { createNetworkElement } from "../../api"
import { toast } from "react-toastify"

export const useNetworkElementMutation = () => {
    
    const mutationCreateNetworkElement = useMutation({
        mutationFn: createNetworkElement,
        onError: (error: Error) => {
            toast.error(error.message, { theme: "colored" });
        },
        onSuccess: (response) => {
            if(response) {
                const { msg, payload } = response;
                toast.success(
                    `${msg} // Network Element Name: ${payload.neName.toUpperCase()} | Description: ${payload.description} | Vendor: ${payload.vendor.vendorName}`,
                    {
                        theme: "colored",
                    }
                )
            }
        }
    })

    return {
        mutationCreateNetworkElement,
    }

}