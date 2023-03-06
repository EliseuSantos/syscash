import React, { createContext, useState, Dispatch, SetStateAction } from 'react'
import { useContext } from 'react'

export type ContextStore = {
  notes: never[]
  setNotes: Dispatch<SetStateAction<never[]>>
  onCancel: null | (() => any)
  setOnCancel: Dispatch<SetStateAction<null | (() => any)>>
  onConfirm: null | (() => any)
  setOnConfirm: Dispatch<SetStateAction<null | (() => any)>>
  onBack: null | (() => any)
  setOnBack: Dispatch<SetStateAction<null | (() => any)>>
}

const StoreContext = createContext<ContextStore>({
  notes: [],
  setNotes: () => null,
  onCancel: null,
  setOnCancel: () => null,
  onConfirm: null,
  setOnConfirm: () => null,
  onBack: null,
  setOnBack: () => null
});

export const useStore = () => useContext(StoreContext);

export const Provider: React.FC = ({ children }) => {
  const [onCancel, setOnCancel] = useState<null | (() => any)>(() => null);
  const [onConfirm, setOnConfirm] = useState<null | (() => any)>(() => null);
  const [onBack, setOnBack] = useState<null | (() => any)>(() => null);
  const [notes, setNotes] = useState([]);

  const value = {
    onCancel,
    setOnCancel,
    onConfirm,
    setOnConfirm,
    onBack,
    setOnBack,
    notes,
    setNotes
  }

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
