"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, ArrowLeft, MapPin, Bus, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ProvinceSelector from "@/components/province-selector"
import RouteCard from "@/components/route-card"
import CompanyCard from "@/components/company-card"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState("rutas")
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  // Datos de ejemplo para rutas
  const routes = [
    {
      id: "r1",
      name: "San José - Heredia",
      company: "Transportes La 400",
      province: "San José",
      destination: "Heredia",
      type: "Directo",
      price: "₡550",
      schedule: "5:00 AM - 10:00 PM",
      frequency: "Cada 15 min",
      rating: 4.5,
      nextBus: "5 min",
    },
    {
      id: "r2",
      name: "San José - Alajuela",
      company: "TUASA",
      province: "San José",
      destination: "Alajuela",
      type: "Regular",
      price: "₡600",
      schedule: "4:30 AM - 11:00 PM",
      frequency: "Cada 10 min",
      rating: 4.2,
      nextBus: "3 min",
    },
    {
      id: "r3",
      name: "Cartago - San José",
      company: "Lumaca",
      province: "Cartago",
      destination: "San José",
      type: "Directo",
      price: "₡580",
      schedule: "4:00 AM - 10:30 PM",
      frequency: "Cada 15 min",
      rating: 4.3,
      nextBus: "8 min",
    },
    {
      id: "r4",
      name: "Heredia - Alajuela",
      company: "Transportes Heredianos",
      province: "Heredia",
      destination: "Alajuela",
      type: "Regular",
      price: "₡450",
      schedule: "5:30 AM - 9:00 PM",
      frequency: "Cada 20 min",
      rating: 4.0,
      nextBus: "12 min",
    },
    {
      id: "r5",
      name: "Liberia - Nicoya",
      company: "Transportes Guanacastecos",
      province: "Guanacaste",
      destination: "Guanacaste",
      type: "Regular",
      price: "₡1200",
      schedule: "6:00 AM - 6:00 PM",
      frequency: "Cada 1 hora",
      rating: 3.8,
      nextBus: "25 min",
    },
    {
      id: "r6",
      name: "Puntarenas - Jacó",
      company: "Transportes Jacó",
      province: "Puntarenas",
      destination: "Puntarenas",
      type: "Directo",
      price: "₡1500",
      schedule: "5:00 AM - 7:00 PM",
      frequency: "Cada 2 horas",
      rating: 4.1,
      nextBus: "45 min",
    },
    {
      id: "r7",
      name: "Limón - San José",
      company: "Caribeños",
      province: "Limón",
      destination: "San José",
      type: "Expreso",
      price: "₡2200",
      schedule: "4:00 AM - 6:00 PM",
      frequency: "Cada 2 horas",
      rating: 4.4,
      nextBus: "1 h 15 min",
    },
  ]

  // Datos de ejemplo para empresas
  const companies = [
    {
      id: "c1",
      name: "Transportes La 400",
      logo: "/placeholder.svg?height=80&width=80",
      provinces: ["San José", "Heredia"],
      routes: 12,
      rating: 4.5,
      phone: "2222-1111",
      website: "www.la400.co.cr",
    },
    {
      id: "c2",
      name: "TUASA",
      logo: "/placeholder.svg?height=80&width=80",
      provinces: ["San José", "Alajuela"],
      routes: 15,
      rating: 4.2,
      phone: "2222-2222",
      website: "www.tuasa.co.cr",
    },
    {
      id: "c3",
      name: "Lumaca",
      logo: "/placeholder.svg?height=80&width=80",
      provinces: ["San José", "Cartago"],
      routes: 10,
      rating: 4.3,
      phone: "2222-3333",
      website: "www.lumaca.co.cr",
    },
    {
      id: "c4",
      name: "Transportes Heredianos",
      logo: "/placeholder.svg?height=80&width=80",
      provinces: ["Heredia", "Alajuela"],
      routes: 8,
      rating: 4.0,
      phone: "2222-4444",
      website: "www.heredianos.co.cr",
    },
    {
      id: "c5",
      name: "Transportes Guanacastecos",
      logo: "/placeholder.svg?height=80&width=80",
      provinces: ["Guanacaste"],
      routes: 6,
      rating: 3.8,
      phone: "2222-5555",
      website: "www.guanacastecos.co.cr",
    },
    {
      id: "c6",
      name: "Transportes Jacó",
      logo: "/placeholder.svg?height=80&width=80",
      provinces: ["Puntarenas"],
      routes: 4,
      rating: 4.1,
      phone: "2222-6666",
      website: "www.jaco.co.cr",
    },
    {
      id: "c7",
      name: "Caribeños",
      logo: "/placeholder.svg?height=80&width=80",
      provinces: ["Limón", "San José"],
      routes: 5,
      rating: 4.4,
      phone: "2222-7777",
      website: "www.caribenos.co.cr",
    },
  ]

  // Filtrar rutas según la provincia seleccionada y la búsqueda
  const filteredRoutes = routes.filter((route) => {
    const matchesProvince =
      !selectedProvince || route.province === selectedProvince || route.destination === selectedProvince
    const matchesSearch =
      !searchQuery ||
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilters = selectedFilters.length === 0 || selectedFilters.includes(route.type)

    return matchesProvince && matchesSearch && matchesFilters
  })

  // Filtrar empresas según la provincia seleccionada y la búsqueda
  const filteredCompanies = companies.filter((company) => {
    const matchesProvince = !selectedProvince || company.provinces.includes(selectedProvince)
    const matchesSearch = !searchQuery || company.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesProvince && matchesSearch
  })

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Actualizar la URL con el parámetro de búsqueda
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push("/search")
    }
  }

  const handleFilterClick = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter))
    } else {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const clearFilters = () => {
    setSelectedFilters([])
    setSelectedProvince(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b px-4 py-3 bg-background sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Volver</span>
          </Button>
          <h1 className="text-xl font-bold">Buscar</h1>
        </div>
        <form onSubmit={handleSearchSubmit} className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar rutas, paradas o empresas..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="button" variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-5 w-5" />
            <span className="sr-only">Filtros</span>
          </Button>
        </form>

        {/* Filtros expandibles */}
        {showFilters && (
          <div className="mt-3 p-3 border rounded-md animate-in slide-in-from-top duration-300">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-sm">Filtros</h3>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </div>

            <div className="mb-3">
              <h4 className="text-xs font-medium mb-1">Tipo de servicio</h4>
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={`cursor-pointer ${selectedFilters.includes("Directo") ? "bg-primary" : "bg-muted text-muted-foreground"}`}
                  onClick={() => handleFilterClick("Directo")}
                >
                  Directo
                </Badge>
                <Badge
                  className={`cursor-pointer ${selectedFilters.includes("Regular") ? "bg-primary" : "bg-muted text-muted-foreground"}`}
                  onClick={() => handleFilterClick("Regular")}
                >
                  Regular
                </Badge>
                <Badge
                  className={`cursor-pointer ${selectedFilters.includes("Expreso") ? "bg-primary" : "bg-muted text-muted-foreground"}`}
                  onClick={() => handleFilterClick("Expreso")}
                >
                  Expreso
                </Badge>
              </div>
            </div>

            <div className="mb-3">
              <h4 className="text-xs font-medium mb-1">Tiempo de llegada</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="cursor-pointer bg-muted text-muted-foreground">Menos de 10 min</Badge>
                <Badge className="cursor-pointer bg-muted text-muted-foreground">10-30 min</Badge>
                <Badge className="cursor-pointer bg-muted text-muted-foreground">30-60 min</Badge>
                <Badge className="cursor-pointer bg-muted text-muted-foreground">Más de 1 hora</Badge>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Selector de provincias */}
      <ProvinceSelector selectedProvince={selectedProvince} onProvinceChange={setSelectedProvince} />

      {/* Contenido principal */}
      <main className="flex-1 p-4">
        <Tabs defaultValue="rutas" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="rutas" className="text-base">
              <Bus className="h-4 w-4 mr-2" />
              Rutas
            </TabsTrigger>
            <TabsTrigger value="empresas" className="text-base">
              <MapPin className="h-4 w-4 mr-2" />
              Empresas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rutas" className="mt-0">
            {selectedProvince && (
              <div className="flex items-center mb-4">
                <Badge className="bg-primary text-white flex items-center gap-1">
                  {selectedProvince}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1 text-primary-foreground hover:bg-transparent hover:text-primary-foreground"
                    onClick={() => setSelectedProvince(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">
                {filteredRoutes.length} {filteredRoutes.length === 1 ? "ruta encontrada" : "rutas encontradas"}
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  className="h-8"
                  onClick={() => setViewMode("list")}
                >
                  Lista
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  className="h-8"
                  onClick={() => setViewMode("map")}
                >
                  Mapa
                </Button>
              </div>
            </div>

            {filteredRoutes.length > 0 ? (
              <div className="space-y-4">
                {filteredRoutes.map((route) => (
                  <RouteCard key={route.id} route={route} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No se encontraron rutas que coincidan con tu búsqueda.</p>
                <Button variant="link" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="empresas" className="mt-0">
            {selectedProvince && (
              <div className="flex items-center mb-4">
                <Badge className="bg-primary text-white flex items-center gap-1">
                  {selectedProvince}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1 text-primary-foreground hover:bg-transparent hover:text-primary-foreground"
                    onClick={() => setSelectedProvince(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </div>
            )}

            {filteredCompanies.length > 0 ? (
              <div className="space-y-4">
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No se encontraron empresas que coincidan con tu búsqueda.</p>
                <Button variant="link" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
