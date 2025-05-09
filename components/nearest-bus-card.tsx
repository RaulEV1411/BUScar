"use client"

import { Bus, Clock, MapPin, Star, BellRing, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

interface NearestBusCardProps {
  isOfflineMode?: boolean
}

export default function NearestBusCard({ isOfflineMode = false }: NearestBusCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isNotifying, setIsNotifying] = useState(false)

  return (
    <Card className="border-2 border-primary/20">
      {isOfflineMode && (
        <div className="bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 text-sm flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600 dark:text-yellow-400" />
          <span className="text-yellow-700 dark:text-yellow-400">Datos almacenados localmente</span>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">Autobús #SJ-HE-01</CardTitle>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900">
            En ruta
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bus className="h-5 w-5 text-primary" />
            <span className="font-medium">Transportes La 400 - San José - Heredia</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">5 min</div>
                <div className="text-sm text-muted-foreground">10:30 AM</div>
              </div>
              <Progress value={40} className="h-2 mt-1" />
              <div className="text-sm text-muted-foreground">Tiempo estimado de llegada</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">Parada: Estación del Atlántico</div>
              <div className="text-sm text-muted-foreground">A 250 metros de tu ubicación</div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="text-sm">
              <span className="font-medium">Ocupación:</span> Media
            </div>
            <div className="text-sm">
              <span className="font-medium">Tarifa:</span> ₡550
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button className="flex-1">Ver en mapa</Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={isFavorite ? "text-yellow-500" : ""}
                  >
                    <Star className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsNotifying(!isNotifying)}
                    className={isNotifying ? "text-blue-500" : ""}
                  >
                    <BellRing className="h-4 w-4" fill={isNotifying ? "currentColor" : "none"} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isNotifying ? "Desactivar notificaciones" : "Notificarme cuando llegue"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
