
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, ArrowUp, ArrowRight, Check } from "lucide-react";

interface SubscriptionTier {
  name: string;
  price: number;
  subscribers: number;
  growth: number;
  revenue: number;
  color: string;
}

interface SubscriptionTiersTableProps {
  tiers: SubscriptionTier[];
}

const SubscriptionTiersTable: React.FC<SubscriptionTiersTableProps> = ({ tiers }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="data-table">
        <TableHeader>
          <TableRow>
            <TableHead>Niveau</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Abonnés</TableHead>
            <TableHead>Croissance</TableHead>
            <TableHead>Revenus</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tiers.map((tier) => (
            <TableRow key={tier.name}>
              <TableCell>
                <div className="flex items-center">
                  <div 
                    className="h-3 w-3 rounded-full mr-2"
                    style={{ backgroundColor: tier.color }}
                  />
                  {tier.name}
                </div>
              </TableCell>
              <TableCell>{tier.price.toFixed(2)}€/mois</TableCell>
              <TableCell>{tier.subscribers}</TableCell>
              <TableCell>
                <div className="flex items-center text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  {tier.growth}%
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {tier.revenue.toFixed(2)}€
                </div>
              </TableCell>
              <TableCell>
                <button className="text-brand-red hover:underline text-sm micro-animation-pop">
                  Modifier
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubscriptionTiersTable;
