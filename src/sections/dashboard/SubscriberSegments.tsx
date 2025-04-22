
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";

const subscriberSegments = [
  { segment: "Nouveaux", count: 240, growth: 12.5 },
  { segment: "Fidèles", count: 380, growth: 5.2 },
  { segment: "Super-fans", count: 120, growth: 8.7 },
  { segment: "Inactifs", count: 75, growth: -2.3 },
  { segment: "À risque", count: 45, growth: -6.8 },
];

const SubscriberSegments = () => {
  const [analyzeSegment, setAnalyzeSegment] = useState<string | null>(null);
  
  const handleAnalyzeSegment = (segment: string) => {
    setAnalyzeSegment(segment);
    toast.success(`Analyse du segment ${segment} lancée`, {
      description: "Les résultats seront disponibles dans quelques secondes"
    });
    
    setTimeout(() => setAnalyzeSegment(null), 2000);
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Segmentation des Abonnés</h2>
      <Card className="bg-card border-border card-hover hover-card micro-pop">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="data-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Segment</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Croissance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriberSegments.map((segment) => (
                  <TableRow key={segment.segment} className={analyzeSegment === segment.segment ? 'micro-animation-success' : ''}>
                    <TableCell className="font-medium">{segment.segment}</TableCell>
                    <TableCell>{segment.count}</TableCell>
                    <TableCell>
                      <div className={`flex items-center ${segment.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {segment.growth >= 0 ? (
                          <ArrowUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(segment.growth)}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <button 
                        className="text-brand-red hover:underline text-sm micro-animation-pop"
                        onClick={() => handleAnalyzeSegment(segment.segment)}
                      >
                        Analyser
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SubscriberSegments;
