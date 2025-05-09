import Image from "next/image"
import { Phone, Globe, MapPin, Star, Bus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CompanyProps {
  id: string
  name: string
  logo: string
  provinces: string[]
  routes: number
  rating: number
  phone: string
  website: string
}

export default function CompanyCard({ company }: { company: CompanyProps }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <Image src={company.logo || "/placeholder.svg"} alt={company.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{company.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(company.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm ml-1">{company.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-sm font-medium mb-1">Provincias que cubre:</div>
            <div className="flex flex-wrap gap-2">
              {company.provinces.map((province) => (
                <Badge key={province} variant="outline" className="dark:border-gray-600">
                  {province}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Bus className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="font-medium">Rutas:</span> {company.routes}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="font-medium">Teléfono:</span> {company.phone}
              </div>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <Globe className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="font-medium">Sitio web:</span> {company.website}
              </div>
            </div>
          </div>
        </div>

        <div className="flex border-t">
          <Button className="flex-1 rounded-none py-2 h-12" variant="ghost">
            <Bus className="mr-2 h-4 w-4" />
            Ver rutas
          </Button>
          <div className="w-px bg-border"></div>
          <Button className="flex-1 rounded-none py-2 h-12" variant="ghost">
            <MapPin className="mr-2 h-4 w-4" />
            Ver terminales
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
