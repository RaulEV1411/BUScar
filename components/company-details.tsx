import Image from "next/image"
import { Clock, MapPin, Phone, Globe, DollarSign } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface CompanyDetailsProps {
  name: string
  imageUrl: string
}

export default function CompanyDetails({ name, imageUrl }: CompanyDetailsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full h-32 mb-4">
              <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-contain" />
            </div>
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <p className="text-sm text-muted-foreground mb-4">Servicio de transporte urbano e interurbano</p>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge>Directo</Badge>
              <Badge>Regular</Badge>
              <Badge>Expreso</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span>2222-1111</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-primary" />
                <span>{name.toLowerCase().replace(/\s+/g, "")}.co.cr</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-medium mb-3">Tarifas</h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-primary" />
                  <span>Servicio Regular</span>
                </div>
                <span className="font-medium">₡550</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-primary" />
                  <span>Servicio Directo</span>
                </div>
                <span className="font-medium">₡650</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-primary" />
                  <span>Servicio Expreso</span>
                </div>
                <span className="font-medium">₡800</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Horarios</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>San José - Heredia</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>Lunes a Viernes</span>
                  </div>
                  <span>5:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>Sábados</span>
                  </div>
                  <span>6:00 - 21:00</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>Domingos</span>
                  </div>
                  <span>7:00 - 20:00</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>San José - Alajuela</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>Lunes a Viernes</span>
                  </div>
                  <span>4:30 - 21:30</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>Sábados</span>
                  </div>
                  <span>5:30 - 20:30</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>Domingos</span>
                  </div>
                  <span>6:30 - 19:30</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Terminales Principales</h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Terminal San José</p>
                  <p className="text-sm text-muted-foreground">Av. Central, Calle 16</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Terminal Heredia</p>
                  <p className="text-sm text-muted-foreground">Calle 8, Av. 7</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Terminal Alajuela</p>
                  <p className="text-sm text-muted-foreground">Calle 2, Av. 3</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1">Ver rutas en mapa</Button>
        <Button variant="outline" className="flex-1">
          Ver horarios completos
        </Button>
      </div>
    </div>
  )
}
