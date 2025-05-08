
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TripleShield from '@/components/protection/TripleShield';
import GenuineBadge from '@/components/verification/GenuineBadge';
import ContentAuthenticityBadge from '@/components/verification/ContentAuthenticityBadge';
import { VerificationLevel } from '@/services/genuineVerification';
import { useImmersiveMode } from '@/hooks/useImmersiveMode';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LockKeyhole, Shield, BadgeCheck, FileCheck, Eye, Fingerprint, Siren } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OptimizedVideoPlayer from '@/components/OptimizedVideoPlayer';

/**
 * Page de démonstration des fonctionnalités de sécurité
 * Présente Triple Shield™ et GENUINE™
 */
const SecurityDemo: React.FC = () => {
  const { isImmersive, toggleImmersive } = useImmersiveMode();
  const [activeTab, setActiveTab] = useState('tripleShield');
  
  // Simulation de données vidéo pour la démonstration
  const demoVideo = {
    id: 123,
    title: "Vidéo de démonstration",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Démonstration de Sécurité XDose</h1>
        <p className="text-muted-foreground mb-8">
          Découvrez nos solutions exclusives pour protéger le contenu des créateurs et garantir l'authenticité.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="tripleShield">Triple Shield™</TabsTrigger>
            <TabsTrigger value="genuine">GENUINE™</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tripleShield">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-brand-red" />
                      <span>Triple Shield™ Protection</span>
                    </CardTitle>
                    <CardDescription>
                      Un système de protection à trois niveaux pour le contenu des créateurs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm">
                      Notre technologie exclusive Triple Shield™ protège le contenu des créateurs contre la copie non autorisée 
                      avec trois niveaux de protection:
                    </p>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Niveau</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium flex items-center gap-2">
                            <LockKeyhole className="h-4 w-4 text-blue-500" />
                            <span>Filigranes Dynamiques</span>
                          </TableCell>
                          <TableCell>
                            Filigranes invisibles qui apparaissent lors des captures d'écran, intégrant 
                            l'identifiant de l'utilisateur et un horodatage.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium flex items-center gap-2">
                            <Eye className="h-4 w-4 text-amber-500" />
                            <span>Détection de Captures</span>
                          </TableCell>
                          <TableCell>
                            Détection des tentatives de capture d'écran, d'enregistrement ou 
                            de copie du contenu.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium flex items-center gap-2">
                            <Fingerprint className="h-4 w-4 text-green-500" />
                            <span>Contrôle d'Accès Avancé</span>
                          </TableCell>
                          <TableCell>
                            Authentification multi-facteurs et contrôles d'accès basés sur la localisation pour 
                            le contenu premium.
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    
                    <div className="mt-6">
                      <p className="text-sm font-semibold mb-2">Démonstration:</p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Essayez de faire une capture d'écran de la vidéo ci-dessous pour voir la protection en action.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleImmersive()}
                        className="mb-4"
                      >
                        {isImmersive ? 'Désactiver' : 'Activer'} le mode immersif
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <TripleShield
                  contentId="demo-123"
                  creatorId="creator-456"
                  showControls={true}
                >
                  <OptimizedVideoPlayer
                    src={demoVideo.src}
                    poster={demoVideo.poster}
                    title={demoVideo.title}
                    id={demoVideo.id}
                  />
                </TripleShield>
                
                <div className="mt-4 text-xs text-muted-foreground">
                  <p className="mb-2">Technologies utilisées:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Filigranes dynamiques avec rotation périodique</li>
                    <li>Détection de captures d'écran (via visibilitychange et keydown)</li>
                    <li>Intégration d'identifiants uniques et horodatages</li>
                    <li>Protection contre la sélection et le copier-coller</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="genuine">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BadgeCheck className="h-5 w-5 text-brand-red" />
                      <span>Système GENUINE™</span>
                    </CardTitle>
                    <CardDescription>
                      Garantie d'authenticité pour les créateurs et leur contenu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm">
                      Le système GENUINE™ permet aux utilisateurs de distinguer facilement les créateurs vérifiés 
                      et le contenu authentique, éliminant les risques de contrefaçon ou d'usurpation d'identité.
                    </p>
                    
                    <p className="text-sm font-semibold mb-3">Niveaux de vérification:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      <div className="flex items-center gap-2 p-2 rounded border">
                        <GenuineBadge level={VerificationLevel.BASIC} showTooltip={false} />
                        <div>
                          <p className="font-medium text-sm">Basique</p>
                          <p className="text-xs text-muted-foreground">Email et téléphone vérifiés</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 rounded border">
                        <GenuineBadge level={VerificationLevel.VERIFIED} showTooltip={false} />
                        <div>
                          <p className="font-medium text-sm">Vérifié</p>
                          <p className="text-xs text-muted-foreground">Identité confirmée</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 rounded border">
                        <GenuineBadge level={VerificationLevel.GENUINE} showTooltip={false} />
                        <div>
                          <p className="font-medium text-sm">GENUINE™</p>
                          <p className="text-xs text-muted-foreground">Certification complète</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 rounded border">
                        <GenuineBadge level={VerificationLevel.PARTNER} showTooltip={false} />
                        <div>
                          <p className="font-medium text-sm">Partenaire</p>
                          <p className="text-xs text-muted-foreground">Partenaire officiel XDose</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <FileCheck className="h-5 w-5 text-green-500" />
                      <p className="text-sm font-medium">Certification de contenu</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Chaque contenu vérifié reçoit un certificat d'authenticité unique qui peut 
                      être validé par les spectateurs. Cela garantit que le contenu provient bien 
                      du créateur vérifié et n'a pas été modifié.
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Siren className="h-5 w-5 text-red-500" />
                      <p className="text-sm font-medium">Protection contre l'usurpation</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Le système GENUINE™ lutte activement contre les faux comptes et l'usurpation d'identité, 
                      protégeant à la fois les créateurs et leur public.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Exemple de badge de vérification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-8 justify-around mb-6">
                      <div className="text-center">
                        <GenuineBadge level={VerificationLevel.BASIC} size="lg" />
                        <p className="mt-2 text-xs text-muted-foreground">Basique</p>
                      </div>
                      <div className="text-center">
                        <GenuineBadge level={VerificationLevel.VERIFIED} size="lg" />
                        <p className="mt-2 text-xs text-muted-foreground">Vérifié</p>
                      </div>
                      <div className="text-center">
                        <GenuineBadge level={VerificationLevel.GENUINE} size="lg" />
                        <p className="mt-2 text-xs text-muted-foreground">GENUINE™</p>
                      </div>
                    </div>
                    
                    <p className="text-sm">
                      Cliquez sur un badge pour voir les détails de vérification.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contenu authentifié</CardTitle>
                    <CardDescription>
                      Exemple de certification d'authenticité d'une vidéo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContentAuthenticityBadge 
                      contentId={123} 
                      creatorId={456}
                      showDetails={true}
                    />
                    
                    <p className="mt-4 text-xs text-muted-foreground">
                      Les certificats GENUINE™ sont générés pour chaque contenu vérifié 
                      et sont uniques à chaque visualisation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Avantages pour les créateurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">Protection du contenu</h4>
                <p className="text-sm text-muted-foreground">
                  Triple Shield™ protège votre contenu de la distribution non autorisée, 
                  préservant sa valeur et son exclusivité.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">Crédibilité renforcée</h4>
                <p className="text-sm text-muted-foreground">
                  Les badges GENUINE™ renforcent votre crédibilité et la confiance de votre 
                  audience, vous démarquant des créateurs non vérifiés.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">Valorisation du contenu</h4>
                <p className="text-sm text-muted-foreground">
                  L'authenticité certifiée vous permet d'augmenter la valeur de votre contenu 
                  et de justifier des tarifs premium.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecurityDemo;
