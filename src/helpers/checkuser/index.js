import { startUp } from "@services"

   export default function CheckUser() {
        try {
            return startUp(localStorage.getItem('uuid'))
        } catch (error) {
        }
    }
