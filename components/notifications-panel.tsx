import { Bell, BellOff, Check, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function NotificationsPanel() {
  const notifications = [
    {
      id: 1,
      title: "Autobús A123 llegará en 5 minutos",
      time: "Hace 2 minutos",
      read: false,
    },
    {
      id: 2,
      title: "Retraso en la Ruta Norte",
      description: "Debido a obras en la vía, la ruta presenta un retraso de 10 minutos.",
      time: "Hace 30 minutos",
      read: false,
    },
    {
      id: 3,
      title: "Cambio de horario en la Ruta Central",
      time: "Hace 2 horas",
      read: true,
    },
  ]

  return (
    <div className="mt-3 bg-background border rounded-md shadow-sm animate-in slide-in-from-top duration-300">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg flex items-center">
            <Bell className="h-5 w-5 mr-2 text-primary" />
            Notificaciones
          </h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-xs h-8">
              Marcar todas como leídas
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Notificaciones de llegada</span>
            <span className="text-xs text-muted-foreground">Recibir alertas cuando el autobús esté cerca</span>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Alertas de retrasos</span>
            <span className="text-xs text-muted-foreground">Recibir alertas sobre retrasos en tus rutas</span>
          </div>
          <Switch defaultChecked />
        </div>

        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`relative ${notification.read ? "bg-background" : "bg-primary/5"}`}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-sm">{notification.title}</p>
                          {!notification.read && (
                            <Badge className="ml-2 h-2 w-2 p-0 rounded-full bg-primary" variant="default" />
                          )}
                        </div>
                        {notification.description && (
                          <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <BellOff className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">No tienes notificaciones</p>
                <p className="text-xs text-muted-foreground mt-1">Las alertas sobre tus rutas aparecerán aquí</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
