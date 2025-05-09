import { Star, MapPin, Bus, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function FavoritesPanel() {
  const favoriteRoutes = [
    { id: 1, name: "Ruta Central", company: "Empresa A", type: "Directo" },
    { id: 2, name: "Ruta Norte", company: "Empresa B", type: "Regular" },
  ]

  const favoriteStops = [
    { id: 1, name: "Terminal Central", address: "Av. Principal #123" },
    { id: 2, name: "Central Plaza", address: "Calle Comercio #456" },
    { id: 3, name: "Parque Norte", address: "Av. Norte #789" },
  ]

  return (
    <div className="mt-3 bg-background border rounded-md shadow-sm animate-in slide-in-from-top duration-300">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Mis Favoritos
          </h3>
        </div>

        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Rutas Favoritas</h4>
              {favoriteRoutes.length > 0 ? (
                <div className="space-y-2">
                  {favoriteRoutes.map((route) => (
                    <Card key={route.id} className="relative">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <Bus className="h-4 w-4 mr-2 text-primary" />
                          <div>
                            <p className="font-medium text-sm">{route.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {route.company} - {route.type}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
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
                    <Card key={stop.id} className="relative">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          <div>
                            <p className="font-medium text-sm">{stop.name}</p>
                            <p className="text-xs text-muted-foreground">{stop.address}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No tienes paradas favoritas</p>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
