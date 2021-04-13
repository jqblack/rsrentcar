import React, {createContext, useState} from 'react';

export const AppContext = createContext();

export function AppContextProvider({children}) {
  const [user, setUser] = useState({
    nombre: 'pepito',
    ID_tipoUsuario: 2,
    ID:2
  });

  return (
    <AppContext.Provider value={{user, setUser}}>
      {children}
    </AppContext.Provider>
  );
}
