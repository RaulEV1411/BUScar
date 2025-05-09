import { Bus, Clock, MapPin, Star, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface RouteProps {
  id: string
  name: string
  company: string
  province: string
  destination: string
  type: string
  price: string
  schedule: string
  frequency: string
  rating: number
  nextBus?: string
}

export default function RouteCard({ route }: { route: RouteProps }) {
  // Calcular el valor de progreso para el próximo autobús
  const getProgressValue = () => {
    if (!route.nextBus) return 0

    if (route.nextBus.includes("min")) {
      const minutes = Number.parseInt(route.nextBus)
      // Asumimos que 30 min es el máximo tiempo de espera para la barra de progreso
      return Math.max(0, 100 - (minutes / 30) * 100)
    }

    return 10 // Valor por defecto para tiempos largos
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg">{route.name}</h3>
              <p className="text-sm text-muted-foreground">{route.company}</p>
            </div>
            <Badge
              className={
                route.type === "Directo"
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  : route.type === "Expreso"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
              }
            >
              {route.type}
            </Badge>
          </div>

          {route.nextBus && (
            <div className="mb-3 bg-primary/5 dark:bg-primary/20 p-2 rounded-md">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-medium">Próximo bus:</div>
                <div className="text-primary font-bold">{route.nextBus}</div>
              </div>
              <Progress value={getProgressValue()} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="font-medium">Origen:</span> {route.province}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="font-medium">Destino:</span> {route.destination}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="font-medium">Frecuencia:</span> {route.frequency}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="font-medium">Tarifa:</span> {route.price}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-primary" />
            <div className="text-sm">
              <span className="font-medium">Horario:</span> {route.schedule}
            </div>
          </div>

          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(route.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm ml-1">{route.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex border-t">
          <Button className="flex-1 rounded-none py-2 h-12" variant="ghost">
            <Bus className="mr-2 h-4 w-4" />
            Ver horarios
          </Button>
          <div className="w-px bg-border"></div>
          <Button className="flex-1 rounded-none py-2 h-12" variant="ghost">
            <MapPin className="mr-2 h-4 w-4" />
            Ver en mapa
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
