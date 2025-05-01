
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Camera,
  Video,
  PlusCircle,
  MessageCircle
} from "lucide-react";

const CalendarView = () => {
  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Session photo",
      date: "2025-05-15",
      time: "14:00 - 16:30",
      type: "photo",
      attendees: 0,
      description: "Session photos pour la nouvelle collection d'été"
    },
    {
      id: 2,
      title: "Live Q&A avec les fans",
      date: "2025-05-15",
      time: "20:00 - 21:30",
      type: "live",
      attendees: 230,
      description: "Session interactive avec mes abonnés pour répondre à leurs questions"
    },
    {
      id: 3,
      title: "Lancement Collection Été",
      date: "2025-05-22",
      time: "12:00",
      type: "release",
      attendees: 0,
      description: "Lancement de ma nouvelle collection de photos exclusives pour mes abonnés premium"
    },
    {
      id: 4,
      title: "Vidéo collaboration",
      date: "2025-05-25",
      time: "13:00 - 17:00",
      type: "video",
      attendees: 0,
      description: "Tournage d'une vidéo en collaboration avec @marieclaire"
    }
  ];

  // Current month dates
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    // Mock: Only days 15, 22, and 25 have events in this example
    return events.filter(event => {
      const eventDay = parseInt(event.date.split('-')[2]);
      return eventDay === day;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendrier</h1>
            <p className="text-gray-600 dark:text-gray-300">Gérez vos événements et planifiez votre contenu</p>
          </div>
          
          <div className="flex gap-2">
            <Button className="bg-pink-600 hover:bg-pink-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvel événement
            </Button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold">Mai 2025</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                Aujourd'hui
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="month">
              <div className="flex justify-center mb-4">
                <TabsList>
                  <TabsTrigger value="month">Mois</TabsTrigger>
                  <TabsTrigger value="week">Semaine</TabsTrigger>
                  <TabsTrigger value="day">Jour</TabsTrigger>
                  <TabsTrigger value="list">Liste</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="month" className="mt-0">
                {/* Days of the week headers */}
                <div className="grid grid-cols-7 mb-2">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                    <div key={day} className="py-2 text-center font-medium text-sm">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar grid - simplified, showing only relevant days */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before the 1st */}
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={`empty-start-${i}`} className="h-24 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800/50 rounded-md"></div>
                  ))}
                  
                  {/* Actual days in month */}
                  {daysInMonth.map((day) => {
                    const dayEvents = getEventsForDay(day);
                    const hasEvents = dayEvents.length > 0;
                    const isToday = day === 14; // Mock: today is the 14th
                    
                    return (
                      <div 
                        key={day}
                        className={`h-24 p-1 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden ${
                          isToday ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500' : 'bg-white dark:bg-zinc-800'
                        }`}
                      >
                        <div className={`text-right mb-1 ${
                          isToday ? 'font-bold text-blue-600' : ''
                        }`}>
                          {day}
                        </div>
                        
                        {/* Event indicators */}
                        <div className="space-y-1">
                          {hasEvents && dayEvents.slice(0, 2).map((event) => {
                            let bgColor = "";
                            let icon = null;
                            
                            switch (event.type) {
                              case "photo":
                                bgColor = "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
                                icon = <Camera className="h-3 w-3" />;
                                break;
                              case "live":
                                bgColor = "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
                                icon = <MessageCircle className="h-3 w-3" />;
                                break;
                              case "release":
                                bgColor = "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
                                icon = <PlusCircle className="h-3 w-3" />;
                                break;
                              case "video":
                                bgColor = "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
                                icon = <Video className="h-3 w-3" />;
                                break;
                              default:
                                bgColor = "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
                            }
                            
                            return (
                              <div 
                                key={event.id}
                                className={`px-1 py-0.5 rounded text-xs font-medium truncate flex items-center ${bgColor}`}
                              >
                                {icon && <span className="mr-1">{icon}</span>}
                                {event.title}
                              </div>
                            );
                          })}
                          
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 pl-1">
                              +{dayEvents.length - 2} plus
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Empty cells for days after the last day */}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={`empty-end-${i}`} className="h-24 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800/50 rounded-md"></div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="week">
                <div className="text-center py-12 text-gray-500">
                  Vue semaine disponible dans la version pro
                </div>
              </TabsContent>
              
              <TabsContent value="day">
                <div className="text-center py-12 text-gray-500">
                  Vue journalière disponible dans la version pro
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-0">
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className={`h-1 ${
                        event.type === 'photo' ? 'bg-green-500' :
                        event.type === 'live' ? 'bg-red-500' :
                        event.type === 'release' ? 'bg-purple-500' :
                        'bg-blue-500'
                      }`}></div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              {event.date.split('-')[2]} Mai 2025
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              {event.time}
                            </div>
                            {event.attendees > 0 && (
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Users className="h-4 w-4 mr-1" />
                                {event.attendees} inscrits
                              </div>
                            )}
                            <p className="text-sm mt-2">{event.description}</p>
                          </div>
                          
                          <Badge className={`${
                            event.type === 'photo' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                            event.type === 'live' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                            event.type === 'release' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                          }`}>
                            {event.type === 'photo' ? 'Photo' :
                             event.type === 'live' ? 'Live' :
                             event.type === 'release' ? 'Lancement' :
                             'Vidéo'}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">Modifier</Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Supprimer</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-pink-500" />
              Événements à venir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="flex gap-4">
                  <div className="text-center min-w-16">
                    <div className={`p-2 rounded-lg font-bold ${
                      event.type === 'photo' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                      event.type === 'live' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                      event.type === 'release' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      <div className="text-xs">MAI</div>
                      <div className="text-xl">{event.date.split('-')[2]}</div>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{event.time}</p>
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                    
                    {event.attendees > 0 && (
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {event.attendees} inscrits
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Badge className={`${
                      event.type === 'photo' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                      event.type === 'live' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                      event.type === 'release' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                    }`}>
                      {event.type === 'photo' ? 'Photo' :
                      event.type === 'live' ? 'Live' :
                      event.type === 'release' ? 'Lancement' :
                      'Vidéo'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarView;
