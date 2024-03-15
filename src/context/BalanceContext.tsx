"use client";

// IMPORTS
import { ReactNode, createContext, useContext, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

// SERVICES
import { getUserCookie } from "@/services/session";
import { BalanceProps } from "@/@types/balance.type";
import { db } from "@/services/firebase";

// COMPONENTS
import { toast } from "@/components/ui/use-toast";

interface BalanceContextData {
  isLoading: boolean;
  balances: BalanceProps[];
  balanceForId: BalanceProps | null;
  isOpenEdit: boolean;

  setIsLoading: (value: boolean) => void;
  setIsOpenEdit: (value: boolean) => void;

  getBalanceByUserId: () => void;
  getBalanceById: (documentId: string) => Promise<boolean>;
  createBalance: (value: BalanceProps) => Promise<boolean>;
  editBalance: (value: BalanceProps, documentId: string) => Promise<boolean>;
}

const BalanceContext = createContext<BalanceContextData>({
  isLoading: false,
  balances: [],
  balanceForId: null,
  isOpenEdit: false,

  setIsLoading: () => {},
  setIsOpenEdit: () => {},
  getBalanceByUserId: () => {},
  getBalanceById: () => Promise.resolve(false),
  createBalance: () => Promise.resolve(false),
  editBalance: () => Promise.resolve(false),
});

function BalanceProvider({ children }: { children: ReactNode }) {
  const userCookie = getUserCookie();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [balances, setBalances] = useState<BalanceProps[]>([]);
  const [balanceForId, setBalanceForId] = useState<BalanceProps | null>(null);

  async function getBalanceByUserId() {
    try {
      setIsLoading(true);

      const balancesCollectionRef = collection(db, "balances");
      const querySnapshot = await getDocs(balancesCollectionRef);

      const formatBalance: BalanceProps[] = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          const balance: BalanceProps = {
            balanceId: doc.id,
            initialValue: data.initialValue,
            remainingValue: data.remainingValue,
            name: data.name,
            description: data.description,
            userId: data.userId,
            usedValue: data.initialValue - data.remainingValue,
          };

          return balance;
        })
        .filter((bal) => bal.userId === userCookie?.uid);

      setIsLoading(false);
      setBalances(formatBalance);
    } catch (error) {
      setIsLoading(false);
      setBalances([]);
    }
  }

  async function getBalanceById(docId: string) {
    try {
      setIsLoading(true);

      const docRef = doc(db, "balances", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const balance = {
          ...docSnap.data(),
          balanceId: docSnap.id,
          initialValue: docSnap
            .data()
            .initialValue.toString()
            .replace(".", ","),
        } as BalanceProps;
        setBalanceForId(balance);
        return true;
      } else {
        setBalanceForId(null);
        return false;
      }
    } catch (error) {
      setBalanceForId(null);
      return false;
    }
  }

  async function createBalance(balance: BalanceProps): Promise<boolean> {
    try {
      const balancesCollectionRef = collection(db, "balances");
      await addDoc(balancesCollectionRef, balance);

      setBalances([...balances, balance]);
      toast({
        title: "Sucesso: saldo registro .",
        description: "O saldo foi cadastrado com sucesso!",
      });
      return true;
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      toast({
        variant: "destructive",
        title: "Aviso: erro ao registro o saldo.",
        description:
          "Não foi possivel registrar o saldo. Tente novamente mais tarde.",
      });
      return false;
    }
  }

  async function editBalance(
    updatedData: BalanceProps,
    documentId: string
  ): Promise<boolean> {
    try {
      console.log("documentId!,  ", documentId);

      const docRef = doc(db, "balances", documentId);
      await updateDoc(docRef, updatedData as { [key: string]: any });

      setBalances((currentBalance) =>
        currentBalance.map((item) =>
          item.balanceId === updatedData.balanceId ? { ...updatedData } : item
        )
      );

      toast({
        title: "Sucesso: Saldo autalizado",
        description: "O saldo foi atualizado com sucesso!",
      });

      return true;
    } catch (error) {
      console.error("Erro ao atualizar o documento: ", error);
      toast({
        variant: "destructive",
        title: "Aviso: Erro ao atualizar.",
        description: "Não foi possível atualizar o saldo.",
      });

      return false;
    }
  }

  return (
    <BalanceContext.Provider
      value={{
        isLoading,
        balances,
        isOpenEdit,
        balanceForId,

        setIsLoading,
        setIsOpenEdit,

        getBalanceByUserId,
        getBalanceById,
        createBalance,
        editBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

const useBalance = () => useContext(BalanceContext);

export { BalanceProvider, useBalance };
