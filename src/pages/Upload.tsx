
import React, { useState } from "react";
import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Upload as UploadIcon, Image, X } from "lucide-react";

const Upload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoUploaded, setVideoUploaded] = useState(false);

  // Simulate a file upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setVideoUploaded(true);
    }
  };

  // Simulate thumbnail upload
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <ContentSection title="Téléverser une vidéo">
          <div className="max-w-3xl mx-auto">
            {!videoUploaded ? (
              <div 
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${dragActive ? 'border-brand-accent bg-brand-accent/10' : 'border-muted hover:border-muted-foreground'}`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  setVideoUploaded(true);
                }}
              >
                <div className="flex flex-col items-center">
                  <UploadIcon className="w-16 h-16 mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-medium mb-2">Glissez et déposez votre fichier vidéo</h3>
                  <p className="text-muted-foreground mb-6">ou</p>
                  <label className="cursor-pointer">
                    <Input
                      type="file" 
                      accept="video/*"
                      className="hidden" 
                      onChange={handleUpload}
                    />
                    <Button type="button">Sélectionner un fichier</Button>
                  </label>
                  <p className="mt-4 text-sm text-muted-foreground">
                    MP4, MOV ou AVI. 8GB maximum.
                  </p>
                </div>
              </div>
            ) : (
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Titre de la vidéo</label>
                  <Input id="title" placeholder="Entrez un titre accrocheur" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Textarea 
                    id="description" 
                    placeholder="Décrivez votre vidéo..." 
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Catégorie</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amateur">Amateur</SelectItem>
                        <SelectItem value="milf">MILF</SelectItem>
                        <SelectItem value="teen">Teen</SelectItem>
                        <SelectItem value="lesbian">Lesbian</SelectItem>
                        <SelectItem value="asian">Asian</SelectItem>
                        <SelectItem value="ebony">Ebony</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <Input placeholder="Séparés par des virgules" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-medium block">Miniature</label>
                  {!thumbnailPreview ? (
                    <label className="border border-dashed rounded-lg p-8 flex flex-col items-center cursor-pointer hover:border-muted-foreground transition-colors">
                      <Image className="w-10 h-10 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Ajouter une miniature personnalisée</p>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleThumbnailUpload}
                      />
                    </label>
                  ) : (
                    <div className="relative inline-block">
                      <img 
                        src={thumbnailPreview} 
                        alt="Miniature" 
                        className="rounded-lg max-h-40 object-cover" 
                      />
                      <button 
                        type="button"
                        onClick={removeThumbnail}
                        className="absolute top-2 right-2 bg-black/70 rounded-full p-1 hover:bg-black"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="premium-content">Contenu Premium</Label>
                      <p className="text-sm text-muted-foreground">Réservé aux abonnés premium</p>
                    </div>
                    <Switch id="premium-content" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="comments">Activer les commentaires</Label>
                      <p className="text-sm text-muted-foreground">Permettre aux utilisateurs de commenter</p>
                    </div>
                    <Switch id="comments" defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline">Annuler</Button>
                  <Button type="submit">Publier la vidéo</Button>
                </div>
              </form>
            )}
          </div>
        </ContentSection>
      </main>
    </div>
  );
};

export default Upload;
