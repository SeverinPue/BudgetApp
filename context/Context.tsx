import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Expense = {
    id: string;
    title: string;
    category: string;
    amount: number;
    date: string;
    description?: string;
};

type Settings = {
    showDecimals: boolean;
    roundAmounts: boolean;
};

type BudgetContextType = {
    expenses: Expense[];
    settings: Settings;
    addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
    updateSetting: (key: keyof Settings, value: boolean) => void;
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: ReactNode }) {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const [settings, setSettings] = useState<Settings>({
        showDecimals: true,
        roundAmounts: false,
    });

    const addExpense = (newExpense: Omit<Expense, 'id' | 'date'>) => {
        const expense: Expense = {
            ...newExpense,
            id: Math.random().toString(36).substring(2, 9),
            date: new Date().toLocaleDateString('de-CH'),
        };
        setExpenses((prev) => [expense, ...prev]);
    };

    const updateSetting = (key: keyof Settings, value: boolean) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <BudgetContext.Provider value={{ expenses, settings, addExpense, updateSetting }}>
            {children}
        </BudgetContext.Provider>
    );
}

export function useBudget() {
    const context = useContext(BudgetContext);
    if (!context) throw new Error('useBudget muss innerhalb eines BudgetProviders verwendet werden');
    return context;
}