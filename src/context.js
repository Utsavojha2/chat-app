import React, { useState, useEffect, useContext} from 'react'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [sidebarMenuOpen, setSidebarMenuOpen] = useState(false);
    const [currentChatID, setCurrentChatID] = useState(null)
    const [totalUsers, setTotalUsers] = useState([]);


    useEffect(() => {
        setSidebarMenuOpen(false);
    }, [currentChatID])

  return (
    <AppContext.Provider value={{
      sidebarMenuOpen, 
      setSidebarMenuOpen,
      currentChatID, 
      setCurrentChatID,
      totalUsers, 
      setTotalUsers
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)

export { AppContext, AppProvider }

export default AppProvider;
