import { MapPin, Clock, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BusRouteDetailsProps {
  isOfflineMode?: boolean
}

export default function BusRouteDetails({ isOfflineMode = false }: BusRouteDetailsProps) {
  const stops = [
    { name: "Terminal San José", time: "10:00", status: "completado" },
    { name: "Estación del Atlántico", time: "10:15", status: "completado" },
    { name: "Universidad de Costa Rica", time: "10:30", status: "actual" },
    { name: "Mall San Pedro", time: "10:45", status: "pendiente" },
    { name: "Terminal Heredia", time: "11:00", status: "pendiente" },
  ]

  return (
    <Card>
      {isOfflineMode && (
        <div className="bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 text-sm flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600 dark:text-yellow-400" />
          <span className="text-yellow-700 dark:text-yellow-400">Datos almacenados localmente</span>
        </div>
      )}
      <CardContent className="p-4">
        <Tabs defaultValue="route">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="route">Ruta</TabsTrigger>
            <TabsTrigger value="schedule">Horarios</TabsTrigger>
          </TabsList>
          <TabsContent value="route">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">San José - Heredia</h3>
              <Badge>Directo</Badge>
            </div>

            <div className="space-y-6 relative">
              {stops.map((stop, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
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
                      <div className={`w-0.5 h-full ${stop.status === "completado" ? "bg-primary" : "bg-muted"}`}></div>
                    )}
                  </div>

                  <div className="flex-1 pb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{stop.name}</p>
                        <p className="text-sm text-muted-foreground">Parada #{index + 1}</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">{stop.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="schedule">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Lunes a Viernes</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["05:00", "05:30", "06:00", "06:30", "07:00", "07:30"].map((time, i) => (
                    <Button key={i} variant="outline" size="sm" className="text-xs">
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Sábados</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["06:00", "07:00", "08:00", "09:00", "10:00", "11:00"].map((time, i) => (
                    <Button key={i} variant="outline" size="sm" className="text-xs">
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Domingos y Feriados</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["07:00", "08:30", "10:00", "11:30", "13:00", "14:30"].map((time, i) => (
                    <Button key={i} variant="outline" size="sm" className="text-xs">
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
