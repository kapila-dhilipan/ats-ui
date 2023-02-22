import React,{createContext,useContext,useState} from 'react'

const UserContext = createContext(null);

export const useUserContext =() =>{
	return useContext(UserContext)
}

export const UserProvider = ({children}) => {

	const [isCollapsed, setCollapsed] = useState(true);

	return (
	   <UserContext.Provider value={{isCollapsed,setCollapsed}}>
			{children}

		 </UserContext.Provider>
	)
}
