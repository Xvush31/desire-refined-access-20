
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, Clock, Video, Image, Plus, Check } from "lucide-react";

interface ContentSchedulerProps {
  performerId: number;
}

// Sample scheduled content data
const scheduledContent = [
  {
    id: 1,
    title: "Session Exclusive Été",
    date: new Date(2025, 4, 3, 19, 0),
    type: "video",
    status: "scheduled"
  },
  {
    id: 2,
    title: "Photos Exclusives Plage",
    date: new Date(2025, 4, 7, 12, 0),
    type: "gallery",
    status: "scheduled"
  },
  {
    id: 3,
    title: "Q&R Abonnés VIP",
    date: new Date(2025, 4, 10, 20, 30),
    type: "live",
    status: "scheduled"
  }
];

const ContentScheduler: React.FC<ContentSchedulerProps> = ({ performerId }) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-zinc-900';
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Filter content for the selected date
  const getContentForDate = (date: Date | undefined) => {
    if (!date) return [];
    return scheduledContent.filter(
      item => item.date.getDate() === date.getDate() && 
              item.date.getMonth() === date.getMonth() &&
              item.date.getFullYear() === date.getFullYear()
    );
  };
  
  const selectedDateContent = getContentForDate(selectedDate);
  
  // Dates with content
  const contentDates = scheduledContent.map(item => item.date);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Planification de Contenu</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={bgClass}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CalendarDays size={18} className="mr-2 text-brand-red" />
              Calendrier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={fr}
              modifiersStyles={{
                selected: {
                  backgroundColor: '#e91e63',
                  color: 'white',
                  borderRadius: '100%'
                }
              }}
              modifiers={{
                booked: contentDates
              }}
              modifiersClassNames={{
                booked: "border-2 border-pink-500"
              }}
            />
          </CardContent>
        </Card>
        
        <Card className={bgClass}>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate ? (
                <>Programme du {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}</>
              ) : (
                <>Sélectionnez une date</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateContent.length > 0 ? (
              <div className="space-y-4">
                {selectedDateContent.map(content => (
                  <div key={content.id} className="flex items-center p-3 border border-border rounded-lg">
                    {content.type === 'video' ? (
                      <Video size={18} className="mr-3 text-blue-500" />
                    ) : content.type === 'gallery' ? (
                      <Image size={18} className="mr-3 text-green-500" />
                    ) : (
                      <Clock size={18} className="mr-3 text-amber-500" />
                    )}
                    <div className="flex-grow">
                      <p className="font-medium">{content.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(content.date, 'HH:mm', { locale: fr })}
                      </p>
                    </div>
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                      <Check size={14} className="inline mr-1" />
                      Programmé
                    </span>
                  </div>
                ))}
              </div>
            ) : showAddForm ? (
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Titre</label>
                  <input 
                    type="text" 
                    className="border border-border rounded p-2 bg-background" 
                    placeholder="Titre du contenu"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Type de contenu</label>
                  <select className="border border-border rounded p-2 bg-background">
                    <option value="video">Vidéo</option>
                    <option value="gallery">Galerie Photos</option>
                    <option value="live">Live</option>
                  </select>
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Heure</label>
                  <input 
                    type="time" 
                    className="border border-border rounded p-2 bg-background" 
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => setShowAddForm(false)}>
                    Programmer
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <p className="text-muted-foreground mb-4">
                  Aucun contenu programmé pour cette date
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(true)} 
                  className="flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Programmer du contenu
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className={bgClass}>
        <CardHeader>
          <CardTitle className="text-lg">Aperçu de la Semaine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="font-medium">{day}</div>
            ))}
            {Array.from({ length: 7 }).map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() + index);
              const hasContent = scheduledContent.some(
                content => 
                  content.date.getDate() === date.getDate() && 
                  content.date.getMonth() === date.getMonth()
              );
              
              return (
                <div 
                  key={index} 
                  className={`p-2 rounded-md text-center ${
                    hasContent ? 'bg-pink-100 dark:bg-pink-900/30 border border-pink-500' : 'bg-muted/30'
                  }`}
                >
                  <div className="text-sm font-medium">{format(date, 'd')}</div>
                  {hasContent && (
                    <div className="text-xs text-brand-red">
                      {scheduledContent.filter(
                        content => 
                          content.date.getDate() === date.getDate() && 
                          content.date.getMonth() === date.getMonth()
                      ).length} contenu(s)
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentScheduler;
