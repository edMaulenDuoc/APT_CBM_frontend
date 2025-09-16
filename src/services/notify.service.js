import { toast } from "react-toastify";

const notify = {
    success: (mensaje, opciones)           => toast.success(mensaje, { theme: "dark", position: "top-center", ...opciones }),
    error:   (mensaje, opciones)           => toast.error(mensaje, { theme: "dark", position: "top-center", ...opciones }),
    info:    (mensaje, opciones)           => toast.info(mensaje, { theme: "dark", position: "top-center", ...opciones }),
    warning: (mensaje, opciones)           => toast.warning(mensaje, { theme: "dark", position: "top-center", ...opciones }),
    promise: (promise, mensajes, opciones) => toast.promise(promise, mensajes, { theme: "dark", position: "top-center", ...opciones })
}

export default notify;