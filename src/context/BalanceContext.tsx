"use client";

// IMPORTS
import { ReactNode, createContext, useContext, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// SERVICES
import { getUserCookie } from "@/services/session";
import { BalanceProps } from "@/@types/balance.type";
import { db } from "@/services/firebase";

// COMPONENTS
import { toast } from "@/components/ui/use-toast";

interface BalanceContextData {
  isLoading: boolean;
  balance: BalanceProps[];

  setIsLoading: (value: boolean) => void;
  getBalanceByUserId: () => void;
  getBalanceById: (id: string) => void;
}

const BalanceContext = createContext<BalanceContextData>({
  isLoading: false,
  balance: [],

  setIsLoading: () => {},
  getBalanceByUserId: () => {},
  getBalanceById: () => {},
});

function BalanceProvider({ children }: { children: ReactNode }) {
  const userCookie = getUserCookie();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<BalanceProps[]>([]);

  async function getBalanceByUserId() {
    try {
      setIsLoading(true);
      const balancesCollectionRef = collection(db, "balance");
      const querySnapshot = await getDocs(balancesCollectionRef);

      const arrayBalance: BalanceProps[] = [];
      querySnapshot.forEach((doc) => {
        arrayBalance.push(doc.data() as BalanceProps);
      });

      const formatBalance = arrayBalance.map((item) => {
        return {
          ...item,
          initialValue: item.initialValue.toFixed(2),
          remainingValue: item.remainingValue.toFixed(2),
          usedValue: item.initialValue - item.remainingValue,
        };
      });

      console.log("formatBalance ", formatBalance);

      setIsLoading(false);
      setBalance(formatBalance);
    } catch (error) {
      setIsLoading(false);
      setBalance([]);
    }
  }

  async function getBalanceById(id: string): Promise<BalanceProps | null> {
    try {
      const docRef = doc(db, "balance", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as BalanceProps;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter dados:", error);
      throw error;
    }
  }

  return (
    <BalanceContext.Provider
      value={{
        isLoading,
        balance,

        setIsLoading,
        getBalanceByUserId,
        getBalanceById,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

const useBalance = () => useContext(BalanceContext);

export { BalanceProvider, useBalance };
