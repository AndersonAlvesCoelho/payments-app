"use client";

// IMPORTS
import { ReactNode, createContext, useContext, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

// SERVICES
import { getUserCookie } from "@/services/session";
import { db } from "@/services/firebase";

// COMPONENTS
import { toast } from "@/components/ui/use-toast";
import { PaymentProps } from "@/@types/payment.type";

interface PaymentContextData {
  isLoading: boolean;
  isOpenDelete: boolean;
  isOpenEdit: boolean;

  payments: PaymentProps[];
  paymentForId: PaymentProps | null;

  setIsLoading: (value: boolean) => void;
  setIsOpenDelete: (value: boolean) => void;
  setIsOpenEdit: (value: boolean) => void;

  getPaymentByUserId: () => void;
  getPaymentById: (documentId: string) => Promise<boolean>;
  createPayment: (value: PaymentProps) => Promise<boolean>;
  editPayment: (value: PaymentProps, documentId: string) => Promise<boolean>;
  deletePaymentById: (documentId: string) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextData>({
  isLoading: false,
  isOpenEdit: false,
  isOpenDelete: false,

  payments: [],
  paymentForId: null,

  setIsLoading: () => {},
  setIsOpenDelete: () => {},
  setIsOpenEdit: () => {},

  getPaymentByUserId: () => {},
  getPaymentById: () => Promise.resolve(false),
  createPayment: () => Promise.resolve(false),
  editPayment: () => Promise.resolve(false),
  deletePaymentById: () => Promise.resolve(false),
});

function PaymentProvider({ children }: { children: ReactNode }) {
  const userCookie = getUserCookie();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [payments, setBalances] = useState<PaymentProps[]>([]);
  const [paymentForId, setPaymentForId] = useState<PaymentProps | null>(null);

  async function getPaymentByUserId() {
    try {
      setIsLoading(true);

      const balancesCollectionRef = collection(db, "payments");
      const querySnapshot = await getDocs(balancesCollectionRef);

      const formatBalance: PaymentProps[] = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          const payment: PaymentProps = {
            documentId: doc.id,
            name: data.name,
            description: data.description,
            userId: data.userId,
            price: data.price,
          };

          return payment;
        })
        .filter((bal) => bal.userId === userCookie?.uid);

      setIsLoading(false);
      setBalances(formatBalance);
    } catch (error) {
      setIsLoading(false);
      setBalances([]);
    }
  }

  async function getPaymentById(documentId: string) {
    try {
      setIsLoading(true);

      const docRef = doc(db, "payments", documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const payment = {
          ...docSnap.data(),
          documentId: docSnap.id,
          price: docSnap.data().price.toString().replace(".", ","),
        } as PaymentProps;
        setPaymentForId(payment);
        return true;
      } else {
        setPaymentForId(null);
        return false;
      }
    } catch (error) {
      setPaymentForId(null);
      return false;
    }
  }

  async function createPayment(payment: PaymentProps): Promise<boolean> {
    try {
      const balancesCollectionRef = collection(db, "payments");
      await addDoc(balancesCollectionRef, payment);

      setBalances([payment, ...payments]);
      toast({
        title: "Sucesso: pagamento registro .",
        description: "O pagamento foi cadastrado com sucesso!",
      });
      return true;
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Aviso: erro ao registro o pagamento.",
        description:
          "Não foi possivel registrar o pagamento. Tente novamente mais tarde.",
      });
      return false;
    }
  }

  async function editPayment(
    updatedData: PaymentProps,
    documentId: string
  ): Promise<boolean> {
    try {
      const docRef = doc(db, "payments", documentId);
      await updateDoc(docRef, updatedData as { [key: string]: any });

      setBalances((currentBalance) =>
        currentBalance.map((item) =>
          item.documentId === updatedData.documentId ? { ...updatedData } : item
        )
      );

      toast({
        title: "Sucesso: Pagamento autalizado",
        description: "O pagamento foi atualizado com sucesso!",
      });

      return true;
    } catch (error) {
      console.error("Erro ao buscar documento: ", error);

      toast({
        variant: "destructive",
        title: "Aviso: Erro ao atualizar.",
        description: "Não foi possível atualizar o pagamento.",
      });

      return false;
    }
  }

  async function deletePaymentById(documentId: string): Promise<boolean> {
    try {
      const docRef = doc(db, "payments", documentId);
      await deleteDoc(docRef);
      setBalances((currentBalances) =>
        currentBalances.filter((payment) => payment.documentId !== documentId)
      );
      toast({
        title: "Sucesso",
        description: "O pagamento foi excluído com sucesso!",
      });

      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: "Não foi possível excluir o pagamento.",
      });

      return false;
    }
  }

  return (
    <PaymentContext.Provider
      value={{
        isLoading,
        isOpenEdit,
        isOpenDelete,

        payments,
        paymentForId,

        setIsOpenDelete,
        setIsLoading,
        setIsOpenEdit,

        getPaymentByUserId,
        getPaymentById,
        createPayment,
        editPayment,
        deletePaymentById,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

const usePayment = () => useContext(PaymentContext);

export { PaymentProvider, usePayment };
