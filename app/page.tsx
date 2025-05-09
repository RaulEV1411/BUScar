"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapPin, Bus, Search, Filter, Menu, Bell, Star, Moon, Sun, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "next-themes"

import BusMap from "@/components/bus-map"
import NearestBusCard from "@/components/nearest-bus-card"
import BusRouteDetails from "@/components/bus-route-details"
import CompanyDetails from "@/components/company-details"
import BottomNav from "@/components/bottom-nav"
import QuickAccessPanel from "@/components/quick-access-panel"
import BusInfoPanel from "@/components/bus-info-panel"

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedBus, setSelectedBus] = useState<string | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("mapa")
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [showBusInfo, setShowBusInfo] = useState(false)
  const [showQuickAccess, setShowQuickAccess] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  // Simular detección de conexión
  useEffect(() => {
    const handleOnline = () => {
      if (isOfflineMode) {
        toast({
          title: "Conexión restaurada",
          description: "Ahora estás en modo online con datos en tiempo real.",
        })
        setIsOfflineMode(false)
      }
    }

    const handleOffline = () => {
      toast({
        title: "Sin conexión",
        description: "Cambiando a modo offline. Algunos datos pueden no estar actualizados.",
        variant: "destructive",
      })
      setIsOfflineMode(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [isOfflineMode, toast])

  const toggleSearch = () => {
    setShowSearch(!showSearch)
    if (!showSearch) {
      // Cerrar otros paneles si están abiertos
      setShowNotifications(false)
      setShowFavorites(false)
    }
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (!showNotifications) {
      // Cerrar otros paneles si están abiertos
      setShowSearch(false)
      setShowFavorites(false)
    }
  }

  // Modificar la función toggleFavorites para que muestre el panel de favoritos
  const toggleFavorites = () => {
    setShowFavorites(!showFavorites)
    if (!showFavorites) {
      // Cerrar otros paneles si están abiertos
      setShowSearch(false)
      setShowNotifications(false)

      // Si el panel de acceso rápido está visible, cambiarlo a la pestaña de favoritos
      if (showQuickAccess) {
        // Enviar un evento personalizado para cambiar la pestaña
        const event = new CustomEvent("switchToFavorites")
        window.dispatchEvent(event)
      }
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const goToSearchPage = () => {
    router.push("/search")
  }

  const handleBusSelect = (busId: string) => {
    setSelectedBus(busId)
    setShowBusInfo(true)
    setShowQuickAccess(false)
  }

  const closeBusInfo = () => {
    setShowBusInfo(false)
  }

  const toggleQuickAccess = () => {
    setShowQuickAccess(!showQuickAccess)
    if (showBusInfo && !showQuickAccess) {
      setShowBusInfo(false)
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        {/* Header */}
        <header className="border-b px-4 py-3 bg-background z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bus className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">BUScar</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Cambiar tema</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleSearch} className="text-foreground">
                <Search className="h-5 w-5" />
                <span className="sr-only">Buscar</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleNotifications} className="text-foreground">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notificaciones</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleFavorites} className="text-foreground">
                <Star className="h-5 w-5" />
                <span className="sr-only">Favoritos</span>
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Filter className="h-5 w-5" />
                    <span className="sr-only">Filtros</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Empresas</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="cursor-pointer">Todos</Badge>
                          <Badge className="cursor-pointer bg-muted text-muted-foreground">TUASA</Badge>
                          <Badge className="cursor-pointer bg-muted text-muted-foreground">Lumaca</Badge>
                          <Badge className="cursor-pointer bg-muted text-muted-foreground">Caribeños</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Tipo de Servicio</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="cursor-pointer">Todos</Badge>
                          <Badge className="cursor-pointer bg-muted text-muted-foreground">Directo</Badge>
                          <Badge className="cursor-pointer bg-muted text-muted-foreground">Regular</Badge>
                          <Badge className="cursor-pointer bg-muted text-muted-foreground">Expreso</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Provincia</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="cursor-pointer">Todas</Badge>
                          <Badge className="cursor-pointer bg-muted text-muted-foreground">San José</Badge>
                          <Badge className="cursor-pointer bg-muted text-muted-foreground">Heredia</Badge>
                          <Badge className="cursor-pointer bg-muted text-muted-foreground">Alajuela</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <h3 className="text-sm font-medium">Modo offline</h3>
                          <p className="text-xs text-muted-foreground">Guardar datos para uso sin conexión</p>
                        </div>
                        <Switch checked={isOfflineMode} onCheckedChange={setIsOfflineMode} />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </div>
          </div>

          {/* Barra de búsqueda expandible */}
          {showSearch && (
            <div className="mt-3 animate-in slide-in-from-top duration-300">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar rutas, paradas o empresas..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                <Button type="submit" variant="default" size="sm">
                  Buscar
                </Button>
              </form>
              <div className="mt-2 flex justify-between">
                <Button variant="link" size="sm" className="text-xs p-0 h-auto" onClick={goToSearchPage}>
                  Búsqueda avanzada por provincias
                </Button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Mobile Navigation */}
          <div className="md:hidden border-b bg-background z-10">
            <Tabs defaultValue="mapa" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start px-4 py-1">
                <TabsTrigger value="mapa" className="text-base py-3">
                  Mapa
                </TabsTrigger>
                <TabsTrigger value="cercano" className="text-base py-3">
                  Más Cercano
                </TabsTrigger>
                <TabsTrigger value="rutas" className="text-base py-3">
                  Rutas
                </TabsTrigger>
                <TabsTrigger value="empresas" className="text-base py-3">
                  Empresas
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Map and Content Area */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative w-full">
            {/* Map Area */}
            <div className={`${activeTab === "mapa" ? "flex-1" : "hidden"} md:flex-1 md:block relative w-full h-full`}>
              <BusMap isOfflineMode={isOfflineMode} onBusSelect={handleBusSelect} />

              {/* Controles de zoom */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <Button
                  variant="default"
                  size="icon"
                  className="h-10 w-10 rounded-full shadow-lg bg-white dark:bg-gray-800 text-primary"
                >
                  <Plus className="h-5 w-5" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className="h-10 w-10 rounded-full shadow-lg bg-white dark:bg-gray-800 text-primary"
                >
                  <Minus className="h-5 w-5" />
                </Button>
              </div>

              {/* Botón de Mi Ubicación */}
              <div className="absolute bottom-28 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <Button
                  size="lg"
                  className="shadow-lg rounded-full bg-primary hover:bg-primary/90 text-white px-6 py-6 h-auto"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Mi Ubicación
                </Button>
              </div>

              {/* Botón para mostrar/ocultar panel de acceso rápido */}
              <Button
                variant="default"
                size="icon"
                className="absolute bottom-28 md:bottom-8 right-4 z-10 h-14 w-14 rounded-full shadow-lg bg-primary text-white"
                onClick={toggleQuickAccess}
              >
                {showQuickAccess ? <Minus className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
              </Button>

              {/* Panel de información de bus seleccionado */}
              {showBusInfo && (
                <div className="fixed bottom-0 left-0 right-0 z-30 transition-transform duration-300 ease-in-out">
                  <BusInfoPanel onClose={closeBusInfo} />
                </div>
              )}

              {/* Panel de acceso rápido - versión móvil más compacta */}
              {showQuickAccess && (
                <div className="fixed bottom-0 left-0 right-0 z-30 transition-transform duration-300 ease-in-out">
                  <QuickAccessPanel />
                </div>
              )}
            </div>

            {/* Mobile Tab Content */}
            <div className={`${activeTab === "cercano" ? "flex-1" : "hidden"} md:hidden overflow-y-auto p-4`}>
              <NearestBusCard isOfflineMode={isOfflineMode} />
            </div>

            <div className={`${activeTab === "rutas" ? "flex-1" : "hidden"} md:hidden overflow-y-auto p-4`}>
              <BusRouteDetails isOfflineMode={isOfflineMode} />
            </div>

            <div className={`${activeTab === "empresas" ? "flex-1" : "hidden"} md:hidden overflow-y-auto p-4`}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Empresas de Transporte</h2>
                <CompanyDetails name="TUASA" imageUrl="/placeholder.svg?height=100&width=200" />
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block md:w-96 border-l overflow-y-auto">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Autobús más cercano</h2>
                <NearestBusCard isOfflineMode={isOfflineMode} />

                <Separator className="my-6" />

                <h2 className="text-xl font-bold mb-4">Detalles de ruta</h2>
                <BusRouteDetails isOfflineMode={isOfflineMode} />
              </div>
            </div>

            {/* Navegación para laptop */}
            <div className="hidden md:flex md:absolute md:top-4 md:left-4 md:z-10 md:bg-background/80 md:backdrop-blur-sm md:rounded-lg md:shadow-md md:border">
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-4 py-2 h-auto"
                onClick={() => setActiveTab("mapa")}
              >
                <MapPin className={`h-5 w-5 ${activeTab === "mapa" ? "text-primary" : ""}`} />
                <span className={activeTab === "mapa" ? "text-primary font-medium" : ""}>Mapa</span>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-4 py-2 h-auto"
                onClick={() => setActiveTab("cercano")}
              >
                <Bus className={`h-5 w-5 ${activeTab === "cercano" ? "text-primary" : ""}`} />
                <span className={activeTab === "cercano" ? "text-primary font-medium" : ""}>Cercano</span>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-4 py-2 h-auto"
                onClick={() => goToSearchPage()}
              >
                <Search className="h-5 w-5" />
                <span>Buscar</span>
              </Button>
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle>Información de Servicios</SheetTitle>
            </SheetHeader>
            <Tabs defaultValue="tuasa" className="mt-6">
              <TabsList className="w-full justify-start mb-4 overflow-x-auto">
                <TabsTrigger value="tuasa">TUASA</TabsTrigger>
                <TabsTrigger value="lumaca">Lumaca</TabsTrigger>
                <TabsTrigger value="caribenos">Caribeños</TabsTrigger>
              </TabsList>
              <TabsContent value="tuasa">
                <CompanyDetails name="TUASA" imageUrl="/placeholder.svg?height=100&width=200" />
              </TabsContent>
              <TabsContent value="lumaca">
                <CompanyDetails name="Lumaca" imageUrl="/placeholder.svg?height=100&width=200" />
              </TabsContent>
              <TabsContent value="caribenos">
                <CompanyDetails name="Caribeños" imageUrl="/placeholder.svg?height=100&width=200" />
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>
      </div>
    </ThemeProvider>
  )
}
