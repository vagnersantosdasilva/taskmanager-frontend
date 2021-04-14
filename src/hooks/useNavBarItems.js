import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./useAuth";

export const useNavBarItems = () => {
    const auth = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [helloMessage , setHelloMessage] = useState(null);

    useEffect(()=>{

        const activate = (clickedItem)=>{
            if(!clickedItem.active){
                setItems(items.map(item => item.name ===clickedItem.name ?
                    {...item,activate:true} : { ...item,activate: false}
                ));
            }
        }

        const  items =[
            {name:"Listar Tarefas" , href:"/" , active:true , onClick :activate},
            {name:"Nova Tarefa" , href:"/form" ,active:false , onClick :activate}
        ];

        if (auth.isAuthenticated()){
            items.push({name:"Logout" , href:"#" , active:false , onClick :()=> {
                auth.logout() ;
                setHelloMessage(null);
            }});
            setHelloMessage(`Olá, ${auth.credentials.displayName}!`);
        }
        setItems(items);
    } ,[auth.credentials] );

    return {items,helloMessage}
}