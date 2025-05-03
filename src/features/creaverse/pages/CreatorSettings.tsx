
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Save, Image } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import { fetchPerformerData } from "../api/performers";
import { PerformerData } from "../types/performer";
import ProfileAvatar from "../components/creator/ProfileAvatar";
import ProfileSettingsModal from "../components/charts/modals/ProfileSettingsModal";

const CreatorSettings: React.FC = () => {
  const { performerId } = useParams<{ performerId: string }>();
  const [performer, setPerformer] = useState<PerformerData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    description: "",
    showRevenue: true,
    allowMessages: true,
    contentLayout: "grid",
    profileVisibility: "public"
  });
  
  useEffect(() => {
    const loadPerformerData = async () => {
      try {
        setLoading(true);
        const data = await fetchPerformerData(performerId || "1");
        setPerformer(data);
        
        // Initialize form with performer data
        setFormData({
          displayName: data.displayName,
          username: data.username,
          description: data.description || "",
          showRevenue: true,
          allowMessages: true,
          contentLayout: "grid",
          profileVisibility: "public"
        });
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast.error("Impossible de charger les données du créateur");
      } finally {
        setLoading(false);
      }
    };
    
    loadPerformerData();
  }, [performerId]);
  
  // Check if user is authorized
  useEffect(() => {
    if (!loading && performer && currentUser) {
      if (currentUser.uid !== performer.id.toString()) {
        toast.error("Vous n'êtes pas autorisé à accéder à ces paramètres");
        navigate(`/performer/${performerId}`);
      }
    }
  }, [loading, performer, currentUser, navigate, performerId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Paramètres sauvegardés avec succès");
    // Implémenter la sauvegarde des données
  };

  const handleProfileSave = (data: any) => {
    console.log("Saving profile data:", data);
    setFormData(prev => ({
      ...prev,
      displayName: data.name,
      username: data.username,
      description: data.bio
    }));
    toast.success("Profil mis à jour avec succès");
  };
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }
  
  if (!performer) {
    return <div className="flex items-center justify-center min-h-screen">Créateur non trouvé</div>;
  }
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-black'}`}>
      <header className={`sticky top-0 z-10 p-4 ${theme === 'light' ? 'bg-white' : 'bg-zinc-900'} border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate(`/performer/${performerId}`)} className="mr-2">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold">Paramètres du profil</h1>
          </div>
          <Button onClick={handleSubmit}>
            <Save size={16} className="mr-2" />
            Sauvegarder
          </Button>
        </div>
      </header>
      
      <div className="container mx-auto p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profil</CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setProfileModalOpen(true)}
              >
                Modifier le profil
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <ProfileAvatar
                    image={performer.image}
                    displayName={performer.displayName}
                    size="xl"
                    status="online"
                  />
                  <Button 
                    variant="secondary" 
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                    type="button"
                  >
                    <Image size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Nom d'affichage</Label>
                  <Input 
                    id="displayName" 
                    name="displayName" 
                    value={formData.displayName} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Nom d'utilisateur</Label>
                  <Input 
                    id="username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Préférences d'affichage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="showRevenue" className="flex-1">Afficher les revenus</Label>
                <Switch 
                  id="showRevenue" 
                  checked={formData.showRevenue} 
                  onCheckedChange={(checked) => handleSwitchChange('showRevenue', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="allowMessages" className="flex-1">Autoriser les messages</Label>
                <Switch 
                  id="allowMessages" 
                  checked={formData.allowMessages} 
                  onCheckedChange={(checked) => handleSwitchChange('allowMessages', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentLayout">Mise en page par défaut</Label>
                <Select
                  value={formData.contentLayout}
                  onValueChange={(value) => handleSelectChange('contentLayout', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Disposition du contenu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grille</SelectItem>
                    <SelectItem value="masonry">Mosaïque</SelectItem>
                    <SelectItem value="featured">Avec mise en avant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profileVisibility">Visibilité du profil</Label>
                <Select
                  value={formData.profileVisibility}
                  onValueChange={(value) => handleSelectChange('profileVisibility', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Visibilité du profil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="subscribers">Abonnés uniquement</SelectItem>
                    <SelectItem value="private">Privé (sur invitation)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit">
              <Save size={16} className="mr-2" />
              Sauvegarder les modifications
            </Button>
          </div>
        </form>
      </div>

      {/* Modal de paramètres de profil */}
      <ProfileSettingsModal
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
        initialData={{
          name: formData.displayName,
          username: formData.username,
          bio: formData.description,
          avatar: performer.image || "",
          coverImage: performer.coverImage || "",
        }}
        onSave={handleProfileSave}
      />
    </div>
  );
};

export default CreatorSettings;
