"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bus, MapPin, Star, History, ChevronUp, X, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function QuickAccessPanel() {
  const [activeTab, setActiveTab] = useState("routes")
  const [isExpanded, setIsExpanded] = useState(true)

  // Escuchar el evento personalizado para cambiar a la pestaña de favoritos
  useEffect(() => {
    const handleSwitchToFavorites = () => {
      setActiveTab("favorites")
      setIsExpanded(true)
    }

    window.addEventListener("switchToFavorites", handleSwitchToFavorites)
    return () => {
      window.removeEventListener("switchToFavorites", handleSwitchToFavorites)
    }
  }, [])

  const quickRoutes = [
    { id: 1, name: "San José - Heredia", time: "5 min", company: "Transportes La 400" },
    { id: 2, name: "San José - Alajuela", time: "3 min", company: "TUASA" },
    { id: 3, name: "Cartago - San José", time: "8 min", company: "Lumaca" },
  ]

  const favoriteRoutes = [
    { id: 1, name: "San José - Heredia", company: "Transportes La 400", type: "Directo" },
    { id: 2, name: "San José - Alajuela", company: "TUASA", type: "Regular" },
  ]

  const favoriteStops = [
    { id: 1, name: "Terminal San José", address: "Av. Central, Calle 16" },
    { id: 2, name: "Universidad de Costa Rica", address: "San Pedro, San José" },
  ]

  const recentSearches = [
    { id: 1, query: "Terminal San José", type: "parada" },
    { id: 2, query: "San José - Heredia", type: "ruta" },
    { id: 3, query: "TUASA", type: "empresa" },
  ]

  const busStops = [
    { id: 1, name: "Terminal San José", distance: "1.2 km", nextBus: "5 min" },
    { id: 2, name: "Universidad de Costa Rica", distance: "0.8 km", nextBus: "3 min" },
    { id: 3, name: "Mall San Pedro", distance: "1.5 km", nextBus: "10 min" },
  ]

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="w-full"
      style={{ zIndex: 50 }}
    >
      <Card className="rounded-t-xl rounded-b-none border-b-0 shadow-lg overflow-hidden">
        <div className="bg-primary text-white py-3 px-4 flex justify-between items-center">
          <div className="flex items-center">
            {activeTab === "routes" && <Bus className="h-5 w-5 mr-2" />}
            {activeTab === "favorites" && <Star className="h-5 w-5 mr-2" />}
            {activeTab === "stops" && <MapPin className="h-5 w-5 mr-2" />}
            {activeTab === "history" && <History className="h-5 w-5 mr-2" />}
            <h3 className="font-bold">
              {activeTab === "routes"
                ? "Rutas cercanas"
                : activeTab === "favorites"
                  ? "Mis favoritos"
                  : activeTab === "stops"
                    ? "Paradas cercanas"
                    : "Búsquedas recientes"}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:bg-primary/20"
              onClick={toggleExpand}
            >
              <ChevronUp className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>

        {isExpanded && (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-4 rounded-none bg-primary/10 dark:bg-primary/20">
                <TabsTrigger value="routes" className="text-xs py-2 data-[state=active]:bg-background">
                  Rutas
                </TabsTrigger>
                <TabsTrigger value="favorites" className="text-xs py-2 data-[state=active]:bg-background">
                  Favoritos
                </TabsTrigger>
                <TabsTrigger value="stops" className="text-xs py-2 data-[state=active]:bg-background">
                  Paradas
                </TabsTrigger>
                <TabsTrigger value="history" className="text-xs py-2 data-[state=active]:bg-background">
                  Historial
                </TabsTrigger>
              </TabsList>

              <CardContent className="p-3 max-h-[300px] overflow-y-auto">
                <TabsContent value="routes" className="mt-0 space-y-2">
                  {quickRoutes.map((route) => (
                    <div
                      key={route.id}
                      className="flex items-center justify-between bg-background dark:bg-gray-800 p-3 rounded-lg border shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                          <Bus className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{route.name}</p>
                          <p className="text-xs text-muted-foreground">{route.company}</p>
                        </div>
                      </div>
                      <Badge className="bg-primary">{route.time}</Badge>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="favorites" className="mt-0">
                  <div className="mb-3">
                    <h4 className="font-medium text-sm mb-2">Rutas Favoritas</h4>
                    {favoriteRoutes.length > 0 ? (
                      <div className="space-y-2">
                        {favoriteRoutes.map((route) => (
                          <div
                            key={route.id}
                            className="flex items-center justify-between bg-background dark:bg-gray-800 p-3 rounded-lg border shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                                <Bus className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{route.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {route.company} - {route.type}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No tienes rutas favoritas</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Paradas Favoritas</h4>
                    {favoriteStops.length > 0 ? (
                      <div className="space-y-2">
                        {favoriteStops.map((stop) => (
                          <div
                            key={stop.id}
                            className="flex items-center justify-between bg-background dark:bg-gray-800 p-3 rounded-lg border shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                                <MapPin className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{stop.name}</p>
                                <p className="text-xs text-muted-foreground">{stop.address}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No tienes paradas favoritas</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="stops" className="mt-0">
                  <div className="space-y-2">
                    {busStops.map((stop) => (
                      <div
                        key={stop.id}
                        className="flex items-center justify-between bg-background dark:bg-gray-800 p-3 rounded-lg border shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{stop.name}</p>
                            <p className="text-xs text-muted-foreground">A {stop.distance}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <Badge className="bg-primary">{stop.nextBus}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm">Búsquedas Recientes</h4>
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      Borrar historial
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search) => (
                      <div
                        key={search.id}
                        className="flex items-center justify-between bg-background dark:bg-gray-800 p-3 rounded-lg border shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                            {search.type === "parada" ? (
                              <MapPin className="h-5 w-5 text-primary" />
                            ) : search.type === "ruta" ? (
                              <Bus className="h-5 w-5 text-primary" />
                            ) : (
                              <Bus className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <p className="font-medium">{search.query}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </>
        )}
      </Card>
    </motion.div>
  )
}
