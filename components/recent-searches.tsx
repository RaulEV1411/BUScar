import { History, MapPin, Bus, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function RecentSearches() {
  const recentSearches = [
    { id: 1, query: "Terminal Central", type: "parada" },
    { id: 2, query: "Ruta Norte", type: "ruta" },
    { id: 3, query: "Empresa B", type: "empresa" },
    { id: 4, query: "Parque Central", type: "parada" },
  ]

  return (
    <div className="mt-3 bg-background border rounded-md shadow-sm animate-in slide-in-from-top duration-300">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg flex items-center">
            <History className="h-5 w-5 mr-2 text-primary" />
            Búsquedas Recientes
          </h3>
          <Button variant="ghost" size="sm" className="text-xs h-8">
            Borrar historial
          </Button>
        </div>

        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {recentSearches.map((search) => (
              <Card key={search.id} className="relative">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {search.type === "parada" ? (
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                    ) : search.type === "ruta" ? (
                      <Bus className="h-4 w-4 mr-2 text-primary" />
                    ) : (
                      <Bus className="h-4 w-4 mr-2 text-primary" />
                    )}
                    <p className="font-medium text-sm">{search.query}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
