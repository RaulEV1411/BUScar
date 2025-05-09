"use client"

import { useEffect, useRef, useState } from "react"
import { Bus, MapPin, AlertTriangle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface BusMapProps {
  isOfflineMode?: boolean
  onBusSelect?: (busId: string) => void
}

export default function BusMap({ isOfflineMode = false, onBusSelect }: BusMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [selectedBus, setSelectedBus] = useState<string | null>(null)
  const [showTraffic, setShowTraffic] = useState(false)
  const [showAllRoutes, setShowAllRoutes] = useState(false)
  const { theme } = useTheme()

  // Simulación de carga del mapa
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const buses = [
    {
      id: "bus1",
      number: "SJ-HE-01",
      position: { top: "30%", left: "60%" },
      company: "Transportes La 400",
      route: "San José - Heredia",
      type: "Directo",
      nextStop: "Estación del Atlántico",
      eta: "5 min",
      occupancy: "Media",
    },
    {
      id: "bus2",
      number: "SJ-AL-02",
      position: { top: "70%", left: "40%" },
      company: "TUASA",
      route: "San José - Alajuela",
      type: "Regular",
      nextStop: "Parque La Merced",
      eta: "3 min",
      occupancy: "Alta",
    },
    {
      id: "bus3",
      number: "CA-SJ-01",
      position: { top: "20%", left: "30%" },
      company: "Lumaca",
      route: "Cartago - San José",
      type: "Directo",
      nextStop: "Terminal Cartago",
      eta: "8 min",
      occupancy: "Baja",
    },
    {
      id: "bus4",
      number: "HE-AL-01",
      position: { top: "50%", left: "20%" },
      company: "Transportes Heredianos",
      route: "Heredia - Alajuela",
      type: "Regular",
      nextStop: "Mall Paseo de las Flores",
      eta: "12 min",
      occupancy: "Media",
    },
    {
      id: "bus5",
      number: "GU-NI-01",
      position: { top: "40%", left: "70%" },
      company: "Transportes Guanacastecos",
      route: "Liberia - Nicoya",
      type: "Regular",
      nextStop: "Terminal Liberia",
      eta: "25 min",
      occupancy: "Baja",
    },
  ]

  const trafficHotspots = [
    { id: "traffic1", position: { top: "35%", left: "55%" }, severity: "high" },
    { id: "traffic2", position: { top: "65%", left: "45%" }, severity: "medium" },
    { id: "traffic3", position: { top: "25%", left: "35%" }, severity: "low" },
  ]

  const handleBusClick = (busId: string) => {
    setSelectedBus(selectedBus === busId ? null : busId)
    if (onBusSelect && selectedBus !== busId) {
      onBusSelect(busId)
    }
  }

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900">
      {!isMapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Indicador de modo offline */}
          {isOfflineMode && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="outline" className="bg-background shadow-md">
                <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
                Modo Offline
              </Badge>
            </div>
          )}

          {/* Mapa simulado */}
          <div
            ref={mapRef}
            className={`w-full h-full ${
              theme === "dark" ? "bg-gray-900" : "bg-[#e8ecef]"
            } relative transition-colors duration-300`}
          >
            {/* Simulación de calles */}
            <div className="absolute inset-0">
              <div
                className={`absolute top-1/4 left-0 right-0 h-1 ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`}
              ></div>
              <div
                className={`absolute top-2/4 left-0 right-0 h-2 ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`}
              ></div>
              <div
                className={`absolute top-3/4 left-0 right-0 h-1 ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`}
              ></div>
              <div
                className={`absolute left-1/4 top-0 bottom-0 w-1 ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`}
              ></div>
              <div
                className={`absolute left-2/4 top-0 bottom-0 w-2 ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`}
              ></div>
              <div
                className={`absolute left-3/4 top-0 bottom-0 w-1 ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`}
              ></div>
            </div>

            {/* Ubicación del usuario */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-6 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="relative z-10 bg-primary text-white p-3 rounded-full shadow-lg">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Puntos de tráfico */}
            {showTraffic &&
              trafficHotspots.map((spot) => (
                <div
                  key={spot.id}
                  className={`absolute ${
                    spot.severity === "high"
                      ? "bg-red-500"
                      : spot.severity === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  } opacity-60 rounded-full w-8 h-8 animate-pulse`}
                  style={{ top: spot.position.top, left: spot.position.left }}
                ></div>
              ))}

            {/* Autobuses */}
            {buses.map((bus) => (
              <div
                key={bus.id}
                className={`absolute cursor-pointer transition-all duration-300 ${
                  selectedBus === bus.id ? "scale-125 z-20" : "z-10"
                }`}
                style={{ top: bus.position.top, left: bus.position.left }}
                onClick={() => handleBusClick(bus.id)}
              >
                <div
                  className={`bg-primary text-white p-3 rounded-full shadow-lg ${
                    selectedBus === bus.id ? "ring-4 ring-primary/50" : ""
                  }`}
                >
                  <Bus className="h-6 w-6" />
                </div>
                {selectedBus === bus.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 w-48 z-30">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-bold">{bus.number}</p>
                      <Badge
                        className={
                          bus.type === "Directo"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : bus.type === "Expreso"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }
                      >
                        {bus.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-1">{bus.company}</p>
                    <p className="mb-1 text-sm">{bus.route}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-primary font-medium text-sm">Llegada: {bus.eta}</p>
                      <Button variant="ghost" size="sm" className="h-6 p-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Rutas simuladas */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
              <path
                d="M 200,100 L 300,200 L 400,300 L 500,350 L 600,300"
                stroke="#7c3aed"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 4"
              />
              {showAllRoutes && (
                <>
                  <path
                    d="M 100,200 L 200,250 L 300,300 L 400,250 L 500,200"
                    stroke="#2563eb"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8 4"
                  />
                  <path
                    d="M 150,400 L 250,350 L 350,300 L 450,350 L 550,400"
                    stroke="#16a34a"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8 4"
                  />
                  <path
                    d="M 300,100 L 350,200 L 400,250 L 450,200 L 500,100"
                    stroke="#dc2626"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8 4"
                  />
                  <path
                    d="M 100,350 L 200,300 L 300,250 L 400,300 L 500,350"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8 4"
                  />
                </>
              )}
            </svg>

            {/* Paradas de autobús */}
            <div className="absolute top-[45%] left-[45%] w-4 h-4 bg-white dark:bg-gray-800 border-2 border-primary rounded-full"></div>
            <div className="absolute top-[25%] left-[35%] w-4 h-4 bg-white dark:bg-gray-800 border-2 border-primary rounded-full"></div>
            <div className="absolute top-[65%] left-[55%] w-4 h-4 bg-white dark:bg-gray-800 border-2 border-primary rounded-full"></div>
            <div className="absolute top-[35%] left-[65%] w-4 h-4 bg-white dark:bg-gray-800 border-2 border-primary rounded-full"></div>
            <div className="absolute top-[55%] left-[25%] w-4 h-4 bg-white dark:bg-gray-800 border-2 border-primary rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  )
}
