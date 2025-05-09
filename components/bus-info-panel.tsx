"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bus, MapPin, Clock, Star, X, BellRing, Users, DollarSign, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { motion } from "framer-motion"

interface BusInfoPanelProps {
  onClose: () => void
}

export default function BusInfoPanel({ onClose }: BusInfoPanelProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isNotifying, setIsNotifying] = useState(false)

  const stops = [
    { name: "Terminal San José", time: "10:00", status: "completado" },
    { name: "Estación del Atlántico", time: "10:15", status: "completado" },
    { name: "Universidad de Costa Rica", time: "10:30", status: "actual" },
    { name: "Mall San Pedro", time: "10:45", status: "pendiente" },
    { name: "Terminal Heredia", time: "11:00", status: "pendiente" },
  ]

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
            <Bus className="h-5 w-5 mr-2" />
            <div>
              <Badge className="bg-green-500 text-white mb-1">En ruta</Badge>
              <h3 className="font-bold">Autobús #SJ-HE-01</h3>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-white hover:bg-primary/20" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none bg-primary/10 dark:bg-primary/20">
            <TabsTrigger value="info" className="text-xs py-2 data-[state=active]:bg-background">
              Información
            </TabsTrigger>
            <TabsTrigger value="route" className="text-xs py-2 data-[state=active]:bg-background">
              Ruta
            </TabsTrigger>
            <TabsTrigger value="stops" className="text-xs py-2 data-[state=active]:bg-background">
              Paradas
            </TabsTrigger>
          </TabsList>

          <CardContent className="p-4">
            <TabsContent value="info" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                    <Bus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Transportes La 400</p>
                    <p className="text-sm text-muted-foreground">San José - Heredia</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-2xl font-bold">5 min</div>
                    <div className="text-sm text-muted-foreground">10:30 AM</div>
                  </div>
                  <Progress value={40} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">Tiempo estimado de llegada</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Próxima parada: Universidad de Costa Rica</p>
                    <p className="text-sm text-muted-foreground">A 800 metros</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <span className="font-medium">Ocupación:</span> Media
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <span className="font-medium">Tarifa:</span> ₡550
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <span className="font-medium">Tipo:</span> Directo
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <span className="font-medium">Frecuencia:</span> 15 min
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="route" className="mt-0">
              <div className="h-[150px] bg-muted dark:bg-gray-800 rounded-lg relative overflow-hidden">
                {/* Mapa de ruta simplificado */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="absolute top-2/4 left-0 right-0 h-2 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="absolute left-2/4 top-0 bottom-0 w-2 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600"></div>
                </div>

                {/* Ruta del autobús */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
                  <path
                    d="M 50,75 L 150,75 L 250,75 L 350,75 L 450,75"
                    stroke="#7c3aed"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8 4"
                  />
                </svg>

                {/* Paradas en la ruta */}
                <div className="absolute top-[75px] left-[50px] w-3 h-3 bg-primary rounded-full"></div>
                <div className="absolute top-[75px] left-[150px] w-3 h-3 bg-primary rounded-full"></div>
                <div className="absolute top-[75px] left-[250px] w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute top-[75px] left-[350px] w-3 h-3 bg-background border-2 border-primary rounded-full"></div>
                <div className="absolute top-[75px] left-[450px] w-3 h-3 bg-background border-2 border-primary rounded-full"></div>

                {/* Ubicación del autobús */}
                <div className="absolute top-[75px] left-[250px] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-white p-1 rounded-full">
                    <Bus className="h-3 w-3" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-sm mt-3">
                <div className="text-center">
                  <div className="font-medium">Terminal San José</div>
                  <div className="text-xs text-muted-foreground">Origen</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Terminal Heredia</div>
                  <div className="text-xs text-muted-foreground">Destino</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-muted-foreground">Progreso del viaje</div>
                <Progress value={60} className="h-2 mt-1" />
                <div className="flex justify-between text-xs mt-1">
                  <span>10:00 AM</span>
                  <span>11:00 AM</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stops" className="mt-0">
              <div className="space-y-4 relative max-h-[200px] overflow-y-auto pr-1">
                {stops.map((stop, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          stop.status === "actual"
                            ? "bg-primary text-white"
                            : stop.status === "completado"
                              ? "bg-muted border-2 border-primary"
                              : "bg-muted"
                        }`}
                      >
                        {stop.status === "actual" && <MapPin className="h-3 w-3" />}
                      </div>
                      {index < stops.length - 1 && (
                        <div
                          className={`w-0.5 h-full ${stop.status === "completado" ? "bg-primary" : "bg-muted"}`}
                        ></div>
                      )}
                    </div>

                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">{stop.name}</p>
                          <p className="text-xs text-muted-foreground">Parada #{index + 1}</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-xs">{stop.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>

        <div className="flex p-3 border-t">
          <Button className="flex-1 bg-primary text-white">
            <MapPin className="mr-2 h-4 w-4" />
            Ver en mapa
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            className={`ml-2 ${isFavorite ? "text-yellow-500 border-yellow-500" : ""}`}
          >
            <Star className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsNotifying(!isNotifying)}
            className={`ml-2 ${isNotifying ? "text-blue-500 border-blue-500" : ""}`}
          >
            <BellRing className="h-4 w-4" fill={isNotifying ? "currentColor" : "none"} />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
