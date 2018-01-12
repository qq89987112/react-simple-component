import axios from "axios"
export default {
    table(){
        return axios.get("/table2");
    }
}