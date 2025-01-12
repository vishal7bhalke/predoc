import { createContext } from "react";

export const Appcontext=createContext()

const Appcontextprovider = (props) => {
const currency= 'Rs'


    const calculateage = (dob) => {
        const today= new Date();
        const birthdate= new Date(dob)
        let age= today.getFullYear() - birthdate.getFullYear()
        return age
    }
    const months = [" ","jan","feb","march","apr","may","jun","jul","aug","sep","oct","nov","dec"]

    const formatedate = (slotdate)=> {
      const datearray= slotdate.split('_');
      return datearray[0] + " " + months[Number(datearray[1])] + " " + datearray[2]
    }


    const value ={
        calculateage,formatedate,currency
    }

    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default Appcontextprovider;