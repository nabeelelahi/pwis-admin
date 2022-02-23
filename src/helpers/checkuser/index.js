
   export default function CheckUser() {
        try {
            return JSON.parse(localStorage.getItem('uuid'))
        } catch (error) {
        }
    }
