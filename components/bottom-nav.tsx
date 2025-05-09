"use client"

import { MapPin, Bus, Route, Search, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface BottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const router = useRouter()

  const goToSearch = () => {
    router.push("/search")
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-2 px-4 z-50 shadow-lg">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 h-auto py-1 ${
            activeTab === "mapa" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("mapa")}
        >
          <MapPin className="h-5 w-5" />
          <span className="text-xs">Mapa</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 h-auto py-1 ${
            activeTab === "cercano" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("cercano")}
        >
          <Bus className="h-5 w-5" />
          <span className="text-xs">Cercano</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-1 text-muted-foreground"
          onClick={goToSearch}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs">Buscar</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 h-auto py-1 ${
            activeTab === "rutas" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("rutas")}
        >
          <Route className="h-5 w-5" />
          <span className="text-xs">Rutas</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 h-auto py-1 ${
            activeTab === "empresas" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("empresas")}
        >
          <Info className="h-5 w-5" />
          <span className="text-xs">Empresas</span>
        </Button>
      </div>
    </div>
  )
}
