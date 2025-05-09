import { ArrowRight, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RouteComparison() {
  const routes = [
    {
      id: 1,
      name: "Ruta Directa",
      company: "Empresa A",
      duration: "25 min",
      distance: "5.2 km",
      price: "$2.50",
      stops: 3,
      departure: "10:30",
      arrival: "10:55",
      type: "Directo",
    },
    {
      id: 2,
      name: "Ruta Económica",
      company: "Empresa B",
      duration: "35 min",
      distance: "6.8 km",
      price: "$1.75",
      stops: 7,
      departure: "10:35",
      arrival: "11:10",
      type: "Regular",
    },
    {
      id: 3,
      name: "Ruta Rápida",
      company: "Empresa C",
      duration: "20 min",
      distance: "5.5 km",
      price: "$3.00",
      stops: 2,
      departure: "10:40",
      arrival: "11:00",
      type: "Expreso",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Comparar Rutas</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm">Terminal Central</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm">Parque Norte</span>
          </div>
        </div>

        <Tabs defaultValue="fastest">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="fastest">Más rápida</TabsTrigger>
            <TabsTrigger value="cheapest">Más económica</TabsTrigger>
            <TabsTrigger value="all">Todas</TabsTrigger>
          </TabsList>

          <TabsContent value="fastest">
            <RouteCard route={routes[2]} />
          </TabsContent>

          <TabsContent value="cheapest">
            <RouteCard route={routes[1]} />
          </TabsContent>

          <TabsContent value="all">
            <div className="space-y-4">
              {routes.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function RouteCard({ route }) {
  return (
    <Card className="border">
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-1">
              <h4 className="font-medium">{route.name}</h4>
              <Badge variant="outline" className="ml-1 text-xs">
                {route.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{route.company}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{route.price}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Duración</p>
            <p className="font-medium">{route.duration}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Distancia</p>
            <p className="font-medium">{route.distance}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Paradas</p>
            <p className="font-medium">{route.stops}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm">{route.departure}</span>
          </div>
          <div className="border-t border-dashed flex-1 mx-2"></div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm">{route.arrival}</span>
          </div>
        </div>

        <Button className="w-full">Seleccionar esta ruta</Button>
      </CardContent>
    </Card>
  )
}
