"use client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProvinceSelectorProps {
  selectedProvince: string | null
  onProvinceChange: (province: string | null) => void
}

export default function ProvinceSelector({ selectedProvince, onProvinceChange }: ProvinceSelectorProps) {
  const provinces = [
    {
      name: "San José",
      image: "/placeholder.svg?height=60&width=60",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      name: "Heredia",
      image: "/placeholder.svg?height=60&width=60",
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      name: "Alajuela",
      image: "/placeholder.svg?height=60&width=60",
      color: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      name: "Cartago",
      image: "/placeholder.svg?height=60&width=60",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      name: "Guanacaste",
      image: "/placeholder.svg?height=60&width=60",
      color: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      name: "Puntarenas",
      image: "/placeholder.svg?height=60&width=60",
      color: "bg-cyan-100 dark:bg-cyan-900/30",
    },
    {
      name: "Limón",
      image: "/placeholder.svg?height=60&width=60",
      color: "bg-lime-100 dark:bg-lime-900/30",
    },
  ]

  return (
    <div className="border-b bg-background py-3">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 px-4">
          {provinces.map((province) => (
            <Button
              key={province.name}
              variant="ghost"
              className={cn(
                "flex flex-col items-center justify-center space-y-1 rounded-md p-2",
                selectedProvince === province.name ? "bg-primary/10 text-primary" : "hover:bg-muted",
              )}
              onClick={() => onProvinceChange(selectedProvince === province.name ? null : province.name)}
            >
              <div
                className={cn("h-12 w-12 rounded-md flex items-center justify-center overflow-hidden", province.color)}
              >
                <Image
                  src={province.image || "/placeholder.svg"}
                  alt={province.name}
                  width={60}
                  height={60}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xs font-medium">{province.name}</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
