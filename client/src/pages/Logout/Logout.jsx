import { redirect } from "react-router-dom"

export function action(){
    localStorage.removeItem('token')
    localStorage.removeItem("persist:root")
   return window.location.href='http://localhost:3000'
}