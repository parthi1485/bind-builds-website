'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { packages } from '@/lib/site';

type Planner = {
  area: string;
  setArea: (area: string) => void;
  tier: number;
  setTier: (tier: number) => void;
};
const PlannerContext = createContext<Planner | null>(null);

export function PackagePlannerProvider({ children }: { children: ReactNode }) {
  const [area, setArea] = useState('1600');
  const [tier, setTier] = useState(1);
  return <PlannerContext.Provider value={{ area, setArea, tier, setTier }}>{children}</PlannerContext.Provider>;
}

export function usePackagePlanner() {
  const planner = useContext(PlannerContext);
  if (!planner) throw new Error('Package planner needs its page provider');
  const amount = Number(planner.area);
  const valid = Number.isInteger(amount) && amount >= 1 && amount <= 100000;
  const selected = packages[planner.tier];
  const estimateUrl = '/cost-calculator?package=' + selected.name + '&area=' + amount;
  return { ...planner, amount, valid, selected, estimateUrl };
}
