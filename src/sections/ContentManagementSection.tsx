
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Heart, DollarSign, Video, Image, Edit, Trash } from "lucide-react";

// Données fictives pour les contenus
const contentItems = [
  { 
    id: 1, 
    title: "Session exclusive plage privée", 
    type: "video", 
    duration: "12:45", 
    views: 1250, 
    engagement: 94, 
    revenue: 820,
    date: "2023-07-15" 
  },
  { 
    id: 2, 
    title: "Séance photo lingerie édition limitée", 
    type: "gallery", 
    count: 24, 
    views: 980, 
    engagement: 88, 
    revenue: 645,
    date: "2023-08-03" 
  },
  { 
    id: 3, 
    title: "Behind the scenes - Monaco", 
    type: "video", 
    duration: "08:32", 
    views: 745, 
    engagement: 76, 
    revenue: 380,
    date: "2023-08-12" 
  },
  { 
    id: 4, 
    title: "Q&R intime - vos questions", 
    type: "video", 
    duration: "24:18", 
    views: 1540, 
    engagement: 96, 
    revenue: 1250,
    date: "2023-08-25" 
  },
  { 
    id: 5, 
    title: "Collection été - aperçu exclusif", 
    type: "gallery", 
    count: 18, 
    views: 890, 
    engagement: 82, 
    revenue: 520,
    date: "2023-09-05" 
  },
];

const ContentManagementSection: React.FC = () => {
  return (
    <section className="bg-black text-white p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">
          Gestion de <span className="text-brand-red">C</span>ontenu
        </h2>
        <p className="text-muted-foreground mt-1">
          Organisez et optimisez votre catalogue
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Video className="mr-2 h-5 w-5 text-brand-red" />
                <span className="text-sm font-medium">Vidéos</span>
              </div>
              <span className="text-xl font-bold">48</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image className="mr-2 h-5 w-5 text-brand-red" />
                <span className="text-sm font-medium">Photos</span>
              </div>
              <span className="text-xl font-bold">156</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-brand-red" />
                <span className="text-sm font-medium">J'aime</span>
              </div>
              <span className="text-xl font-bold">12.4k</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-brand-red" />
                <span className="text-sm font-medium">Gains/Média</span>
              </div>
              <span className="text-xl font-bold">54€</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Contenu Récent</CardTitle>
          <CardDescription className="text-muted-foreground">
            Gérez et analysez vos dernières publications
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Vues</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Revenus</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {item.type === "video" ? (
                        <>
                          <Video className="h-4 w-4 mr-1" />
                          <span>{item.duration}</span>
                        </>
                      ) : (
                        <>
                          <Image className="h-4 w-4 mr-1" />
                          <span>{item.count} photos</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {item.views}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {item.engagement}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {item.revenue}€
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <button className="text-muted-foreground hover:text-white transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-muted-foreground hover:text-brand-red transition-colors">
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Optimisation de Contenu</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Contenus à Rafraîchir</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Contenus dont l'engagement diminue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-sm">• Série "Soirée à Paris" - 65 jours</li>
                <li className="text-sm">• Photos "Studio noir & blanc" - 48 jours</li>
                <li className="text-sm">• Vidéo "Morning routine" - 32 jours</li>
              </ul>
              <button className="mt-3 w-full text-xs text-center py-1 bg-muted hover:bg-muted/80 rounded transition-colors">
                Voir les suggestions
              </button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Bundles Suggérés</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Combinaisons optimales pour vos contenus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-sm">• Collection "Été" + "Plage privée"</li>
                <li className="text-sm">• Série "Lingerie" + "Behind the scenes"</li>
                <li className="text-sm">• Best of "2023" (15 médias)</li>
              </ul>
              <button className="mt-3 w-full text-xs text-center py-1 bg-muted hover:bg-muted/80 rounded transition-colors">
                Créer un bundle
              </button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Performance Tags</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Tags générant le plus d'engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <span className="bg-muted px-2 py-1 rounded text-xs">lingerie (+85%)</span>
                <span className="bg-muted px-2 py-1 rounded text-xs">plage (+64%)</span>
                <span className="bg-muted px-2 py-1 rounded text-xs">exclusif (+56%)</span>
                <span className="bg-muted px-2 py-1 rounded text-xs">voyage (+43%)</span>
                <span className="bg-muted px-2 py-1 rounded text-xs">intime (+41%)</span>
                <span className="bg-muted px-2 py-1 rounded text-xs">q&r (+37%)</span>
              </div>
              <button className="mt-3 w-full text-xs text-center py-1 bg-muted hover:bg-muted/80 rounded transition-colors">
                Analyse complète
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContentManagementSection;
